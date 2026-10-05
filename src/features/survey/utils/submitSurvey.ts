import { submitFormSubmit } from '@/services/formSubmit/submitFormSubmit'

/** Sends a response to the form-to-email service. Throws when it is not accepted. */
export async function submitSurvey(payload: Record<string, string>, honeypot: string) {
    // `_honey` is FormSubmit's spam trap: real visitors never fill it.
    await submitFormSubmit(payload, honeypot)
}
