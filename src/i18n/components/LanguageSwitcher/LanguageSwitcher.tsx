import { LANGUAGE_DETAILS, LANGUAGES } from '../../config'
import { useTranslation } from '../../context/LanguageContext'
import './LanguageSwitcher.css'

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useTranslation()

    return (
        <div className="language-switcher" role="group" aria-label={t.common.languageLabel}>
            {LANGUAGES.map((code) => {
                const isActive = code === language
                const details = LANGUAGE_DETAILS[code]

                return (
                    <button
                        key={code}
                        type="button"
                        lang={code}
                        className={`language-switcher-option ${isActive ? 'is-active' : ''}`}
                        aria-pressed={isActive}
                        aria-label={details.label}
                        title={details.label}
                        onClick={() => setLanguage(code)}
                    >
                        {details.shortLabel}
                    </button>
                )
            })}
        </div>
    )
}
