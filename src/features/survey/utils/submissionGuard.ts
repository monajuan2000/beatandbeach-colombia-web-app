/*
 * Remembers which emails already answered a survey on this browser, to warn before a duplicate.
 * Only SHA-256 hashes are stored, so no readable personal data stays on shared devices.
 * This is a courtesy check, not a guarantee: deduplicate by email when analyzing the responses.
 */
const STORAGE_PREFIX = 'beatandbeach:survey-submissions:v2:'
/** First version stored plain-text emails; they are hashed and removed on the next read. */
const LEGACY_STORAGE_PREFIX = 'beatandbeach:survey-submissions:'

function storageKey(surveyId: string) {
    return `${STORAGE_PREFIX}${surveyId}`
}

function normalizeEmail(email: string) {
    return email.trim().toLowerCase()
}

async function hashEmail(email: string) {
    const bytes = new TextEncoder().encode(normalizeEmail(email))
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function readStringList(key: string): string[] {
    try {
        const stored = localStorage.getItem(key)
        if (!stored) return []

        const parsed: unknown = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
    } catch {
        return []
    }
}

function writeHashes(surveyId: string, hashes: string[]) {
    try {
        localStorage.setItem(storageKey(surveyId), JSON.stringify(hashes))
    } catch {
        // Some browsers block localStorage; the form still works without the duplicate check.
    }
}

async function readSubmittedHashes(surveyId: string) {
    const hashes = readStringList(storageKey(surveyId))
    const legacyKey = `${LEGACY_STORAGE_PREFIX}${surveyId}`
    const legacyEmails = readStringList(legacyKey)

    if (legacyEmails.length === 0) return hashes

    const migrated = [...new Set([...hashes, ...(await Promise.all(legacyEmails.map(hashEmail)))])]
    writeHashes(surveyId, migrated)
    try {
        localStorage.removeItem(legacyKey)
    } catch {
        // Nothing else to clean up if storage is blocked.
    }
    return migrated
}

/** `crypto.subtle` only exists on secure origins (HTTPS or localhost); without it the check is skipped. */
function canHash() {
    return typeof crypto !== 'undefined' && Boolean(crypto.subtle)
}

export async function hasSubmittedEmail(surveyId: string, email: string) {
    if (!canHash()) return false

    try {
        const [hashes, hash] = await Promise.all([readSubmittedHashes(surveyId), hashEmail(email)])
        return hashes.includes(hash)
    } catch {
        return false
    }
}

export async function rememberSubmittedEmail(surveyId: string, email: string) {
    if (!canHash()) return

    try {
        const [hashes, hash] = await Promise.all([readSubmittedHashes(surveyId), hashEmail(email)])
        if (!hashes.includes(hash)) writeHashes(surveyId, [...hashes, hash])
    } catch {
        // A failed hash only disables the duplicate warning; the response was already sent.
    }
}
