import { useId, useState, type FormEvent } from 'react'
import {
    BUSINESS_EMAIL,
    INSTAGRAM_PROFILE_URL,
    WHATSAPP_BUSINESS_PHONE,
} from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { QuotePdfContent } from '../../utils/downloadQuotePdf'
import { sendQuoteEmailWithFormSubmit } from '../../services/sendQuoteEmailWithFormSubmit'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    onError: (message: string) => void
    onSuccess: () => void
}

export function ItineraryQuoteEmailForm({ quote, onError, onSuccess }: ItineraryQuoteEmailFormProps) {
    const { t } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const emailInputId = useId()
    const [customerEmail, setCustomerEmail] = useState('')
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSending) return

        setIsSending(true)
        try {
            const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
            whatsappUrl.searchParams.set('text', copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
            await sendQuoteEmailWithFormSubmit({
                quote,
                customerEmail,
                message: copy.emailMessage(
                    quote.planName,
                    BUSINESS_EMAIL,
                    WHATSAPP_BUSINESS_PHONE,
                    whatsappUrl.toString(),
                    INSTAGRAM_PROFILE_URL,
                ),
                customerEmailFieldLabel: copy.submissionFields.customerEmail,
                messageFieldLabel: copy.submissionFields.message,
            })
            onSuccess()
        } catch {
            onError(copy.emailSendError)
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
