import { FORM_SUBMIT_AJAX_ENDPOINT } from '@/config/formSubmit'

type FormSubmitResponse = {
    success?: string | boolean
    message?: string
}

const DEBUG_SESSION_KEY = 'debugFormSubmit'

function isDiagnosticsEnabled() {
    if (import.meta.env.DEV) return true

    try {
        return window.sessionStorage.getItem(DEBUG_SESSION_KEY) === 'true'
    } catch {
        return false
    }
}

function logFormSubmit(event: string, details: Record<string, unknown>) {
    // Enable production diagnostics in the console with sessionStorage.setItem('debugFormSubmit', 'true').
    if (isDiagnosticsEnabled()) {
        console.info(`[FormSubmit] ${event}`, details)
    }
}

function redactEmailAddresses(message: string | undefined) {
    return message?.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[email redacted]')
}

/** Sends a JSON submission through the same AJAX endpoint used by the survey. */
export async function submitFormSubmit(payload: Record<string, string>, honeypot = '') {
    const body = { ...payload, _honey: honeypot }
    const startedAt = Date.now()

    logFormSubmit('request started', {
        endpoint: 'FormSubmit AJAX',
        fieldNames: Object.keys(body),
        attachmentIncluded: false,
    })

    let response: Response
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 20_000)
    try {
        response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal,
        })
    } catch (error) {
        logFormSubmit('network error', {
            errorName: error instanceof Error ? error.name : 'UnknownError',
            timedOut: error instanceof Error && error.name === 'AbortError',
            elapsedMs: Date.now() - startedAt,
        })
        throw error instanceof Error ? error : new Error('FormSubmit network request failed.')
    } finally {
        window.clearTimeout(timeoutId)
    }

    let result: FormSubmitResponse = {}
    let responseWasJson = true
    try {
        result = (await response.json()) as FormSubmitResponse
    } catch {
        responseWasJson = false
    }

    const accepted = response.ok && (result.success === true || result.success === 'true')
    logFormSubmit('response received', {
        httpStatus: response.status,
        accepted,
        responseWasJson,
        providerMessage: redactEmailAddresses(result.message),
        elapsedMs: Date.now() - startedAt,
    })

    if (!accepted) {
        throw new Error(result.message ?? `FormSubmit rejected the request with status ${response.status}.`)
    }

    return result
}
