import { useId, useState, type FormEvent } from 'react'
import {
    BUSINESS_EMAIL,
    INSTAGRAM_PROFILE_URL,
    WHATSAPP_BUSINESS_PHONE,
} from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { sendQuoteEmailWithFormSubmit } from '../../services/sendQuoteEmailWithFormSubmit'
import { buildQuoteEmailBody } from '../../utils/buildQuoteEmailBody'
import type { QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    onError: (message: string) => void
}

export function ItineraryQuoteEmailForm({ quote, onError }: ItineraryQuoteEmailFormProps) {
    const { t } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const emailInputId = useId()
    const [customerEmail, setCustomerEmail] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [wasSubmitted, setWasSubmitted] = useState(false)

    const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
    whatsappUrl.searchParams.set('text', copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
    const contactMessage = copy.emailMessage(
        quote.planName,
        BUSINESS_EMAIL,
        WHATSAPP_BUSINESS_PHONE,
        whatsappUrl.toString(),
        INSTAGRAM_PROFILE_URL,
    )
    const message = `${buildQuoteEmailBody(quote).text}\n\n${contactMessage}`

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSending || wasSubmitted) return

        const normalizedEmail = customerEmail.trim()
        setIsSending(true)
        try {
            await sendQuoteEmailWithFormSubmit({ quote, customerEmail: normalizedEmail, message })
            setWasSubmitted(true)
        } catch (error) {
            console.error('FormSubmit rejected the itinerary quote:', error)
            const providerMessage = error instanceof Error ? error.message : ''
            onError(/rate limit exceeded/i.test(providerMessage) ? copy.emailRateLimitError : copy.emailSendError)
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
                    disabled={isSending || wasSubmitted}
                />
                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSending || wasSubmitted}
                >
                    {isSending ? copy.sendingQuote : wasSubmitted ? copy.submittedToForm : copy.sendQuote}
                </button>
            </div>
            {wasSubmitted ? <p role="status">{copy.externalSubmitNotice}</p> : null}
        </form>
    )
}
