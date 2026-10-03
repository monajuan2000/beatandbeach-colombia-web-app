import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge/Badge'
import { Modal } from '@/components/ui/Modal/Modal'
import { CityStatusNotice } from '@/features/cities/components/CityStatusNotice/CityStatusNotice'
import { getCityById } from '@/features/cities/data/cities'
import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { isEventBookable } from '../../data/events'
import type { EventItem } from '../../types'
import { SaveEventButton } from '../SaveEventButton/SaveEventButton'
import './EventDetailsModal.css'

type EventDetailsModalProps = {
    event: EventItem | null
    onClose: () => void
    showCityLink?: boolean
}

export function EventDetailsModal({ event, onClose, showCityLink = true }: EventDetailsModalProps) {
    const { isEventSaved, openPlanner } = useTrip()
    const { t, localize } = useTranslation()
    const copy = t.events.details

    if (!event) return null

    const city = getCityById(event.cityId)
    const saved = isEventSaved(event.id)
    const bookingOpen = isEventBookable(event)
    const hasPrice = Boolean(event.price && (event.price.en || event.price.es))

    return (
        <Modal isOpen onClose={onClose} labelledBy="event-details-title" closeLabel={t.common.close}>
            {event.image ? (
                <div className="modal-visual" style={{ backgroundImage: `url("${event.image}")` }} />
            ) : null}

            <div className="modal-body event-details">
                <div className="event-details-top">
                    <Badge tone="blue">{t.events.categories[event.category]}</Badge>
                    {event.featured ? <Badge tone="green">{t.common.featured}</Badge> : null}
                </div>

                <h3 id="event-details-title">{localize(event.title)}</h3>
                <p className="event-details-location">
                    {city?.name} · {localize(event.location)}
                </p>
                <p className="event-details-summary">{localize(event.summary)}</p>

                {city ? <CityStatusNotice city={city} /> : null}

                <div className="meta-pill-row">
                    <span>{localize(event.date)}</span>
                    {hasPrice ? <span>{localize(event.price!)}</span> : null}
                </div>

                <p className="event-details-audience">
                    <strong>{copy.bestFor}</strong> {localize(event.audience)}
                </p>

                <div className="action-row modal-actions">
                    <SaveEventButton event={event} describedBy="event-details-soon-hint" />

                    {saved ? (
                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => {
                                onClose()
                                openPlanner(event.cityId)
                            }}
                        >
                            {copy.planTrip}
                        </button>
                    ) : null}

                    {showCityLink && city ? (
                        <Link to={`/cities/${city.id}`} className="secondary-button" onClick={onClose}>
                            {copy.explore(city.name)}
                        </Link>
                    ) : null}
                </div>

                {!bookingOpen && !saved && city ? (
                    <p id="event-details-soon-hint" className="event-details-soon-hint">
                        {copy.bookingSoonHint(city.name)}
                    </p>
                ) : null}
            </div>
        </Modal>
    )
}
