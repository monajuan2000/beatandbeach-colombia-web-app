import type { QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuotePreviewProps = {
    quote: QuotePdfContent
    planLabel: string
}

export function ItineraryQuotePreview({ quote, planLabel }: ItineraryQuotePreviewProps) {
    return (
        <>
            <div className="itinerary-quote-summary">
                <span>{planLabel}</span>
                <strong>{quote.planName}</strong>
                <p>{quote.summary}</p>
            </div>

            <section className="itinerary-quote-section">
                <h4>{quote.labels.itinerary}</h4>
                <div className="itinerary-quote-list">
                    {quote.days.map((day, dayIndex) => (
                        <div key={`${dayIndex}-${day.title}`} className="itinerary-quote-day">
                            <strong>{quote.labels.day(dayIndex + 1)} · {day.title}</strong>
                            <ul>
                                {day.stops.map((stop, stopIndex) => (
                                    <li key={`${stopIndex}-${stop.title}`}>
                                        <span>{stop.time}</span>
                                        <span>{stop.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="itinerary-quote-section">
                <h4>{quote.labels.costSummary}</h4>
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
        </>
    )
}
