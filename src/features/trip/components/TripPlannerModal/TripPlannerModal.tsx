import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal/Modal'
import { getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { isQuoteablePlan } from '@/features/itineraries/config'
import { getItinerariesForCity } from '@/features/itineraries/data/itineraries'
import { getPlanCostBreakdown } from '@/features/itineraries/utils/planCosts'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import { sendTripRequestEmail } from '../../services/sendTripRequest'
import { useTrip } from '../../context/TripContext'
import {
    TripPlannerSavedItems,
    type TripPlannerSavedEvent,
    type TripPlannerQuoteSummary,
    type TripPlannerSavedTour,
} from './TripPlannerSavedItems'
import { TripPlannerSuccess } from './TripPlannerSuccess'
import { formatTourOptionDate, formatTripDate } from '../../utils/tripDates'
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
    const {
        savedEventIds,
        toggleSavedEvent,
        plannerCityId,
        savedTour,
        quoteDetails,
        plannerPlanId,
        clearSavedTour,
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

        return {
            destination: `${city.name} · ${t.cities.status.labels[city.status]}`,
            availableTourDate: formatTourOptionDate(matchingTripDetails.departureDate, locale),
            departureDate: matchingTripDetails.departureDate.split('-').reverse().join('/'),
            travelers: matchingTripDetails.travelers,
            interests: matchingTripDetails.interests.map((interest) => copy.interests[interest]),
            representativeName: matchingTripDetails.name,
            documentType: copy.documentTypes[matchingTripDetails.documentType],
            documentNumber: matchingTripDetails.documentNumber,
            email: matchingTripDetails.email,
            phone: `+${matchingTripDetails.phoneCountryCode} ${matchingTripDetails.phone}`,
            total: formatCop(getPlanCostBreakdown(selectedTour, catalog).total * matchingTripDetails.travelers, locale),
        }
    }, [copy.documentTypes, copy.interests, locale, matchingTripDetails, savedTour, selectedTour, t.cities.status.labels])
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [requestReference, setRequestReference] = useState('')

    const selectedCity = getCityById(matchingTripDetails?.cityId ?? savedTour?.cityId)
    const canRequestAvailability = Boolean(
        matchingTripDetails?.departureDate
        && matchingTripDetails.name.trim()
        && matchingTripDetails.email.trim()
        && matchingTripDetails.phone.trim()
        && matchingTripDetails.phoneCountryCode
        && selectedTour
        && selectedTourItem,
    )

    const handleSubmit = async () => {
        if (isSubmitting || !matchingTripDetails || !selectedTour || !savedTour || !selectedTourItem) return
        setIsSubmitting(true)
        setSubmitError('')

        const reference = `BBC-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
        const emailCopy = copy.requestEmail
        const catalog = getItinerariesForCity(savedTour.cityId)
        const groupTotal = catalog
            ? formatCop(getPlanCostBreakdown(selectedTour, catalog).total * matchingTripDetails.travelers, locale)
            : '—'
        const departureDate = formatTripDate(matchingTripDetails.departureDate, locale)
        const message = [
            `${emailCopy.reference}: ${reference}`,
            `${emailCopy.destination}: ${selectedCity?.name ?? savedTour.cityId}`,
            `${emailCopy.arrivalDate}: ${departureDate}`,
            `${emailCopy.departureDate}: ${departureDate}`,
            `${emailCopy.travelers}: ${matchingTripDetails.travelers}`,
            `${emailCopy.interests}: ${matchingTripDetails.interests.map((interest) => copy.interests[interest]).join(', ') || '—'}`,
            `${emailCopy.selectedTour}: ${selectedTourItem.title}`,
            `${emailCopy.tourCode}: ${selectedTourItem.code}`,
            `${emailCopy.estimatedGroupTotal}: ${groupTotal}`,
            `${emailCopy.savedEvents}: ${savedEventItems.map((event) => `${event.title} (${event.cityName}, ${event.date})`).join('; ') || '—'}`,
            '',
            `${emailCopy.contact}: ${matchingTripDetails.name}`,
            `${emailCopy.email}: ${matchingTripDetails.email}`,
            `${emailCopy.phone}: +${matchingTripDetails.phoneCountryCode} ${matchingTripDetails.phone}`,
            '',
            emailCopy.pendingAvailability,
        ].join('\n')

        try {
            await sendTripRequestEmail({
                reference,
                customerName: matchingTripDetails.name,
                customerEmail: matchingTripDetails.email,
                message,
            })
            setRequestReference(reference)
            setSubmitted(true)
        } catch {
            setSubmitError(copy.submitError)
        } finally {
            setIsSubmitting(false)
        }
    }

    const browseEvents = () => {
        closePlanner()
        navigate('/', { state: { scrollTo: 'events' } })
    }

    const browseItineraries = () => {
        const cityId = savedTour?.cityId ?? plannerCityId
        if (!cityId) return
        closePlanner()
        navigate(`/cities/${cityId}`, {
            state: { openItineraries: true, itineraryRequestId: crypto.randomUUID() },
        })
    }

    const continueToQuote = () => {
        if (!savedTour || !isQuoteablePlan(savedTour.cityId, savedTour.planId)) return
        closePlanner()
        navigate(`/cities/${savedTour.cityId}`, { state: { openQuotePlanId: savedTour.planId } })
    }

    if (submitted && matchingTripDetails) {
        return (
            <TripPlannerSuccess
                requestReference={requestReference}
                onDone={closePlanner}
            />
        )
    }

    return (
        <div className="modal-body">
            <span className="eyebrow">{copy.eyebrow}</span>
            <h3 id="trip-planner-title">{copy.title}</h3>
            <p className="planner-intro">{copy.intro}</p>

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

            <div className="planner-request-panel">
                <p className="planner-request-status">{copy.requestStatusNotice}</p>
                {!canRequestAvailability ? (
                    <p className="planner-request-guidance">{copy.quoteRequiredNotice}</p>
                ) : null}
                <button
                    type="button"
                    className="primary-button small-button planner-browse-itineraries"
                    onClick={browseItineraries}
                >
                    {copy.browseItineraries}
                </button>
                {submitError ? <p className="planner-submit-error" role="alert">{submitError}</p> : null}
                {canRequestAvailability ? (
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() => void handleSubmit()}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? copy.submitting : copy.submit}
                    </button>
                ) : null}
            </div>
        </div>
    )
}
