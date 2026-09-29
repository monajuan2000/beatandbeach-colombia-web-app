import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/context/LanguageContext'

/** "Back to home" action (the author's portfolio link lives in the site footer). */
export function SurveyNavActions() {
    const { t } = useTranslation()

    return (
        <div className="action-row">
            <Link to="/" className="inverse-button">
                {t.common.backToHome}
            </Link>
        </div>
    )
}
