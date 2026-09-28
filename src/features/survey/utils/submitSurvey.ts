import { SURVEY_SUBMIT_ENDPOINT } from '../config'

type FormSubmitResponse = {
    success?: string | boolean
    message?: string
}

/** Sends a response to the form-to-email service. Throws when it is not accepted. */
export async function submitSurvey(payload: Record<string, string>, honeypot: string) {
    const response = await fetch(SURVEY_SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // `_honey` is FormSubmit's spam trap: real visitors never fill it.
        body: JSON.stringify({ ...payload, _honey: honeypot }),
    })

    const result = (await response.json().catch(() => ({}))) as FormSubmitResponse
    const accepted = response.ok && (result.success === true || result.success === 'true')

    if (!accepted) {
        throw new Error(result.message ?? `Survey submission failed with status ${response.status}`)
    }
}
