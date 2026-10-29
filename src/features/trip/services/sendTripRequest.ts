import { submitFormSubmit } from '@/services/formSubmit/submitFormSubmit'
import type { Language } from '@/i18n/config'
import { tripEn } from '../i18n/en'
import { tripEs } from '../i18n/es'

export type TripRequestEmail = {
    reference: string
    customerName: string
    customerEmail: string
    message: string
    language?: Language
}

export async function sendTripRequestEmail({
    reference,
    customerName,
    customerEmail,
    message,
    language = 'es',
}: TripRequestEmail) {
    const copy = language === 'es' ? tripEs : tripEn

    await submitFormSubmit({
        _subject: copy.requestEmail.subject(reference),
        _replyto: customerEmail.trim(),
        _cc: customerEmail.trim(),
        _template: 'table',
        name: customerName.trim(),
        email: customerEmail.trim(),
        message,
    })
}
