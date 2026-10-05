import { PUBLIC_SITE_ORIGIN } from '@/config/externalLinks'
import { submitFormSubmit } from '@/services/formSubmit/submitFormSubmit'
import type { QuotePdfContent } from '../utils/downloadQuotePdf'

type SendQuoteEmailOptions = {
    quote: QuotePdfContent
    customerEmail: string
    message: string
    customerEmailFieldLabel: string
    messageFieldLabel: string
}

/** Sends itinerary details through the same FormSubmit AJAX endpoint as the survey. */
export async function sendQuoteEmailWithFormSubmit({
    quote,
    customerEmail,
    message,
    customerEmailFieldLabel,
    messageFieldLabel,
}: SendQuoteEmailOptions) {
    const email = customerEmail.trim()
    const quotePageUrl = new URL(import.meta.env.BASE_URL, PUBLIC_SITE_ORIGIN)
    quotePageUrl.hash = '/cities/guatape'

    await submitFormSubmit({
        _subject: `${quote.labels.brandName} · ${quote.labels.quoteLabel} · ${quote.planName}`,
        _url: quotePageUrl.toString(),
        _replyto: email,
        _cc: email,
        _template: 'table',
        [customerEmailFieldLabel]: email,
        [messageFieldLabel]: message,
    })
}
