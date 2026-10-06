import { ITINERARY_EMAIL_PROVIDER } from '@/config/itineraryEmail'
import { sendQuoteEmailWithEmailJs, type EmailJsQuoteEmailOptions } from './sendQuoteEmailWithEmailJs'
import { sendQuoteEmailWithFormSubmit } from './sendQuoteEmailWithFormSubmit'

type SendItineraryQuoteEmailOptions = EmailJsQuoteEmailOptions

export async function sendItineraryQuoteEmail({ quote, customerEmail, body }: SendItineraryQuoteEmailOptions) {
    if (ITINERARY_EMAIL_PROVIDER === 'formsubmit') {
        await sendQuoteEmailWithFormSubmit({ quote, customerEmail, message: body.text })
        return
    }

    await sendQuoteEmailWithEmailJs({ quote, customerEmail, body })
}