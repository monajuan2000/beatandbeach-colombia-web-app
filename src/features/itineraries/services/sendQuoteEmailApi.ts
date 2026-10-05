import type { QuotePdfContent } from '../utils/downloadQuotePdf'
import { buildQuoteEmailBody } from '../utils/buildQuoteEmailBody'
import { BUSINESS_EMAIL } from '@/config/externalLinks'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const SEND_QUOTE_ENDPOINT = `${API_BASE_URL}/api/send-itinerary`
type ApiResponse = { success?: boolean | string; message?: string }

/** Sends the quote through the existing API sender for future backend use. */
export async function sendQuoteEmailWithApi(quote: QuotePdfContent, customerEmail: string) {
    const { text, html } = buildQuoteEmailBody(quote)
    const response = await fetch(SEND_QUOTE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            to: customerEmail.trim(),
            cc: BUSINESS_EMAIL,
            subject: `${quote.labels.quoteLabel} · ${quote.planName}`,
            text,
            html,
        }),
    })
    const result = (await response.json().catch(() => ({}))) as ApiResponse
    if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message ?? `Quote email failed with status ${response.status}`)
    }
}
