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
    activity: '💬',
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
                {plan.specialLabel ? <span className="card-tag itinerary-special-tag">{copy.specialPlan}</span> : null}
                <h3>{localize(plan.name)}</h3>
                <p>{localize(plan.summary)}</p>
                {plan.coverImage ? (
                    <img
                        className="itinerary-plan-cover"
                        src={plan.coverImage.src}
                        alt={localize(plan.coverImage.alt)}
                    />
                ) : null}
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
                                        <span className="itinerary-stop-kind">
                                            {copy.kinds[stop.kind]}
                                            {stop.isTentative ? (
                                                <span className="itinerary-stop-tentative">{copy.tentative}</span>
                                            ) : null}
                                        </span>
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

            {plan.inclusions?.length ? (
                <section className="itinerary-plan-details">
                    <h4>{copy.inclusions}</h4>
                    <ul>
                        {plan.inclusions.map((inclusion) => (
                            <li key={inclusion.en}>{localize(inclusion)}</li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {plan.conditions?.length ? (
                <section className="itinerary-plan-details">
                    <h4>{copy.conditions}</h4>
                    <ul>
                        {plan.conditions.map((condition) => (
                            <li key={condition.en}>{localize(condition)}</li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </section>
    )
}
