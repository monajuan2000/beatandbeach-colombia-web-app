import { Link, useMatch } from 'react-router-dom'
import logoImage from '@/assets/images/brand/beat-and-beach-logo.png'
import { isTripPlannerAvailable, TRIP_PLANNER_CONFIG } from '@/features/trip/config'
import { useTrip } from '@/features/trip/context/TripContext'
import { LanguageSwitcher } from '@/i18n/components/LanguageSwitcher/LanguageSwitcher'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './SiteHeader.css'

const navSections = ['discover', 'cities', 'events', 'insights'] as const

export function SiteHeader() {
    const { savedEventIds, openPlanner } = useTrip()
    const cityRoute = useMatch('/cities/:cityId')
    const { t } = useTranslation()
    const copy = t.common.header
    const plannerCityId = cityRoute?.params.cityId ?? TRIP_PLANNER_CONFIG.defaultCityId
    const canPlanTrip = isTripPlannerAvailable(plannerCityId)

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
                <button
                    type="button"
                    className="primary-button small-button"
                    onClick={() => canPlanTrip && openPlanner(plannerCityId)}
                    disabled={!canPlanTrip}
                >
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
