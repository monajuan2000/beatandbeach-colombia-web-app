import { PORTFOLIO_URL } from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './SiteFooter.css'

const AUTHOR_NAME = 'Juan Esteban M.B.'

/** Copyright line + credit to the author, linking to their portfolio (opens in a new tab). */
export function SiteFooter() {
    const { t } = useTranslation()
    const copy = t.common.footer

    return (
        <footer className="site-footer">
            <p className="site-footer-copyright">
                © {new Date().getFullYear()} Beat & Beach Colombia. {copy.rights}
            </p>
            <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button small-button site-footer-author"
                aria-label={copy.authorAriaLabel(AUTHOR_NAME)}
            >
                {copy.madeBy} <strong>{AUTHOR_NAME}</strong> ↗
            </a>
        </footer>
    )
}
