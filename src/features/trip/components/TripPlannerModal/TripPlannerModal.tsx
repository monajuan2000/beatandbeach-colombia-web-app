import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Collapsible } from '@/components/ui/Collapsible/Collapsible'
import { Modal } from '@/components/ui/Modal/Modal'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { BUSINESS_EMAIL, INSTAGRAM_PROFILE_URL, WHATSAPP_BUSINESS_PHONE, PUBLIC_SITE_ORIGIN } from '@/config/externalLinks'
import { ITINERARY_EMAIL_PROVIDER_NAME } from '@/config/itineraryEmail'
import { getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { isQuoteablePlan } from '@/features/itineraries/config'
import { getItinerariesForCity, itineraries } from '@/features/itineraries/data/itineraries'
import { getPlanCostBreakdown } from '@/features/itineraries/utils/planCosts'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import { EmailJsConfigurationError } from '@/features/itineraries/services/sendQuoteEmailWithEmailJs'
import { sendItineraryQuoteEmail } from '@/features/itineraries/services/sendItineraryQuoteEmail'
import { buildQuoteEmailBody } from '@/features/itineraries/utils/buildQuoteEmailBody'
import { buildQuotePdfContent } from '@/features/itineraries/utils/buildQuotePdfContent'
import { validateQuoteCustomerDetails } from '@/features/itineraries/utils/quoteCustomerValidation'
import type { QuotePdfContent } from '@/features/itineraries/utils/downloadQuotePdf'
import { useTrip } from '../../context/TripContext'
import {
    TripPlannerSavedItems,
    type TripPlannerSavedEvent,
    type TripPlannerQuoteSummary,
    type TripPlannerSavedTour,
} from './TripPlannerSavedItems'
import { formatTourOptionDate } from '../../utils/tripDates'
import type { QuoteCustomerDetails } from '@/features/itineraries/utils/downloadQuotePdf'
import './TripPlannerModal.css'

export function TripPlannerModal() {
    const { isPlannerOpen, closePlanner } = useTrip()
    const { t } = useTranslation()

    return (
        <Modal
            isOpen={isPlannerOpen}
            onClose={closePlanner}
            labelledBy="trip-planner-title"
            closeLabel={t.common.close}
            wide
        >
            <TripPlannerContent />
        </Modal>
    )
}

function TripPlannerContent() {
    const navigate = useNavigate()
    const [isItineraryCatalogOpen, setIsItineraryCatalogOpen] = useState(false)
    const {
        savedEventIds,
        toggleSavedEvent,
        savedTour,
        quoteDetails,
        plannerPlanId,
        clearSavedTour,
        clearSavedTrip,
        closePlanner,
    } = useTrip()
    const { t, localize, locale } = useTranslation()
    const copy = t.trip

    const savedEvents = useMemo(
        () => savedEventIds
            .map((id) => getEventById(id))
            .filter((event): event is EventItem => Boolean(event)),
        [savedEventIds],
    )
    const plannerItineraries = useMemo(
        () => itineraries.flatMap((catalog) => {
            const city = getCityById(catalog.cityId)
            if (!city) return []

            return catalog.plans.map((plan) => ({
                cityId: catalog.cityId,
                cityName: city.name,
                planId: plan.id,
                title: localize(plan.name),
                duration: plan.specialLabel
                    ? localize(plan.specialLabel)
                    : plan.durationLabel
                        ? localize(plan.durationLabel)
                        : copy.itineraryDuration(plan.days.length),
                summary: localize(plan.summary),
                isQuoteable: isQuoteablePlan(catalog.cityId, plan.id),
            }))
        }),
        [copy, localize],
    )
    const plannerDestinationCount = useMemo(
        () => new Set(plannerItineraries.map((itinerary) => itinerary.cityId)).size,
        [plannerItineraries],
    )
    const selectedTour = useMemo(() => {
        if (!savedTour || !isQuoteablePlan(savedTour.cityId, savedTour.planId)) return undefined
        return getItinerariesForCity(savedTour.cityId)?.plans.find((plan) => plan.id === savedTour.planId)
    }, [savedTour])
    const matchingTripDetails = quoteDetails && quoteDetails.cityId === savedTour?.cityId
        && quoteDetails.planId === selectedTour?.id
        ? quoteDetails
        : undefined
    const savedEventItems = useMemo<TripPlannerSavedEvent[]>(() => savedEvents.map((event) => ({
        id: event.id,
        title: localize(event.title),
        cityName: getCityById(event.cityId)?.name ?? '',
        date: localize(event.date),
    })), [localize, savedEvents])
    const selectedTourItem = useMemo<TripPlannerSavedTour | undefined>(() => {
        if (!selectedTour || !savedTour) return undefined
        return {
            planId: selectedTour.id,
            title: localize(selectedTour.name),
            cityName: getCityById(savedTour.cityId)?.name ?? '',
            code: selectedTour.code,
        }
    }, [localize, savedTour, selectedTour])
    const quoteSummary = useMemo<TripPlannerQuoteSummary | undefined>(() => {
        if (!matchingTripDetails || !savedTour || !selectedTour) return undefined
        const city = getCityById(savedTour.cityId)
        const catalog = getItinerariesForCity(savedTour.cityId)
        if (!city || !catalog) return undefined
        const breakdown = getPlanCostBreakdown(selectedTour, catalog)

        return {
            destination: `${city.name} · ${t.cities.status.labels[city.status]}`,
            availableTourDate: formatTourOptionDate(matchingTripDetails.departureDate, locale),
            arrivalDate: matchingTripDetails.departureDate.split('-').reverse().join('/'),
            departureDate: matchingTripDetails.departureDate.split('-').reverse().join('/'),
            travelers: matchingTripDetails.travelers,
            interests: matchingTripDetails.interests.map((interest) => copy.interests[interest]),
            representativeName: matchingTripDetails.name,
            documentType: copy.documentTypes[matchingTripDetails.documentType],
            documentNumber: matchingTripDetails.documentNumber,
            email: matchingTripDetails.email,
            phone: `+${matchingTripDetails.phoneCountryCode} ${matchingTripDetails.phone}`,
            costs: breakdown.groups.map((group) => ({
                label: t.itineraries.costs.categories[group.category],
                perPerson: formatCop(group.subtotal, locale),
                group: formatCop(group.subtotal * matchingTripDetails.travelers, locale),
            })),
            totalPerPerson: formatCop(breakdown.total, locale),
            total: formatCop(breakdown.total * matchingTripDetails.travelers, locale),
        }
    }, [
        copy.documentTypes,
        copy.interests,
        locale,
        matchingTripDetails,
        savedTour,
        selectedTour,
        t.cities.status.labels,
        t.itineraries.costs.categories,
    ])
    const quoteEmailContent = useMemo<{
        quote: QuotePdfContent
        body: ReturnType<typeof buildQuoteEmailBody>
    } | undefined>(() => {
        if (!matchingTripDetails || !savedTour || !selectedTour || !quoteSummary) return undefined
        const catalog = getItinerariesForCity(savedTour.cityId)
        if (!catalog) return undefined

        const customer: QuoteCustomerDetails = {
            fullName: matchingTripDetails.name,
            documentType: matchingTripDetails.documentType,
            documentNumber: matchingTripDetails.documentNumber,
            email: matchingTripDetails.email,
            phoneCountryIso: matchingTripDetails.phoneCountryIso,
            phoneCountryCode: matchingTripDetails.phoneCountryCode,
            phone: matchingTripDetails.phone,
        }
        const quote = buildQuotePdfContent({
            plan: selectedTour,
            locale,
            localize,
            categories: t.itineraries.costs.categories,
            disclaimer: t.itineraries.costs.disclaimer,
            labels: t.itineraries.costs.quotePdf,
            breakdown: getPlanCostBreakdown(selectedTour, catalog),
            customer,
            tripDetails: {
                destination: quoteSummary.destination,
                availableTourDate: quoteSummary.availableTourDate,
                arrivalDate: quoteSummary.arrivalDate,
                departureDate: quoteSummary.departureDate,
                travelers: matchingTripDetails.travelers,
                interests: matchingTripDetails.interests.map((interest) => copy.interests[interest]),
            },
        })
        const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
        const quoteCopy = t.itineraries.costs.quoteModal
        whatsappUrl.searchParams.set('text', quoteCopy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
        const contactMessage = quoteCopy.emailMessage(
            quote.planName,
            BUSINESS_EMAIL,
            WHATSAPP_BUSINESS_PHONE,
            whatsappUrl.toString(),
            INSTAGRAM_PROFILE_URL,
        )
        const logoUrl = new URL(`${import.meta.env.BASE_URL}beat-and-beach-logo.png`, PUBLIC_SITE_ORIGIN).toString()

        return { quote, body: buildQuoteEmailBody(quote, contactMessage, logoUrl) }
    }, [copy.interests, locale, localize, matchingTripDetails, quoteSummary, savedTour, selectedTour, t.itineraries.costs])
    const [isSendingQuoteEmail, setIsSendingQuoteEmail] = useState(false)
    const [quoteEmailFeedback, setQuoteEmailFeedback] = useState('')
    const [quoteEmailSentTo, setQuoteEmailSentTo] = useState('')
    const [isConfirmingQuoteEmail, setIsConfirmingQuoteEmail] = useState(false)
    const isQuoteEmailReady = Boolean(matchingTripDetails && Object.values(validateQuoteCustomerDetails({
        fullName: matchingTripDetails.name,
        documentType: matchingTripDetails.documentType,
        documentNumber: matchingTripDetails.documentNumber,
        email: matchingTripDetails.email,
        phoneCountryIso: matchingTripDetails.phoneCountryIso,
        phoneCountryCode: matchingTripDetails.phoneCountryCode,
        phone: matchingTripDetails.phone,
    })).every(Boolean))

    const handleSendQuoteEmail = async () => {
        if (isSendingQuoteEmail || !isQuoteEmailReady || !matchingTripDetails || !quoteEmailContent) return
        setIsSendingQuoteEmail(true)
        setQuoteEmailFeedback('')
        try {
            await sendItineraryQuoteEmail({
                quote: quoteEmailContent.quote,
                customerEmail: matchingTripDetails.email,
                body: quoteEmailContent.body,
            })
            setQuoteEmailSentTo(matchingTripDetails.email)
            clearSavedTrip()
        } catch (error) {
            console.error(`${ITINERARY_EMAIL_PROVIDER_NAME} rejected the itinerary quote:`, error)
            const errorMessage = error instanceof Error ? error.message : ''
            const quoteCopy = t.itineraries.costs.quoteModal
            setQuoteEmailFeedback(error instanceof EmailJsConfigurationError
                ? quoteCopy.emailJsNotConfigured
                : /rate limit exceeded/i.test(errorMessage)
                    ? quoteCopy.emailProviderRateLimitError(ITINERARY_EMAIL_PROVIDER_NAME)
                    : quoteCopy.emailProviderError(ITINERARY_EMAIL_PROVIDER_NAME))
        } finally {
            setIsSendingQuoteEmail(false)
        }
    }

    const browseEvents = () => {
        closePlanner()
        navigate('/', { state: { scrollTo: 'events' } })
    }

    const openItinerary = (cityId: string, planId: string) => {
        closePlanner()
        navigate(`/cities/${cityId}`, {
            state: {
                openItineraries: true,
                openQuotePlanId: planId,
                itineraryRequestId: crypto.randomUUID(),
            },
        })
    }

    const continueToQuote = () => {
        if (!savedTour || !isQuoteablePlan(savedTour.cityId, savedTour.planId)) return
        closePlanner()
        navigate(`/cities/${savedTour.cityId}`, { state: { openQuotePlanId: savedTour.planId } })
    }

    if (quoteEmailSentTo) {
        return (
            <div className="modal-body planner-success" role="status" aria-live="polite">
                <span className="card-tag">{copy.quoteEmailSuccess.tag}</span>
                <h3 id="trip-planner-title">{copy.quoteEmailSuccess.title}</h3>
                <p>{copy.quoteEmailSuccess.message.replace('{email}', quoteEmailSentTo)}</p>
                <div className="action-row modal-actions">
                    <button type="button" className="primary-button" onClick={closePlanner}>
                        {copy.quoteEmailSuccess.done}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-body">
            <section className="planner-itineraries" aria-label={copy.title}>
                <div className="planner-cover">
                    <SectionHeader
                        eyebrow={copy.eyebrow}
                        title={copy.title}
                        titleId="trip-planner-title"
                        className="planner-cover-header"
                    >
                        <p className="planner-intro">{copy.intro}</p>
                    </SectionHeader>
                    <div className="planner-cover-summary" aria-label={copy.plannerSummary}>
                        <span>
                            <strong>{plannerDestinationCount}</strong>
                            {copy.destinationCount(plannerDestinationCount)}
                        </span>
                        <span>
                            <strong>{plannerItineraries.length}</strong>
                            {copy.itineraryCount(plannerItineraries.length)}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="primary-button planner-itineraries-toggle"
                        aria-expanded={isItineraryCatalogOpen}
                        aria-controls="planner-itinerary-catalog"
                        onClick={() => setIsItineraryCatalogOpen((isOpen) => !isOpen)}
                    >
                        {isItineraryCatalogOpen
                            ? copy.hideItineraries
                            : copy.showItineraries(plannerItineraries.length)}
                        <span
                            className={`planner-itineraries-chevron ${isItineraryCatalogOpen ? 'is-open' : ''}`}
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <Collapsible id="planner-itinerary-catalog" isOpen={isItineraryCatalogOpen}>
                    <div className="planner-itineraries-content">
                        <p className="planner-itineraries-intro">{copy.itineraryCatalogIntro}</p>
                        <div className="planner-itinerary-grid">
                            {plannerItineraries.map((itinerary) => (
                                <article className="planner-itinerary-card" key={itinerary.planId}>
                                    <div className="planner-itinerary-meta">
                                        <span className="planner-itinerary-city">
                                            {itinerary.cityName} · {itinerary.duration}
                                        </span>
                                        <span
                                            className={`planner-itinerary-status ${itinerary.isQuoteable ? 'is-available' : 'is-coming-soon'}`}
                                        >
                                            {itinerary.isQuoteable ? copy.itineraryAvailable : copy.itineraryComingSoon}
                                        </span>
                                    </div>
                                    <h4>{itinerary.title}</h4>
                                    <p>{itinerary.summary}</p>
                                    <button
                                        type="button"
                                        className={itinerary.isQuoteable ? 'primary-button' : 'secondary-button'}
                                        onClick={() => openItinerary(itinerary.cityId, itinerary.planId)}
                                    >
                                        {itinerary.isQuoteable ? copy.quoteItinerary : copy.viewItinerary}
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                </Collapsible>
            </section>

            <TripPlannerSavedItems
                events={savedEventItems}
                selectedTour={selectedTourItem}
                quoteSummary={quoteSummary}
                isTourSelectionLocked={Boolean(plannerPlanId)}
                onBrowseEvents={browseEvents}
                onContinueQuote={continueToQuote}
                onRemoveTour={clearSavedTour}
                onRemoveEvent={toggleSavedEvent}
            />

            {quoteSummary ? (
                <div className="planner-request-panel">
                    <p className="planner-request-status">{copy.requestStatusNotice}</p>
                    {quoteEmailFeedback ? <p className="planner-submit-error" role="alert">{quoteEmailFeedback}</p> : null}
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() => setIsConfirmingQuoteEmail(true)}
                        disabled={isSendingQuoteEmail || !isQuoteEmailReady}
                    >
                        {isSendingQuoteEmail ? t.itineraries.costs.quoteModal.sendingQuote : copy.submit}
                    </button>
                    {isConfirmingQuoteEmail && selectedTourItem ? (
                        <div className="planner-quote-email-confirmation" role="alert">
                            <strong>{copy.quoteEmailConfirmationTitle}</strong>
                            <p>{copy.quoteEmailConfirmationMessage.replace('{email}', quoteSummary.email)}</p>
                            <dl>
                                <div>
                                    <dt>{copy.fields.destination}</dt>
                                    <dd>{quoteSummary.destination}</dd>
                                </div>
                                <div>
                                    <dt>{copy.selectedTour}</dt>
                                    <dd>{selectedTourItem.title} · {selectedTourItem.code}</dd>
                                </div>
                                <div>
                                    <dt>{copy.fields.arrivalDate}</dt>
                                    <dd>{quoteSummary.arrivalDate}</dd>
                                </div>
                                <div>
                                    <dt>{copy.fields.departureDate}</dt>
                                    <dd>{quoteSummary.departureDate}</dd>
                                </div>
                                <div>
                                    <dt>{copy.fields.travelers}</dt>
                                    <dd>{quoteSummary.travelers}</dd>
                                </div>
                            </dl>
                            <div className="planner-quote-email-confirmation-actions">
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() => {
                                        setIsConfirmingQuoteEmail(false)
                                        void handleSendQuoteEmail()
                                    }}
                                    disabled={isSendingQuoteEmail || !isQuoteEmailReady}
                                >
                                    {copy.confirmQuoteEmail}
                                </button>
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => setIsConfirmingQuoteEmail(false)}
                                    disabled={isSendingQuoteEmail}
                                >
                                    {copy.cancelQuoteEmail}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
