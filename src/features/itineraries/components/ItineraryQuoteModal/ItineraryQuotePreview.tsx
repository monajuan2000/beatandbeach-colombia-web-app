import type { QuotePdfContent } from '../../utils/downloadQuotePdf'
import { ScheduledTourDateSelect } from '@/features/trip/components/ScheduledTourDateSelect/ScheduledTourDateSelect'
import { Chip } from '@/components/ui/Chip/Chip'
import { tripInterests } from '@/features/trip/data/interests'
import type { TripInterest } from '@/features/trip/types'
import { useTranslation } from '@/i18n/context/LanguageContext'

type ItineraryQuotePreviewProps = {
    quote: QuotePdfContent
    planLabel: string
    availableTourDates: string[]
    selectedTourDate: string
    onTourDateChange: (date: string) => void
    travelers: number
    interests: TripInterest[]
    onTravelersChange: (travelers: number) => void
    onInterestsChange: (interests: TripInterest[]) => void
}

export function ItineraryQuotePreview({
    quote,
    planLabel,
    availableTourDates,
    selectedTourDate,
    onTourDateChange,
    travelers,
    interests,
    onTravelersChange,
    onInterestsChange,
}: ItineraryQuotePreviewProps) {
    const { t } = useTranslation()
    const toggleInterest = (interest: TripInterest) => {
        onInterestsChange(
            interests.includes(interest)
                ? interests.filter((selectedInterest) => selectedInterest !== interest)
                : [...interests, interest],
        )
    }

    return (
        <div className="itinerary-quote-preview">
            <div className="itinerary-quote-summary">
                <span>{planLabel}</span>
                <strong>{quote.planName}</strong>
                <p>{quote.summary}</p>
                <dl className="itinerary-quote-trip-details">
                    <div><dt>{quote.labels.destination}</dt><dd>{quote.tripDetails.destination}</dd></div>
                    <div><dt>{quote.labels.departureDate}</dt><dd>{quote.tripDetails.departureDate}</dd></div>
                </dl>
            </div>

            <section className="itinerary-quote-section">
                <div className="itinerary-quote-section-heading">
                    <h4>{quote.labels.tripDetails}</h4>
                </div>
                <ScheduledTourDateSelect
                    label={quote.labels.availableTourDate}
                    dates={availableTourDates}
                    value={selectedTourDate}
                    onChange={onTourDateChange}
                />
                <label className="itinerary-quote-travelers">
                    <span>{t.trip.fields.travelers}</span>
                    <input
                        type="number"
                        required
                        min={1}
                        max={20}
                        step={1}
                        value={travelers}
                        onChange={(event) => onTravelersChange(Number(event.target.value))}
                    />
                </label>
                <fieldset className="itinerary-quote-interests">
                    <legend>{t.trip.fields.interests}</legend>
                    <div className="chip-group">
                        {tripInterests.map((interest) => (
                            <Chip
                                key={interest}
                                isActive={interests.includes(interest)}
                                onClick={() => toggleInterest(interest)}
                            >
                                {t.trip.interests[interest]}
                            </Chip>
                        ))}
                    </div>
                </fieldset>
            </section>

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
                <div className="itinerary-quote-cost-headings" aria-hidden="true">
                    <span />
                    <span>{quote.labels.perPerson}</span>
                    <span>{quote.labels.groupAmount}</span>
                </div>
                <div className="itinerary-quote-cost-list">
                    {quote.costs.map((cost) => (
                        <div key={cost.label} className="itinerary-quote-cost-item">
                            <span>{cost.label}</span>
                            <div className="itinerary-quote-cost-values">
                                <strong>{cost.value}</strong>
                                <strong>{cost.groupValue}</strong>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="itinerary-quote-total-list">
                    <div className="itinerary-quote-total">
                        <span>{quote.labels.total}</span>
                        <strong>{quote.total}</strong>
                    </div>
                    <div className="itinerary-quote-total">
                        <span>{quote.labels.groupTotal(quote.tripDetails.travelers)}</span>
                        <strong>{quote.groupTotal}</strong>
                    </div>
                </div>
            </section>
        </div>
    )
}
