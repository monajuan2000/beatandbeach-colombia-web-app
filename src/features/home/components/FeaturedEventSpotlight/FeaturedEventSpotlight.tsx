import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal/EventDetailsModal'
import { getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import './FeaturedEventSpotlight.css'

const SPOTLIGHT_EVENT_ID = 'edc-colombia-2026'

export function FeaturedEventSpotlight() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const event = getEventById(SPOTLIGHT_EVENT_ID)

    if (!event) return null

    const city = getCityById(event.cityId)

    return (
        <section className="featured-event-spotlight" aria-label="Featured event spotlight">
            <div className="featured-event-visual" style={{ backgroundImage: `url("${event.image}")` }} />
            <div className="featured-event-copy">
                <span className="eyebrow">Popular event</span>
                <h2>{event.title}</h2>
                <p>
                    Experience the city’s most electrifying festival weekend with world-class electronic acts,
                    immersive stages, and a late-night atmosphere unlike any other in {city?.name}.
                </p>
                <div className="meta-pill-row">
                    <span>{event.date}</span>
                    <span>{city?.name}</span>
                </div>
                <div className="action-row">
                    <button type="button" className="primary-button" onClick={() => setIsDetailsOpen(true)}>
                        View details
                    </button>
                    {city ? (
                        <Link to={`/cities/${city.id}`} className="secondary-button">
                            More in {city.name}
                        </Link>
                    ) : null}
                </div>
            </div>

            <EventDetailsModal event={isDetailsOpen ? event : null} onClose={() => setIsDetailsOpen(false)} />
        </section>
    )
}
