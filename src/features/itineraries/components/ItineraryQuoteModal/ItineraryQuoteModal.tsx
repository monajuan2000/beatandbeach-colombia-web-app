import { useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { BUSINESS_EMAIL, INSTAGRAM_PROFILE_URL, WHATSAPP_BUSINESS_PHONE } from '@/config/externalLinks'
import { getCityById } from '@/features/cities/data/cities'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { useTrip } from '@/features/trip/context/TripContext'
import { getAvailableTourDates, formatTourOptionDate } from '@/features/trip/utils/tripDates'
import { formatCalendarDate } from '@/utils/date'
import type { ItineraryPlan } from '../../types'
import { openWhatsAppQuoteChat } from '../../utils/openWhatsAppQuoteChat'
import {
    createQuoteDownloadFileName,
    createQuotePdfFile,
    downloadQuoteFile,
    type QuoteCustomerDetails,
    type QuotePdfContent,
} from '../../utils/downloadQuotePdf'
import { buildQuotePdfContent } from '../../utils/buildQuotePdfContent'
import { validateQuoteCustomerDetails } from '../../utils/quoteCustomerValidation'
import type { getPlanCostBreakdown } from '../../utils/planCosts'
import { ItineraryQuoteEmailForm } from './ItineraryQuoteEmailForm'
import { ItineraryQuotePreview } from './ItineraryQuotePreview'
import './ItineraryQuoteModal.css'

type ItineraryQuoteModalProps = {
    plan: ItineraryPlan
    breakdown: ReturnType<typeof getPlanCostBreakdown>
    cityId: string
    isOpen: boolean
    onClose: () => void
}

export function ItineraryQuoteModal({ plan, breakdown, cityId, isOpen, onClose }: ItineraryQuoteModalProps) {
    const { t, localize, locale } = useTranslation()
    const { quoteDetails, updateQuoteDetails, openPlanner } = useTrip()
    const copy = t.itineraries.costs.quoteModal
    const costCopy = t.itineraries.costs
    const quoteLabels = costCopy.quotePdf
    const city = getCityById(cityId)
    const matchingTripDetails = quoteDetails?.cityId === cityId && quoteDetails.planId === plan.id
        ? quoteDetails
        : undefined
    const availableTourDates = useMemo(() => getAvailableTourDates(), [])
    const selectedTourDate = matchingTripDetails?.departureDate
        && availableTourDates.includes(matchingTripDetails.departureDate)
        ? matchingTripDetails.departureDate
        : availableTourDates[0] ?? ''
    const formattedTourDate = selectedTourDate
        ? formatTourOptionDate(selectedTourDate, locale)
        : '—'
    const compactTourDate = selectedTourDate
        ? selectedTourDate.split('-').reverse().join('/')
        : '—'
    const tripQuoteDetails = useMemo<QuotePdfContent['tripDetails']>(() => ({
        destination: `${city?.name ?? ''}${city?.status === 'launching' ? ` · ${quoteLabels.launching}` : ''}`,
        availableTourDate: formattedTourDate,
        arrivalDate: compactTourDate,
        departureDate: compactTourDate,
        travelers: matchingTripDetails?.travelers ?? 2,
        interests: matchingTripDetails?.interests.map((interest) => t.trip.interests[interest]) ?? [],
    }), [
        city?.name,
        city?.status,
        compactTourDate,
        formattedTourDate,
        matchingTripDetails?.interests,
        matchingTripDetails?.travelers,
        quoteLabels.launching,
        t.trip.interests,
    ])
    const [customerDetails, setCustomerDetails] = useState<QuoteCustomerDetails>({
        fullName: matchingTripDetails?.name ?? '',
        documentType: matchingTripDetails?.documentType ?? 'nationalId',
        documentNumber: matchingTripDetails?.documentNumber ?? '',
        email: matchingTripDetails?.email ?? '',
        phoneCountryIso: matchingTripDetails?.phoneCountryIso ?? 'CO',
        phoneCountryCode: matchingTripDetails?.phoneCountryCode ?? '57',
        phone: matchingTripDetails?.phone ?? '',
    })
    const quote = useMemo<QuotePdfContent>(() => buildQuotePdfContent({
        plan,
        locale,
        localize,
        categories: costCopy.categories,
        disclaimer: costCopy.disclaimer,
        labels: costCopy.quotePdf,
        breakdown,
        customer: customerDetails,
        tripDetails: tripQuoteDetails,
    }), [breakdown, costCopy.categories, costCopy.disclaimer, costCopy.quotePdf, customerDetails, locale, localize, plan, tripQuoteDetails])
    const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
    whatsappUrl.searchParams.set('text', copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
    const contactMessage = copy.emailMessage(
        quote.planName,
        BUSINESS_EMAIL,
        WHATSAPP_BUSINESS_PHONE,
        whatsappUrl.toString(),
        INSTAGRAM_PROFILE_URL,
    )
    const customerFieldValidity = validateQuoteCustomerDetails(customerDetails)
    const isCustomerDetailsComplete = Object.values(customerFieldValidity).every(Boolean)
    const invalidCustomerFields = [
        { isValid: customerFieldValidity.fullName, label: copy.fullNameLabel },
        { isValid: customerFieldValidity.documentType, label: copy.documentTypeLabel },
        { isValid: customerFieldValidity.documentNumber, label: copy.documentNumberLabel },
        { isValid: customerFieldValidity.email, label: copy.emailLabel },
        { isValid: customerFieldValidity.phone, label: copy.phoneLabel },
    ].filter((field) => !field.isValid).map((field) => field.label)

    const [preparedPdf, setPreparedPdf] = useState<{
        key: string
        file: File | null
        error: string
    } | null>(null)
    const [downloadActionError, setDownloadActionError] = useState('')
    const [confirmation, setConfirmation] = useState<{
        kind: 'download'
        message: string
    } | null>(null)
    const [shareMessage, setShareMessage] = useState('')
    const quoteKey = JSON.stringify(quote)
    const currentPdf = preparedPdf?.key === quoteKey ? preparedPdf : null
    const pdfFile = currentPdf?.file ?? null
    const isPreparing = isOpen && isCustomerDetailsComplete && currentPdf === null
    const downloadError = downloadActionError || currentPdf?.error || ''

    useEffect(() => {
        if (!isOpen || !isCustomerDetailsComplete) return

        let isCurrent = true
        void createQuotePdfFile(quote, `beat-and-beach-${plan.id}-quote.pdf`, contactMessage)
            .then((file) => {
                if (isCurrent) setPreparedPdf({ key: quoteKey, file, error: '' })
            })
            .catch(() => {
                if (isCurrent) setPreparedPdf({ key: quoteKey, file: null, error: copy.downloadError })
            })

        return () => {
            isCurrent = false
        }
    }, [contactMessage, copy.downloadError, isCustomerDetailsComplete, isOpen, plan.id, quote, quoteKey])

    const handleCustomerDetailsChange = (field: keyof QuoteCustomerDetails, value: string) => {
        setCustomerDetails((current) => ({ ...current, [field]: value }))
    }

    const handlePhoneCountryChange = (countryIso: string, callingCode: string) => {
        setCustomerDetails((current) => ({
            ...current,
            phoneCountryIso: countryIso,
            phoneCountryCode: callingCode,
        }))
    }

    const handleTourDateChange = (date: string) => {
        updateQuoteDetails({
            cityId,
            planId: plan.id,
            departureDate: date,
            travelers: matchingTripDetails?.travelers ?? 2,
            interests: matchingTripDetails?.interests ?? [],
            name: customerDetails.fullName,
            documentType: customerDetails.documentType,
            documentNumber: customerDetails.documentNumber,
            email: customerDetails.email,
            phoneCountryIso: customerDetails.phoneCountryIso,
            phoneCountryCode: customerDetails.phoneCountryCode,
            phone: customerDetails.phone,
        })
    }

    const handleTravelersChange = (travelers: number) => {
        updateQuoteDetails({
            cityId,
            planId: plan.id,
            departureDate: selectedTourDate,
            travelers: Math.min(20, Math.max(1, travelers)),
            interests: matchingTripDetails?.interests ?? [],
            name: customerDetails.fullName,
            documentType: customerDetails.documentType,
            documentNumber: customerDetails.documentNumber,
            email: customerDetails.email,
            phoneCountryIso: customerDetails.phoneCountryIso,
            phoneCountryCode: customerDetails.phoneCountryCode,
            phone: customerDetails.phone,
        })
    }

    const handleInterestsChange = (interests: NonNullable<typeof matchingTripDetails>['interests']) => {
        updateQuoteDetails({
            cityId,
            planId: plan.id,
            departureDate: selectedTourDate,
            travelers: matchingTripDetails?.travelers ?? 2,
            interests,
            name: customerDetails.fullName,
            documentType: customerDetails.documentType,
            documentNumber: customerDetails.documentNumber,
            email: customerDetails.email,
            phoneCountryIso: customerDetails.phoneCountryIso,
            phoneCountryCode: customerDetails.phoneCountryCode,
            phone: customerDetails.phone,
        })
    }

    const handleDownload = () => {
        if (!pdfFile) return

        const downloadDate = new Date()
        const fileName = createQuoteDownloadFileName(quote.planName, downloadDate)
        try {
            downloadQuoteFile(pdfFile, fileName)
            setDownloadActionError('')
            setConfirmation({
                kind: 'download',
                message: copy.downloadSuccess(
                    fileName,
                    quote.planName,
                    formatCalendarDate(downloadDate, locale),
                ),
            })
        } catch {
            setConfirmation(null)
            setDownloadActionError(copy.downloadError)
        }
    }

    const handleShare = () => {
        if (!pdfFile) return
        setShareMessage('')
        try {
            openWhatsAppQuoteChat(
                pdfFile,
                copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL),
            )
            setShareMessage(copy.whatsappOpened)
        } catch {
            setShareMessage(copy.shareError)
        }
    }

    const handleClose = () => {
        setDownloadActionError('')
        setConfirmation(null)
        setShareMessage('')
        setCustomerDetails({
            fullName: '',
            documentType: 'nationalId',
            documentNumber: '',
            email: '',
            phoneCountryIso: 'CO',
            phoneCountryCode: '57',
            phone: '',
        })
        onClose()
    }

    const handleSaveMainEvent = () => {
        updateQuoteDetails({
            cityId,
            planId: plan.id,
            departureDate: selectedTourDate,
            travelers: matchingTripDetails?.travelers ?? 2,
            interests: matchingTripDetails?.interests ?? [],
            name: customerDetails.fullName.trim(),
            documentType: customerDetails.documentType,
            documentNumber: customerDetails.documentNumber.trim(),
            email: customerDetails.email.trim(),
            phoneCountryIso: customerDetails.phoneCountryIso,
            phoneCountryCode: customerDetails.phoneCountryCode,
            phone: customerDetails.phone,
        })
        openPlanner(cityId, plan.id)
        handleClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            labelledBy={confirmation ? `itinerary-${confirmation.kind}-confirmation-title` : 'itinerary-quote-title'}
            closeLabel={t.common.close}
            wide
        >
            {confirmation ? (
                <div className="modal-body itinerary-download-confirmation">
                    <span className="itinerary-download-confirmation-icon" aria-hidden="true">✓</span>
                    <h3 id={`itinerary-${confirmation.kind}-confirmation-title`}>{copy.downloadConfirmationTitle}</h3>
                    <p>{confirmation.message}</p>
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() => setConfirmation(null)}
                    >
                        {copy.acceptAndReturn}
                    </button>
                </div>
            ) : (
                <div className="modal-body itinerary-quote-modal">
                    <header className="itinerary-quote-header">
                        <span className="eyebrow">{copy.eyebrow}</span>
                        <h3 id="itinerary-quote-title">{copy.title}</h3>
                        <p>{quote.labels.intro}</p>
                    </header>

                    <ItineraryQuotePreview
                        quote={quote}
                        planLabel={copy.planLabel}
                        planCode={plan.code}
                        availableTourDates={availableTourDates}
                        selectedTourDate={selectedTourDate}
                        onTourDateChange={handleTourDateChange}
                        travelers={matchingTripDetails?.travelers ?? 2}
                        interests={matchingTripDetails?.interests ?? []}
                        onTravelersChange={handleTravelersChange}
                        onInterestsChange={handleInterestsChange}
                    />

                    <ItineraryQuoteEmailForm
                        customerDetails={customerDetails}
                        invalidFields={invalidCustomerFields}
                        onCustomerDetailsChange={handleCustomerDetailsChange}
                        onPhoneCountryChange={handlePhoneCountryChange}
                    />

                    <button
                        type="button"
                        className="itinerary-quote-save-main-event"
                        onClick={handleSaveMainEvent}
                        disabled={!isCustomerDetailsComplete}
                    >
                        {copy.saveMainEvent}
                    </button>

                    <div className="itinerary-quote-actions">
                        <div className="itinerary-quote-download">
                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleDownload}
                                disabled={!isCustomerDetailsComplete || !pdfFile || isPreparing}
                            >
                                {isPreparing ? copy.downloadingQuote : copy.downloadQuote}
                            </button>
                            {downloadError ? (
                                <p className="itinerary-quote-download-error" role="alert">{downloadError}</p>
                            ) : null}
                        </div>
                        <div className="itinerary-quote-share">
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={handleShare}
                                disabled={!isCustomerDetailsComplete || !pdfFile || isPreparing}
                            >
                                {isPreparing ? copy.sharingQuote : copy.shareQuote}
                            </button>
                            <p>{copy.shareInstructions(WHATSAPP_BUSINESS_PHONE)}</p>
                            {shareMessage ? <p role="status" aria-live="polite">{shareMessage}</p> : null}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}
