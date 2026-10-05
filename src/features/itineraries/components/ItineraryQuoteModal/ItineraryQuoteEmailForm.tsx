import { useId, useState, type FormEvent } from 'react'
import {
    BUSINESS_EMAIL,
    INSTAGRAM_PROFILE_URL,
    WHATSAPP_BUSINESS_PHONE,
} from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { MAX_QUOTE_PDF_SIZE_BYTES } from '../../config'
import type { QuotePdfContent } from '../../utils/downloadQuotePdf'
import { sendQuoteEmailWithFormSubmit } from '../../services/sendQuoteEmailWithFormSubmit'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    pdfFile: File | null
    isPreparing: boolean
    onError: (message: string) => void
}

export function ItineraryQuoteEmailForm({ quote, pdfFile, isPreparing, onError }: ItineraryQuoteEmailFormProps) {
    const { t } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const emailInputId = useId()
    const [customerEmail, setCustomerEmail] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSending || !pdfFile) return

        if (pdfFile.size > MAX_QUOTE_PDF_SIZE_BYTES) {
            onError(copy.fileTooLarge)
            return
        }

        setIsSending(true)
        setIsSent(false)
        try {
            const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
            whatsappUrl.searchParams.set('text', copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL))
            await sendQuoteEmailWithFormSubmit({
                quote,
                customerEmail,
                pdfFile,
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
            setIsSent(true)
        } catch (error) {
            console.error('Could not send itinerary quote email:', error)
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
                    disabled={isSending || isPreparing || !pdfFile}
                >
                    {isSending ? copy.sendingQuote : copy.sendQuote}
                </button>
            </div>
            {isSent ? (
                <p className="itinerary-quote-email-success" role="status">{copy.emailSent}</p>
            ) : null}
        </form>
    )
}
