import { Link } from 'react-router-dom'
import { CITY_IDS } from '@/features/cities/config'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './NextEventLink.css'

const SANTA_ELENA_PLAN_ID = 'medellin-santa-elena-1d1n'

/** Compact link to the next featured experience: a camping night in Santa Elena. */
export function NextEventLink() {
    const { t } = useTranslation()
    const copy = t.home.hero.nextEvent

    return (
        <Link
            to={`/cities/${CITY_IDS.medellin}`}
            state={{ openItineraries: true, openQuotePlanId: SANTA_ELENA_PLAN_ID }}
            className="next-event-link"
        >
            <span className="next-event-link-label">{copy.label}</span>
            <span className="next-event-link-title">{t.home.santaElena.title}</span>
            <span className="next-event-link-arrow" aria-hidden="true">
                →
            </span>
        </Link>
    )
}
