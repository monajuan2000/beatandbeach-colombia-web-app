import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge/Badge'
import { getEventsByCity } from '@/features/events/data/events'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { City } from '../../types'
import { CityStatusBadge } from '../CityStatusBadge/CityStatusBadge'
import { CityStatusNotice } from '../CityStatusNotice/CityStatusNotice'
import './CityCard.css'

/** Reusable destination card for city grids and featured home sections. */
export function CityCard({ city }: { city: City }) {
    const { t, localize } = useTranslation()

    return (
        <Link
            to={`/cities/${city.id}`}
            className={`city-card city-card-${city.id} city-card-${city.status}`}
            style={
                city.image
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(8, 47, 73, 0.8)), url("${city.image}")`,
                    }
                    : undefined
            }
        >
            <div className="city-card-overlay" />
            <div className="city-card-content">
                <div className="city-card-badges">
                    <Badge tone="sky">{localize(city.region)}</Badge>
                    <CityStatusBadge status={city.status} />
                </div>
                <h3>{city.name}</h3>
                <p>{localize(city.description)}</p>
                <CityStatusNotice
                    city={city}
                    variant="highlight"
                    detail={t.cities.status.cardNotice}
                    className="city-card-notice"
                />
                <div className="city-card-footer">
                    <span className="city-card-events">
                        {t.cities.grid.eventCount(getEventsByCity(city.id).length)}
                    </span>
                    <span className="city-card-cta">
                        {t.cities.grid.explore} <span aria-hidden="true">→</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
