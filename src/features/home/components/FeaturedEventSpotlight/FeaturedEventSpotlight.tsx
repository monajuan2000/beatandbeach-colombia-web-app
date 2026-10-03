import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Countdown } from '@/components/ui/Countdown/Countdown'
import { getCityById } from '@/features/cities/data/cities'
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal/EventDetailsModal'
import { SaveEventButton } from '@/features/events/components/SaveEventButton/SaveEventButton'
import { getEventById } from '@/features/events/data/events'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatDayRange } from '@/utils/date'
import { revealDelay } from '@/utils/reveal'
import { SPOTLIGHT_EVENT_ID } from '../../data/spotlight'
import './FeaturedEventSpotlight.css'

export function FeaturedEventSpotlight() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const { t, localize, locale } = useTranslation()
    const { ref, inView } = useInView<HTMLElement>()
    const copy = t.home.spotlight
    const event = getEventById(SPOTLIGHT_EVENT_ID)

    if (!event) return null

    const city = getCityById(event.cityId)
    const cityName = city?.name ?? ''
    const calendar = event.startsAt ? formatDayRange(event.startsAt, event.endsAt, locale) : null
    const facts = [
        { id: 'date', icon: '📅', label: copy.facts.date, value: localize(event.date) },
        { id: 'venue', icon: '📍', label: copy.facts.venue, value: `${localize(event.location)} · ${cityName}` },
        ...(event.price && (event.price.en || event.price.es)
            ? [{ id: 'tickets', icon: '🎟️', label: copy.facts.tickets, value: localize(event.price) }]
            : []),
        { id: 'genre', icon: '🎧', label: copy.facts.genre, value: t.events.categories[event.category] },
    ]

    return (
        <section
            ref={ref}
            id="spotlight"
            className={`featured-event-spotlight reveal-group ${inView ? 'is-revealed' : ''}`}
            aria-label={copy.ariaLabel}
        >
            <div className="featured-event-visual">
                <div className="featured-event-image" style={{ backgroundImage: `url("${event.image}")` }} />
                {calendar ? (
                    <div className="featured-event-calendar" aria-hidden="true">
                        <span>{calendar.month}</span>
                        <strong>{calendar.days}</strong>
                        <small>{calendar.year}</small>
                    </div>
                ) : null}
            </div>

            <div className="featured-event-copy">
                <span className="featured-event-badge reveal-item">{copy.eyebrow}</span>
                <h2 className="reveal-item" style={revealDelay(1)}>
                    {localize(event.title)}
                </h2>
                <p className="reveal-item" style={revealDelay(2)}>
                    {copy.description(cityName)}
                </p>

                {event.startsAt ? (
                    <div className="reveal-item" style={revealDelay(3)}>
                        <Countdown
                            target={event.startsAt}
                            label={copy.countdown.label}
                            units={copy.countdown.units}
                            endedLabel={copy.countdown.ended}
                            className="featured-event-countdown"
                        />
                    </div>
                ) : null}

                <dl className="featured-event-facts reveal-item" style={revealDelay(4)} aria-label={copy.factsAriaLabel}>
                    {facts.map((fact) => (
                        <div key={fact.id} className="featured-event-fact">
                            <span className="featured-event-fact-icon" aria-hidden="true">
                                {fact.icon}
                            </span>
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="action-row featured-event-actions reveal-item" style={revealDelay(5)}>
                    <button type="button" className="primary-button" onClick={() => setIsDetailsOpen(true)}>
                        {t.common.viewDetails}
                    </button>
                    <SaveEventButton event={event} variant="secondary" />
                    {city ? (
                        <Link to={`/cities/${city.id}`} className="text-button featured-event-more">
                            {copy.moreIn(city.name)} <span aria-hidden="true">→</span>
                        </Link>
                    ) : null}
                </div>
            </div>

            <EventDetailsModal event={isDetailsOpen ? event : null} onClose={() => setIsDetailsOpen(false)} />
        </section>
    )
}
