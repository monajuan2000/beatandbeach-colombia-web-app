import { useTranslation } from '@/i18n/context/LanguageContext'

export type TripPlannerSavedEvent = {
    id: string
    title: string
    cityName: string
    date: string
}

export type TripPlannerSavedTour = {
    planId: string
    title: string
    cityName: string
    code: string
}

export type TripPlannerQuoteSummary = {
    destination: string
    availableTourDate: string
    arrivalDate: string
    departureDate: string
    travelers: number
    interests: string[]
    representativeName: string
    documentType: string
    documentNumber: string
    email: string
    phone: string
    costs: { label: string; perPerson: string; group: string }[]
    totalPerPerson: string
    total: string
}

type TripPlannerSavedItemsProps = {
    events: TripPlannerSavedEvent[]
    selectedTour?: TripPlannerSavedTour
    quoteSummary?: TripPlannerQuoteSummary
    isTourSelectionLocked: boolean
    onBrowseEvents: () => void
    onContinueQuote: () => void
    onRemoveTour: () => void
    onRemoveEvent: (eventId: string) => void
}

export function TripPlannerSavedItems({
    events,
    selectedTour,
    quoteSummary,
    isTourSelectionLocked,
    onBrowseEvents,
    onContinueQuote,
    onRemoveTour,
    onRemoveEvent,
}: TripPlannerSavedItemsProps) {
    const { t } = useTranslation()
    const copy = t.trip
    const savedItemCount = events.length + Number(Boolean(selectedTour))

    return (
        <section className="planner-saved" aria-label={copy.savedItems}>
            <div className="planner-saved-header">
                <strong>{copy.savedItems}</strong>
                <span>{savedItemCount}</span>
            </div>

            {savedItemCount === 0 ? (
                <p className="planner-empty">
                    {copy.noSavedEvents}{' '}
                    <button type="button" className="text-button" onClick={onBrowseEvents}>
                        {copy.browseEvents}
                    </button>
                </p>
            ) : null}

            {savedItemCount > 0 ? (
                <ul className="planner-saved-list">
                    {selectedTour ? (
                        <li key={selectedTour.planId} className="planner-saved-tour">
                            <div>
                                <header className="planner-saved-tour-heading">
                                    <strong>{selectedTour.title}</strong>
                                    <div className="planner-saved-tour-meta">
                                        <small>{selectedTour.cityName} · {copy.selectedTour}</small>
                                        <span className="planner-saved-tour-code">
                                            {copy.tourCode}: {selectedTour.code}
                                        </span>
                                    </div>
                                </header>
                                {quoteSummary ? (
                                    <div className="planner-quote-summary">
                                        <strong>{copy.quoteSummary}</strong>
                                        <dl>
                                            <div>
                                                <dt>{copy.fields.destination}</dt>
                                                <dd>{quoteSummary.destination}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.availableTourDate}</dt>
                                                <dd>{quoteSummary.availableTourDate}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.arrivalDate}</dt>
                                                <dd>{quoteSummary.arrivalDate}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.departureDate}</dt>
                                                <dd>{quoteSummary.departureDate}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.travelers}</dt>
                                                <dd>{quoteSummary.travelers}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.interests}</dt>
                                                <dd>{quoteSummary.interests.join(', ') || '—'}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.fullName}</dt>
                                                <dd>{quoteSummary.representativeName}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.documentType}</dt>
                                                <dd>{quoteSummary.documentType}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.documentNumber}</dt>
                                                <dd>{quoteSummary.documentNumber}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.email}</dt>
                                                <dd>{quoteSummary.email}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.fields.phone}</dt>
                                                <dd>{quoteSummary.phone}</dd>
                                            </div>
                                        </dl>
                                        <strong className="planner-quote-costs-heading">{copy.monetarySummary}</strong>
                                        <dl className="planner-quote-costs">
                                            {quoteSummary.costs.map((cost) => (
                                                <div key={cost.label}>
                                                    <dt>{cost.label}</dt>
                                                    <dd>
                                                        <span>{copy.perPerson}: {cost.perPerson}</span>
                                                        <span>{copy.groupAmount}: {cost.group}</span>
                                                    </dd>
                                                </div>
                                            ))}
                                            <div className="planner-quote-total">
                                                <dt>{copy.estimatedTotal}</dt>
                                                <dd>
                                                    <span>{copy.perPerson}: {quoteSummary.totalPerPerson}</span>
                                                    <span>{copy.groupAmount}: {quoteSummary.total}</span>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                ) : null}
                            </div>
                            <div className="planner-saved-tour-actions">
                                <button
                                    type="button"
                                    className="secondary-button planner-continue-quote"
                                    onClick={onContinueQuote}
                                >
                                    {copy.continueQuote}
                                </button>
                                {!isTourSelectionLocked ? (
                                    <button type="button" className="text-button" onClick={onRemoveTour}>
                                        {copy.remove}
                                    </button>
                                ) : null}
                            </div>
                        </li>
                    ) : null}

                    {events.map((event) => (
                        <li key={event.id}>
                            <div>
                                <strong>{event.title}</strong>
                                <small>{event.cityName} · {event.date}</small>
                            </div>
                            <button
                                type="button"
                                className="text-button"
                                onClick={() => onRemoveEvent(event.id)}
                            >
                                {copy.remove}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </section>
    )
}
