export const LANGUAGES = ['en', 'es'] as const

export type Language = (typeof LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'en'

export const LANGUAGE_STORAGE_KEY = 'beatandbeach:language'

type LanguageDetails = {
    /** Name of the language written in that same language, so every visitor can recognize theirs. */
    label: string
    shortLabel: string
    /** BCP 47 locale used for date formatting. */
    locale: string
}

export const LANGUAGE_DETAILS: Record<Language, LanguageDetails> = {
    en: { label: 'English', shortLabel: 'EN', locale: 'en-US' },
    es: { label: 'Español', shortLabel: 'ES', locale: 'es-CO' },
}

export function isLanguage(value: unknown): value is Language {
    return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}
