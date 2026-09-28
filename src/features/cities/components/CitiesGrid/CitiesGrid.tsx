import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { getEventsByCity } from '@/features/events/data/events'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { cities } from '../../data/cities'
import { CityStatusBadge } from '../CityStatusBadge/CityStatusBadge'
import './CitiesGrid.css'

export function CitiesGrid() {
    const { t, localize } = useTranslation()
    const copy = t.cities.grid

    return (
        <section className="content-section cities-section" id="cities">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />

            <div className="cities-grid">
                {cities.map((city) => (
                    <Link
                        key={city.id}
                        to={`/cities/${city.id}`}
                        className={`city-card city-card-${city.status}`}
                        style={
                            city.image
                                ? {
                                    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(8, 47, 73, 0.8)), url("${city.image}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
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
                            {city.status === 'under-review' ? (
                                <span className="city-card-notice">{t.cities.status.cardNotice}</span>
                            ) : null}
                            <span className="city-card-cta">{copy.eventCount(getEventsByCity(city.id).length)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
