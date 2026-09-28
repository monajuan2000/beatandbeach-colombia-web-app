import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@/components/ui/Chip/Chip'
import { Modal } from '@/components/ui/Modal/Modal'
import { cities, getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import { useTrip } from '../../context/TripContext'
import type { EventItem } from '@/features/events/types'
import './TripPlannerModal.css'

const INTERESTS = ['Music', 'Culture', 'Nightlife', 'Adventure', 'Food', 'Beach']

function todayIso() {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

export function TripPlannerModal() {
    const { isPlannerOpen, closePlanner } = useTrip()

    return (
        <Modal isOpen={isPlannerOpen} onClose={closePlanner} labelledBy="trip-planner-title" wide>
            <TripPlannerContent />
        </Modal>
    )
}

// Lives inside the Modal so its form state resets every time the planner is reopened.
function TripPlannerContent() {
    const navigate = useNavigate()
    const { savedEventIds, toggleSavedEvent, plannerCityId, closePlanner } = useTrip()

    const savedEvents = savedEventIds
        .map((id) => getEventById(id))
        .filter((event): event is EventItem => Boolean(event))

    const [cityId, setCityId] = useState(plannerCityId ?? savedEvents[0]?.cityId ?? cities[0].id)
    const [arrivalDate, setArrivalDate] = useState('')
    const [travelers, setTravelers] = useState(2)
    const [interests, setInterests] = useState<string[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const toggleInterest = (interest: string) => {
        setInterests((current) =>
            current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
        )
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitted(true)
    }

    const browseEvents = () => {
        closePlanner()
        navigate('/', { state: { scrollTo: 'events' } })
    }

    if (submitted) {
        const city = getCityById(cityId)
        const formattedDate = new Date(`${arrivalDate}T00:00:00`).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

        return (
            <div className="modal-body planner-success">
                <span className="card-tag">Request received</span>
                <h3 id="trip-planner-title">Thanks, {name.split(' ')[0]}! Your trip is taking shape.</h3>
                <p>
                    We’ll put together a {city?.name} itinerary for {travelers}{' '}
                    {travelers === 1 ? 'traveler' : 'travelers'} arriving on {formattedDate}
                    {savedEvents.length > 0
                        ? `, including ${savedEvents.length} saved ${savedEvents.length === 1 ? 'event' : 'events'}`
                        : ''}
                    . Our team will reach out at <strong>{email}</strong>.
                </p>
                <div className="action-row modal-actions">
                    <button type="button" className="primary-button" onClick={closePlanner}>
                        Done
                    </button>
                    <button type="button" className="secondary-button" onClick={() => setSubmitted(false)}>
                        Edit request
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-body">
            <span className="eyebrow">Plan my trip</span>
            <h3 id="trip-planner-title">Design your Colombia experience.</h3>
            <p className="planner-intro">
                Tell us where and when, and we’ll build an itinerary around the events you love.
            </p>

            <div className="planner-saved">
                <div className="planner-saved-header">
                    <strong>Saved events</strong>
                    <span>{savedEvents.length}</span>
                </div>

                {savedEvents.length === 0 ? (
                    <p className="planner-empty">
                        No events saved yet.{' '}
                        <button type="button" className="text-button" onClick={browseEvents}>
                            Browse events
                        </button>
                    </p>
                ) : (
                    <ul className="planner-saved-list">
                        {savedEvents.map((event) => (
                            <li key={event.id}>
                                <div>
                                    <strong>{event.title}</strong>
                                    <small>
                                        {getCityById(event.cityId)?.name} · {event.date}
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => toggleSavedEvent(event.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form className="planner-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>Destination</span>
                    <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form-field">
                    <span>Arrival date</span>
                    <input
                        type="date"
                        required
                        min={todayIso()}
                        value={arrivalDate}
                        onChange={(event) => setArrivalDate(event.target.value)}
                    />
                </label>

                <label className="form-field">
                    <span>Travelers</span>
                    <input
                        type="number"
                        required
                        min={1}
                        max={20}
                        value={travelers}
                        onChange={(event) => setTravelers(Number(event.target.value))}
                    />
                </label>

                <fieldset className="form-field form-field-full">
                    <legend>Interests</legend>
                    <div className="chip-group">
                        {INTERESTS.map((interest) => (
                            <Chip
                                key={interest}
                                isActive={interests.includes(interest)}
                                onClick={() => toggleInterest(interest)}
                            >
                                {interest}
                            </Chip>
                        ))}
                    </div>
                </fieldset>

                <label className="form-field">
                    <span>Full name</span>
                    <input
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>

                <label className="form-field">
                    <span>Email</span>
                    <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <div className="form-field-full planner-submit">
                    <button type="submit" className="primary-button">
                        Send my trip request
                    </button>
                </div>
            </form>
        </div>
    )
}
