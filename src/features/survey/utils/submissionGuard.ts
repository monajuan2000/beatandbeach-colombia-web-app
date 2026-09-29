const STORAGE_PREFIX = 'beatandbeach:survey-submissions:'

function storageKey(surveyId: string) {
    return `${STORAGE_PREFIX}${surveyId}`
}

function normalizeEmail(email: string) {
    return email.trim().toLowerCase()
}

function readSubmittedEmails(surveyId: string): string[] {
    try {
        const stored = localStorage.getItem(storageKey(surveyId))
        if (!stored) return []

        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed.filter((email): email is string => typeof email === 'string') : []
    } catch {
        return []
    }
}

export function hasSubmittedEmail(surveyId: string, email: string) {
    return readSubmittedEmails(surveyId).includes(normalizeEmail(email))
}

export function rememberSubmittedEmail(surveyId: string, email: string) {
    const normalizedEmail = normalizeEmail(email)
    const submittedEmails = readSubmittedEmails(surveyId)

    if (submittedEmails.includes(normalizedEmail)) return

    try {
        localStorage.setItem(storageKey(surveyId), JSON.stringify([...submittedEmails, normalizedEmail]))
    } catch {
        // Some browsers block localStorage; the form can still report a successful submission.
    }
}