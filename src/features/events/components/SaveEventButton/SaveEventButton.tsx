import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { isEventBookable } from '../../data/events'
import type { EventItem } from '../../types'
import './SaveEventButton.css'

type SaveEventButtonProps = {
    event: EventItem
    /** Button style while the event is not saved yet. */
    variant?: 'primary' | 'secondary'
    /** id of the element explaining why booking is unavailable, if any. */
    describedBy?: string
}

/**
 * "Add to my trip" toggle. Events in destinations under review show a disabled
 * "Available very soon" button instead, unless they were saved before.
 */
export function SaveEventButton({ event, variant = 'primary', describedBy }: SaveEventButtonProps) {
    const { isEventSaved, toggleSavedEvent } = useTrip()
    const { t } = useTranslation()
    const copy = t.events.details
    const saved = isEventSaved(event.id)

    if (!saved && !isEventBookable(event)) {
        return (
            <button type="button" className="primary-button save-event-soon" disabled aria-describedby={describedBy}>
                {copy.bookingSoon}
            </button>
        )
    }

    return (
        <button
            type="button"
            className={saved ? 'secondary-button is-saved' : `${variant}-button`}
            onClick={() => toggleSavedEvent(event.id)}
            aria-pressed={saved}
        >
            {saved ? copy.savedToTrip : copy.addToTrip}
        </button>
    )
}
