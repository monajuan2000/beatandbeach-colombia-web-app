import { submitFormSubmit } from '@/services/formSubmit/submitFormSubmit'
import type { QuotePdfContent } from '../utils/downloadQuotePdf'

type SendQuoteEmailOptions = {
    quote: QuotePdfContent
    customerEmail: string
    message: string
}

/** Sends an itinerary quote through FormSubmit's AJAX endpoint. */
export async function sendQuoteEmailWithFormSubmit({ quote, customerEmail, message }: SendQuoteEmailOptions) {
    const email = customerEmail.trim()

    await submitFormSubmit({
        _subject: `${quote.labels.brandName} · ${quote.labels.quoteLabel} · ${quote.planName}`,
        _replyto: email,
        _cc: email,
        _template: 'table',
        name: quote.labels.brandName,
        email,
        message,
    })
}