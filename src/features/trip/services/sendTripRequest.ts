import { submitFormSubmit } from '@/services/formSubmit/submitFormSubmit'

export type TripRequestEmail = {
    reference: string
    customerName: string
    customerEmail: string
    message: string
}

export async function sendTripRequestEmail({
    reference,
    customerName,
    customerEmail,
    message,
}: TripRequestEmail) {
    await submitFormSubmit({
        _subject: `Solicitud de viaje ${reference} · Beat & Beach Colombia`,
        _replyto: customerEmail.trim(),
        _cc: customerEmail.trim(),
        _template: 'table',
        name: customerName.trim(),
        email: customerEmail.trim(),
        message,
    })
}
