import { Link } from 'react-router-dom'
import { PORTFOLIO_URL } from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'

/** "Back to home" + "View my portfolio" (opens in a new tab so the survey is not lost). */
export function SurveyNavActions() {
    const { t } = useTranslation()

    return (
        <div className="action-row">
            <Link to="/" className="inverse-button">
                {t.common.backToHome}
            </Link>
            <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
                aria-label={t.survey.page.portfolioAriaLabel}
            >
                {t.survey.page.portfolio} ↗
            </a>
        </div>
    )
}
