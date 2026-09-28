import { createContext, useContext } from 'react'
import type { Language } from '../config'
import type { Messages } from '../messages'
import type { LocalizedText } from '../types'

export type LanguageContextValue = {
    language: Language
    setLanguage: (language: Language) => void
    /** UI copy for the active language, e.g. `t.common.header.planTrip`. */
    t: Messages
    /** Picks the active language from a content field, e.g. `localize(event.title)`. */
    localize: (text: LocalizedText) => string
    /** BCP 47 locale of the active language, for `Intl` / `toLocaleDateString`. */
    locale: string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useTranslation() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useTranslation must be used inside <LanguageProvider>')
    }

    return context
}
