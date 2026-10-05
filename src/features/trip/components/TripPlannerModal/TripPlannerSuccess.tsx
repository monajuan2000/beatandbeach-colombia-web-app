import { useTranslation } from '@/i18n/context/LanguageContext'
import type { TripSummary } from '../../types'
import { formatTripDate } from '../../utils/tripDates'

type TripPlannerSuccessProps = {
    firstName: string
    email: string
    summary: TripSummary
    onDone: () => void
    onEdit: () => void
}

export function TripPlannerSuccess({
    firstName,
    email,
    summary,
    onDone,
    onEdit,
}: TripPlannerSuccessProps) {
    const { t, locale } = useTranslation()
    const copy = t.trip.success

    return (
        <div className="modal-body planner-success" aria-live="polite">
            <span className="card-tag">{copy.tag}</span>
            <h3 id="trip-planner-title">{copy.title(firstName)}</h3>
            <p>
                {copy.summary({
                    ...summary,
                    arrivalDate: formatTripDate(summary.arrivalDate, locale),
                    departureDate: formatTripDate(summary.departureDate, locale),
                })}{' '}
                {copy.contact} <strong>{email}</strong>.
            </p>
            <div className="action-row modal-actions">
                <button type="button" className="primary-button" onClick={onDone}>
                    {copy.done}
                </button>
                <button type="button" className="secondary-button" onClick={onEdit}>
                    {copy.edit}
                </button>
            </div>
        </div>
    )
}
