import { useId, useState, type FormEvent } from 'react'
import {
    BUSINESS_EMAIL,
    INSTAGRAM_PROFILE_URL,
    PUBLIC_SITE_ORIGIN,
    WHATSAPP_BUSINESS_PHONE,
} from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { ITINERARY_EMAIL_PROVIDER_NAME } from '@/config/itineraryEmail'
import { EmailJsConfigurationError } from '../../services/sendQuoteEmailWithEmailJs'
import { sendItineraryQuoteEmail } from '../../services/sendItineraryQuoteEmail'
import { buildQuoteEmailBody } from '../../utils/buildQuoteEmailBody'
import type { QuoteCustomerDetails, QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    customerDetails: QuoteCustomerDetails
    isCustomerDetailsComplete: boolean
    onCustomerDetailsChange: (field: keyof QuoteCustomerDetails, value: string) => void
    onError: (message: string) => void
    onSuccess: (message: string) => void
}

export function ItineraryQuoteEmailForm({
    quote,
    customerDetails,
    isCustomerDetailsComplete,
    onCustomerDetailsChange,
    onError,
    onSuccess,
}: ItineraryQuoteEmailFormProps) {
    const { t } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const fullNameInputId = useId()
    const emailInputId = useId()
    const phoneInputId = useId()
    const [isSending, setIsSending] = useState(false)

    const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
    whatsappUrl.searchParams.set('text', copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
    const contactMessage = copy.emailMessage(
        quote.planName,
        BUSINESS_EMAIL,
        WHATSAPP_BUSINESS_PHONE,
        whatsappUrl.toString(),
        INSTAGRAM_PROFILE_URL,
    )
    const logoUrl = new URL(`${import.meta.env.BASE_URL}beat-and-beach-logo.png`, PUBLIC_SITE_ORIGIN).toString()
    const emailBody = buildQuoteEmailBody(quote, contactMessage, logoUrl)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSending) return

        setIsSending(true)
        try {
            await sendItineraryQuoteEmail({ quote, customerEmail: customerDetails.email.trim(), body: emailBody })
            onSuccess(copy.emailProviderSuccess(ITINERARY_EMAIL_PROVIDER_NAME))
        } catch (error) {
            console.error(`${ITINERARY_EMAIL_PROVIDER_NAME} rejected the itinerary quote:`, error)
            const errorMessage = error instanceof Error ? error.message : ''
            const message = error instanceof EmailJsConfigurationError
                ? copy.emailJsNotConfigured
                : /rate limit exceeded/i.test(errorMessage)
                    ? copy.emailProviderRateLimitError(ITINERARY_EMAIL_PROVIDER_NAME)
                    : copy.emailProviderError(ITINERARY_EMAIL_PROVIDER_NAME)
            onError(message)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <form className="itinerary-quote-email-form" onSubmit={handleSubmit}>
            <div className="itinerary-quote-section-heading">
                <h4>{copy.customerDetailsTitle}</h4>
                <span aria-hidden="true">*</span>
            </div>
            <div className="itinerary-quote-customer-fields">
                <label htmlFor={fullNameInputId}>
                    <span>{copy.fullNameLabel}</span>
                    <input
                        id={fullNameInputId}
                        type="text"
                        autoComplete="name"
                        required
                        value={customerDetails.fullName}
                        onChange={(event) => onCustomerDetailsChange('fullName', event.target.value)}
                        disabled={isSending}
                    />
                </label>
                <label htmlFor={emailInputId}>
                    <span>{copy.emailLabel}</span>
                    <input
                        id={emailInputId}
                        type="email"
                        autoComplete="email"
                        required
                        value={customerDetails.email}
                        onChange={(event) => onCustomerDetailsChange('email', event.target.value)}
                        disabled={isSending}
                    />
                </label>
                <label htmlFor={phoneInputId}>
                    <span>{copy.phoneLabel}</span>
                    <input
                        id={phoneInputId}
                        type="tel"
                        autoComplete="tel"
                        required
                        value={customerDetails.phone}
                        onChange={(event) => onCustomerDetailsChange('phone', event.target.value)}
                        disabled={isSending}
                    />
                </label>
            </div>
            <p>{copy.customerDetailsRequired}</p>
            <div className="itinerary-quote-email-row">
                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSending || !isCustomerDetailsComplete}
                >
                    {isSending ? copy.sendingQuote : copy.sendQuote}
                </button>
            </div>
        </form>
    )
}
