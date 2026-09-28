import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@/components/ui/Chip/Chip'
import { Modal } from '@/components/ui/Modal/Modal'
import { CityStatusNotice } from '@/features/cities/components/CityStatusNotice/CityStatusNotice'
import { citiesByRollout, getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { useTrip } from '../../context/TripContext'
import { tripInterests } from '../../data/interests'
import type { TripInterest } from '../../types'
import './TripPlannerModal.css'

function todayIso() {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

export function TripPlannerModal() {
    const { isPlannerOpen, closePlanner } = useTrip()
    const { t } = useTranslation()

    return (
        <Modal
            isOpen={isPlannerOpen}
            onClose={closePlanner}
            labelledBy="trip-planner-title"
            closeLabel={t.common.close}
            wide
        >
            <TripPlannerContent />
        </Modal>
    )
}

// Lives inside the Modal so its form state resets every time the planner is reopened.
function TripPlannerContent() {
    const navigate = useNavigate()
    const { savedEventIds, toggleSavedEvent, plannerCityId, closePlanner } = useTrip()
    const { t, localize, locale } = useTranslation()
    const copy = t.trip

    const savedEvents = savedEventIds
        .map((id) => getEventById(id))
        .filter((event): event is EventItem => Boolean(event))

    const [cityId, setCityId] = useState(plannerCityId ?? savedEvents[0]?.cityId ?? citiesByRollout[0].id)
    const [arrivalDate, setArrivalDate] = useState('')
    const [travelers, setTravelers] = useState(2)
    const [interests, setInterests] = useState<TripInterest[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const selectedCity = getCityById(cityId)

    const toggleInterest = (interest: TripInterest) => {
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
        const formattedDate = new Date(`${arrivalDate}T00:00:00`).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

        return (
            <div className="modal-body planner-success">
                <span className="card-tag">{copy.success.tag}</span>
                <h3 id="trip-planner-title">{copy.success.title(name.split(' ')[0])}</h3>
                <p>
                    {copy.success.summary({
                        city: selectedCity?.name ?? '',
                        travelers,
                        date: formattedDate,
                        savedCount: savedEvents.length,
                    })}{' '}
                    {copy.success.contact} <strong>{email}</strong>.
                </p>
                <div className="action-row modal-actions">
                    <button type="button" className="primary-button" onClick={closePlanner}>
                        {copy.success.done}
                    </button>
                    <button type="button" className="secondary-button" onClick={() => setSubmitted(false)}>
                        {copy.success.edit}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-body">
            <span className="eyebrow">{copy.eyebrow}</span>
            <h3 id="trip-planner-title">{copy.title}</h3>
            <p className="planner-intro">{copy.intro}</p>

            <div className="planner-saved">
                <div className="planner-saved-header">
                    <strong>{copy.savedEvents}</strong>
                    <span>{savedEvents.length}</span>
                </div>

                {savedEvents.length === 0 ? (
                    <p className="planner-empty">
                        {copy.noSavedEvents}{' '}
                        <button type="button" className="text-button" onClick={browseEvents}>
                            {copy.browseEvents}
                        </button>
                    </p>
                ) : (
                    <ul className="planner-saved-list">
                        {savedEvents.map((event) => (
                            <li key={event.id}>
                                <div>
                                    <strong>{localize(event.title)}</strong>
                                    <small>
                                        {getCityById(event.cityId)?.name} · {localize(event.date)}
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => toggleSavedEvent(event.id)}
                                >
                                    {copy.remove}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form className="planner-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>{copy.fields.destination}</span>
                    <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
                        {citiesByRollout.map((city) => (
                            <option key={city.id} value={city.id}>
                                {t.cities.status.withStatus(city.name, t.cities.status.labels[city.status])}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form-field">
                    <span>{copy.fields.arrivalDate}</span>
                    <input
                        type="date"
                        required
                        min={todayIso()}
                        value={arrivalDate}
                        onChange={(event) => setArrivalDate(event.target.value)}
                    />
                </label>

                {selectedCity ? <CityStatusNotice city={selectedCity} className="form-field-full" /> : null}

                <label className="form-field">
                    <span>{copy.fields.travelers}</span>
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
                    <legend>{copy.fields.interests}</legend>
                    <div className="chip-group">
                        {tripInterests.map((interest) => (
                            <Chip
                                key={interest}
                                isActive={interests.includes(interest)}
                                onClick={() => toggleInterest(interest)}
                            >
                                {copy.interests[interest]}
                            </Chip>
                        ))}
                    </div>
                </fieldset>

                <label className="form-field">
                    <span>{copy.fields.fullName}</span>
                    <input
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>

                <label className="form-field">
                    <span>{copy.fields.email}</span>
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
                        {copy.submit}
                    </button>
                </div>
            </form>
        </div>
    )
}
