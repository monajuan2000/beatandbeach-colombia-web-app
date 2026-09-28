import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LANGUAGE, isLanguage, LANGUAGE_DETAILS, LANGUAGE_STORAGE_KEY, type Language } from '../config'
import { messages } from '../messages'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

function readInitialLanguage(): Language {
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
        if (isLanguage(stored)) return stored
    } catch {
        // Storage can be unavailable (private mode, blocked site data); fall back to the browser language.
    }

    return navigator.language.toLowerCase().startsWith('es') ? 'es' : DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(readInitialLanguage)

    useEffect(() => {
        document.documentElement.lang = language
        document.title = messages[language].common.documentTitle

        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
        } catch {
            // Remembering the choice is best effort.
        }
    }, [language])

    const value = useMemo<LanguageContextValue>(
        () => ({
            language,
            setLanguage,
            t: messages[language],
            localize: (text) => text[language],
            locale: LANGUAGE_DETAILS[language].locale,
        }),
        [language],
    )

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
