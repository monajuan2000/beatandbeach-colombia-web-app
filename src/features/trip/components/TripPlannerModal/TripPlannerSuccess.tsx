import { useTranslation } from '@/i18n/context/LanguageContext'

type TripPlannerSuccessProps = {
    requestReference: string
    onDone: () => void
}

export function TripPlannerSuccess({
    requestReference,
    onDone,
}: TripPlannerSuccessProps) {
    const { t } = useTranslation()
    const copy = t.trip.success

    return (
        <div className="modal-body planner-success" aria-live="polite">
            <span className="card-tag">{copy.tag}</span>
            <h3 id="trip-planner-title">{copy.title}</h3>
            <p><strong>{copy.reference}:</strong> {requestReference}</p>
            <p>{copy.pendingReservation}</p>
            <div className="action-row modal-actions">
                <button type="button" className="primary-button" onClick={onDone}>
                    {copy.done}
                </button>
            </div>
        </div>
    )
}
