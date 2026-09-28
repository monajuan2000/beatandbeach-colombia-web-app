import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge/Badge'
import { Modal } from '@/components/ui/Modal/Modal'
import { getCityById } from '@/features/cities/data/cities'
import { useTrip } from '@/features/trip/context/TripContext'
import type { EventItem } from '../../types'
import './EventDetailsModal.css'

type EventDetailsModalProps = {
    event: EventItem | null
    onClose: () => void
    showCityLink?: boolean
}

export function EventDetailsModal({ event, onClose, showCityLink = true }: EventDetailsModalProps) {
    const { isEventSaved, toggleSavedEvent, openPlanner } = useTrip()

    if (!event) return null

    const city = getCityById(event.cityId)
    const saved = isEventSaved(event.id)

    return (
        <Modal isOpen onClose={onClose} labelledBy="event-details-title">
            {event.image ? (
                <div className="modal-visual" style={{ backgroundImage: `url("${event.image}")` }} />
            ) : null}

            <div className="modal-body event-details">
                <div className="event-details-top">
                    <Badge tone="blue">{event.category}</Badge>
                    {event.featured ? <Badge tone="green">Featured</Badge> : null}
                </div>

                <h3 id="event-details-title">{event.title}</h3>
                <p className="event-details-location">
                    {city?.name} · {event.location}
                </p>
                <p className="event-details-summary">{event.summary}</p>

                <div className="meta-pill-row">
                    <span>{event.date}</span>
                    <span>{event.price}</span>
                </div>

                <p className="event-details-audience">
                    <strong>Best for:</strong> {event.audience}
                </p>

                <div className="action-row modal-actions">
                    <button
                        type="button"
                        className={saved ? 'secondary-button is-saved' : 'primary-button'}
                        onClick={() => toggleSavedEvent(event.id)}
                        aria-pressed={saved}
                    >
                        {saved ? '✓ Saved to my trip' : 'Add to my trip'}
                    </button>

                    {saved ? (
                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => {
                                onClose()
                                openPlanner(event.cityId)
                            }}
                        >
                            Plan my trip
                        </button>
                    ) : null}

                    {showCityLink && city ? (
                        <Link to={`/cities/${city.id}`} className="secondary-button" onClick={onClose}>
                            Explore {city.name}
                        </Link>
                    ) : null}
                </div>
            </div>
        </Modal>
    )
}
