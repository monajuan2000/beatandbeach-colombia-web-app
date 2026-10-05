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

export type TripPlannerTourOption = {
    id: string
    title: string
    code: string
}

type TripPlannerSavedItemsProps = {
    events: TripPlannerSavedEvent[]
    selectedTour?: TripPlannerSavedTour
    availableTours: TripPlannerTourOption[]
    selectedPlanId?: string
    isTourSelectionLocked: boolean
    onBrowseEvents: () => void
    onSelectTour: (planId: string) => void
    onRemoveTour: () => void
    onRemoveEvent: (eventId: string) => void
}

export function TripPlannerSavedItems({
    events,
    selectedTour,
    availableTours,
    selectedPlanId,
    isTourSelectionLocked,
    onBrowseEvents,
    onSelectTour,
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

            {!isTourSelectionLocked && availableTours.length > 0 ? (
                <label className="planner-tour-select">
                    <span>{copy.chooseTour}</span>
                    <select
                        value={selectedPlanId ?? ''}
                        onChange={(event) => {
                            if (event.target.value) onSelectTour(event.target.value)
                        }}
                    >
                        <option value="" disabled>{copy.selectTour}</option>
                        {availableTours.map((tour) => (
                            <option key={tour.id} value={tour.id}>
                                {tour.title} · {tour.code}
                            </option>
                        ))}
                    </select>
                </label>
            ) : null}

            {savedItemCount > 0 ? (
                <ul className="planner-saved-list">
                    {selectedTour ? (
                        <li key={selectedTour.planId} className="planner-saved-tour">
                            <div>
                                <strong>{selectedTour.title}</strong>
                                <small>{selectedTour.cityName} · {copy.selectedTour}</small>
                                <span className="planner-saved-tour-code">
                                    {copy.tourCode}: {selectedTour.code}
                                </span>
                            </div>
                            {!isTourSelectionLocked ? (
                                <button type="button" className="text-button" onClick={onRemoveTour}>
                                    {copy.remove}
                                </button>
                            ) : null}
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
