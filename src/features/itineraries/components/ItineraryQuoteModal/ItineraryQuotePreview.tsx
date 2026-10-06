import type { QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuotePreviewProps = {
    quote: QuotePdfContent
    planLabel: string
}

export function ItineraryQuotePreview({ quote, planLabel }: ItineraryQuotePreviewProps) {
    return (
        <div className="itinerary-quote-preview">
            <div className="itinerary-quote-summary">
                <span>{planLabel}</span>
                <strong>{quote.planName}</strong>
                <p>{quote.summary}</p>
            </div>

            <section className="itinerary-quote-section">
                <div className="itinerary-quote-section-heading">
                    <h4>{quote.labels.itinerary}</h4>
                </div>
                <div className="itinerary-quote-list">
                    {quote.days.map((day, dayIndex) => (
                        <div key={`${dayIndex}-${day.title}`} className="itinerary-quote-day">
                            <h5><span>{quote.labels.day(dayIndex + 1)}</span>{day.title}</h5>
                            <ul>
                                {day.stops.map((stop, stopIndex) => (
                                    <li key={`${stopIndex}-${stop.title}`}>
                                        <time>{stop.time}</time>
                                        <div className="itinerary-quote-stop-copy">
                                            <strong>{stop.title}</strong>
                                            {stop.description ? <p>{stop.description}</p> : null}
                                            {stop.isTentative ? <small>{quote.labels.tentative}</small> : null}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="itinerary-quote-section">
                <div className="itinerary-quote-section-heading">
                    <h4>{quote.labels.costSummary}</h4>
                </div>
                <div className="itinerary-quote-cost-list">
                    {quote.costs.map((cost) => (
                        <div key={cost.label} className="itinerary-quote-cost-item">
                            <span>{cost.label}</span>
                            <strong>{cost.value}</strong>
                        </div>
                    ))}
                </div>
                <div className="itinerary-quote-total">
                    <span>{quote.labels.total}</span>
                    <strong>{quote.total}</strong>
                </div>
            </section>
        </div>
    )
}
