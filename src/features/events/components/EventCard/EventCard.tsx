import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/Badge/Badge'
import { getCityById } from '@/features/cities/data/cities'
import { useTrip } from '@/features/trip/context/TripContext'
import type { EventItem } from '../../types'
import './EventCard.css'

type EventCardVariant = 'standard' | 'city'

type EventCardProps = {
    event: EventItem
    onViewDetails: (event: EventItem) => void
    /** `standard` is the home page list card; `city` is the image-backed card on city pages. */
    variant?: EventCardVariant
}

function imageBackground(image: string): CSSProperties {
    return {
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.92)), url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}

export function EventCard({ event, onViewDetails, variant = 'standard' }: EventCardProps) {
    const { isEventSaved } = useTrip()

    const detailsButton = (
        <button type="button" className="text-button" onClick={() => onViewDetails(event)}>
            View details
        </button>
    )

    if (variant === 'city') {
        return (
            <article
                className="event-card event-card-city"
                style={event.image ? imageBackground(event.image) : undefined}
            >
                <div className="event-card-row">
                    <Badge tone="blue">{event.category}</Badge>
                    <span className="event-card-date">{event.date}</span>
                </div>

                <h3>{event.title}</h3>
                <p className="event-card-location">{event.location}</p>
                <p className="event-card-summary">{event.summary}</p>

                <div className="event-card-row event-card-footer">
                    <small>
                        {event.price}
                        {isEventSaved(event.id) ? ' · ✓ Saved' : ''}
                    </small>
                    {detailsButton}
                </div>
            </article>
        )
    }

    return (
        <article className={`event-card event-card-standard ${event.featured ? 'is-featured' : ''}`}>
            <div className="event-card-row">
                <Badge tone="blue">{event.category}</Badge>
                {event.featured ? <Badge tone="green">Featured</Badge> : null}
            </div>
            <h3>{event.title}</h3>
            <p className="event-card-location">
                {getCityById(event.cityId)?.name} · {event.location}
            </p>
            <p className="event-card-summary">{event.summary}</p>
            <div className="event-card-row event-card-meta">
                <span>{event.date}</span>
                <span>{event.price}</span>
            </div>
            <div className="event-card-row event-card-footer">
                <small>{event.audience}</small>
                {detailsButton}
            </div>
        </article>
    )
}
