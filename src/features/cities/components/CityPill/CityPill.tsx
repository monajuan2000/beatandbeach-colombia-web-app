import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { City } from '../../types'
import './CityPill.css'

/** Destination link styled by rollout status. Group several inside an element with `city-pill-row`. */
export function CityPill({ city }: { city: City }) {
    const { t } = useTranslation()
    const statusLabel = t.cities.status.labels[city.status]

    return (
        <Link
            to={`/cities/${city.id}`}
            className={`city-pill city-pill-${city.status}`}
            aria-label={t.cities.status.withStatus(city.name, statusLabel)}
            title={statusLabel}
        >
            {city.status === 'launching' ? <span className="city-pill-dot" aria-hidden="true" /> : null}
            {city.name}
            {city.status === 'under-review' ? (
                <small className="city-pill-tag" aria-hidden="true">
                    {t.cities.status.pillTag}
                </small>
            ) : null}
        </Link>
    )
}
