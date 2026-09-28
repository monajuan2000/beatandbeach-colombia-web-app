import { Link } from 'react-router-dom'
import logoImage from '@/assets/images/brand/beat-and-beach-logo.png'
import { useTrip } from '@/features/trip/context/TripContext'
import { LanguageSwitcher } from '@/i18n/components/LanguageSwitcher/LanguageSwitcher'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './SiteHeader.css'

const navSections = ['discover', 'cities', 'events', 'insights'] as const

export function SiteHeader() {
    const { savedEventIds, openPlanner } = useTrip()
    const { t } = useTranslation()
    const copy = t.common.header

    return (
        <header className="site-header">
            <Link to="/" className="brand-block" aria-label={copy.homeAriaLabel}>
                <img src={logoImage} alt={copy.logoAlt} className="brand-logo" />
                <div className="brand-copy">
                    <p className="brand-name">Beat & Beach</p>
                    <span className="brand-subtitle">{copy.subtitle}</span>
                </div>
            </Link>

            <nav className="main-nav" aria-label={copy.navAriaLabel}>
                {navSections.map((section) => (
                    <Link key={section} to="/" state={{ scrollTo: section }}>
                        {copy.nav[section]}
                    </Link>
                ))}
            </nav>

            <div className="site-header-actions">
                <LanguageSwitcher />
                <button type="button" className="primary-button small-button" onClick={() => openPlanner()}>
                    {copy.planTrip}
                    {savedEventIds.length > 0 ? (
                        <span className="trip-count" aria-label={copy.savedEvents(savedEventIds.length)}>
                            {savedEventIds.length}
                        </span>
                    ) : null}
                </button>
            </div>
        </header>
    )
}
