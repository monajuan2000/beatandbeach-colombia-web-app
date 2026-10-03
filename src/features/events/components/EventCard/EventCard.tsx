import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/Badge/Badge'
import { getCityById } from '@/features/cities/data/cities'
import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { isEventBookable } from '../../data/events'
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
    const { t, localize } = useTranslation()
    const categoryLabel = t.events.categories[event.category]
    const hasPrice = Boolean(event.price && (event.price.en || event.price.es))

    const detailsButton = (
        <button type="button" className="text-button" onClick={() => onViewDetails(event)}>
            {t.common.viewDetails}
        </button>
    )

    if (variant === 'city') {
        const comingSoon = !isEventBookable(event)

        return (
            <article
                className={`event-card event-card-city ${comingSoon ? 'is-coming-soon' : ''}`.trim()}
                style={event.image ? imageBackground(event.image) : undefined}
            >
                {comingSoon ? <div className="event-card-soon">{t.events.card.comingSoon}</div> : null}

                <div className="event-card-row">
                    <Badge tone="blue">{categoryLabel}</Badge>
                    <span className="event-card-date">{localize(event.date)}</span>
                </div>

                <h3>{localize(event.title)}</h3>
                <p className="event-card-location">{localize(event.location)}</p>
                <p className="event-card-summary">{localize(event.summary)}</p>

                <div className="event-card-row event-card-footer">
                    <small>
                        {hasPrice ? localize(event.price!) : null}
                        {isEventSaved(event.id) ? ` · ${t.events.card.saved}` : ''}
                    </small>
                    {detailsButton}
                </div>
            </article>
        )
    }

    return (
        <article className={`event-card event-card-standard ${event.featured ? 'is-featured' : ''}`}>
            <div className="event-card-row">
                <Badge tone="blue">{categoryLabel}</Badge>
                {event.featured ? <Badge tone="green">{t.common.featured}</Badge> : null}
            </div>
            <h3>{localize(event.title)}</h3>
            <p className="event-card-location">
                {getCityById(event.cityId)?.name} · {localize(event.location)}
            </p>
            <p className="event-card-summary">{localize(event.summary)}</p>
            <div className="event-card-row event-card-meta">
                <span>{localize(event.date)}</span>
                {hasPrice ? <span>{localize(event.price!)}</span> : null}
            </div>
            <div className="event-card-row event-card-footer">
                <small>{localize(event.audience)}</small>
                {detailsButton}
            </div>
        </article>
    )
}
