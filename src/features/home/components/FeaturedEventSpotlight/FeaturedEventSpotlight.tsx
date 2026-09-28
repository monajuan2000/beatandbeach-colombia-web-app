import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCityById } from '@/features/cities/data/cities'
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal/EventDetailsModal'
import { getEventById } from '@/features/events/data/events'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './FeaturedEventSpotlight.css'

const SPOTLIGHT_EVENT_ID = 'edc-colombia-2026'

export function FeaturedEventSpotlight() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const { t, localize } = useTranslation()
    const copy = t.home.spotlight
    const event = getEventById(SPOTLIGHT_EVENT_ID)

    if (!event) return null

    const city = getCityById(event.cityId)
    const cityName = city?.name ?? ''

    return (
        <section className="featured-event-spotlight" aria-label={copy.ariaLabel}>
            <div className="featured-event-visual" style={{ backgroundImage: `url("${event.image}")` }} />
            <div className="featured-event-copy">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h2>{localize(event.title)}</h2>
                <p>{copy.description(cityName)}</p>
                <div className="meta-pill-row">
                    <span>{localize(event.date)}</span>
                    <span>{cityName}</span>
                </div>
                <div className="action-row">
                    <button type="button" className="primary-button" onClick={() => setIsDetailsOpen(true)}>
                        {t.common.viewDetails}
                    </button>
                    {city ? (
                        <Link to={`/cities/${city.id}`} className="inverse-button">
                            {copy.moreIn(city.name)}
                        </Link>
                    ) : null}
                </div>
            </div>

            <EventDetailsModal event={isDetailsOpen ? event : null} onClose={() => setIsDetailsOpen(false)} />
        </section>
    )
}
