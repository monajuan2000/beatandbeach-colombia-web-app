import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import type { CityItineraries, ItineraryPlan, ItineraryStop, StopKind } from '../../types'
import { findPriceItem } from '../../utils/planCosts'
import './ItineraryTimeline.css'

const KIND_ICONS: Record<StopKind, string> = {
    transport: '🚌',
    meal: '🍽',
    attraction: '⛰',
    lodging: '🛏',
}

type ItineraryTimelineProps = {
    plan: ItineraryPlan
    catalog: CityItineraries
}

/** Day-by-day schedule of a plan, one card per day. */
export function ItineraryTimeline({ plan, catalog }: ItineraryTimelineProps) {
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.timeline

    const stopPrice = (stop: ItineraryStop) => {
        const item = findPriceItem(catalog, stop.priceId)
        if (item) return formatCop(item.unitPrice, locale)
        return stop.kind === 'attraction' ? copy.free : null
    }

    return (
        <section className="itinerary-timeline" aria-label={copy.ariaLabel(localize(plan.name))}>
            <div className="itinerary-timeline-intro">
                <h3>{localize(plan.name)}</h3>
                <p>{localize(plan.summary)}</p>
            </div>

            {plan.days.map((day, dayIndex) => (
                <article key={day.title.en} className="itinerary-day">
                    <header className="itinerary-day-header">
                        <span className="card-tag">{copy.day(dayIndex + 1)}</span>
                        <h4>{localize(day.title)}</h4>
                    </header>

                    <ol className="itinerary-stops">
                        {day.stops.map((stop) => {
                            const price = stopPrice(stop)

                            return (
                                <li key={`${stop.time}-${stop.title.en}`} className={`itinerary-stop is-${stop.kind}`}>
                                    <time className="itinerary-stop-time">{stop.time}</time>
                                    <span className="itinerary-stop-icon" aria-hidden="true">
                                        {KIND_ICONS[stop.kind]}
                                    </span>
                                    <div className="itinerary-stop-copy">
                                        <span className="itinerary-stop-kind">{copy.kinds[stop.kind]}</span>
                                        <strong>{localize(stop.title)}</strong>
                                        <p>{localize(stop.description)}</p>
                                    </div>
                                    {price ? <span className="itinerary-stop-price">{price}</span> : null}
                                </li>
                            )
                        })}
                    </ol>
                </article>
            ))}
        </section>
    )
}
