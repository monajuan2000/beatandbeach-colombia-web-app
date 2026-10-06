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
import type { QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    onError: (message: string) => void
    onSuccess: (message: string) => void
}

export function ItineraryQuoteEmailForm({ quote, onError, onSuccess }: ItineraryQuoteEmailFormProps) {
    const { t } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const emailInputId = useId()
    const [customerEmail, setCustomerEmail] = useState('')
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

        const normalizedEmail = customerEmail.trim()
        setIsSending(true)
        try {
            await sendItineraryQuoteEmail({ quote, customerEmail: normalizedEmail, body: emailBody })
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
            <label htmlFor={emailInputId}>{copy.emailLabel}</label>
            <div className="itinerary-quote-email-row">
                <input
                    id={emailInputId}
                    type="email"
                    autoComplete="email"
                    required
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    disabled={isSending}
                />
                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSending}
                >
                    {isSending ? copy.sendingQuote : copy.sendQuote}
                </button>
            </div>
        </form>
    )
}
