import emailjs from '@emailjs/browser'
import { BUSINESS_EMAIL } from '@/config/externalLinks'
import { EMAILJS_CONFIG, isEmailJsConfigured } from '@/config/emailJs'
import type { QuotePdfContent } from '../utils/downloadQuotePdf'

type QuoteEmailBody = {
    text: string
    html: string
}

export type EmailJsQuoteEmailOptions = {
    quote: QuotePdfContent
    customerEmail: string
    body: QuoteEmailBody
}

export class EmailJsConfigurationError extends Error {
    constructor() {
        super('EmailJS is not configured. Set the service ID, template ID, and public key.')
        this.name = 'EmailJsConfigurationError'
    }
}

/** Sends the itinerary body through EmailJS; FormSubmit remains available as a separate adapter. */
export async function sendQuoteEmailWithEmailJs({ quote, customerEmail, body }: EmailJsQuoteEmailOptions) {
    if (!isEmailJsConfigured()) throw new EmailJsConfigurationError()

    const email = customerEmail.trim()
    return emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
            to_email: BUSINESS_EMAIL,
            cc_email: email,
            reply_to: email,
            subject: `${quote.labels.brandName} · ${quote.labels.quoteLabel} · ${quote.planName}`,
            plan_name: quote.planName,
            message_text: body.text,
            message_html: body.html,
        },
        { publicKey: EMAILJS_CONFIG.publicKey },
    )
}