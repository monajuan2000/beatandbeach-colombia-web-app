import type { FormEvent } from 'react'
import { Chip } from '@/components/ui/Chip/Chip'
import { CityStatusNotice } from '@/features/cities/components/CityStatusNotice/CityStatusNotice'
import { citiesByRollout, getCityById } from '@/features/cities/data/cities'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { tripInterests } from '../../data/interests'
import type { TripPlannerFormValues, TripInterest } from '../../types'
import { formatTourOptionDate } from '../../utils/tripDates'

type TripPlannerRequestFormProps = {
    values: TripPlannerFormValues
    isTourSelected: boolean
    availableTourDates: string[]
    minimumDate: string
    onChange: (changes: Partial<TripPlannerFormValues>) => void
    onSubmit: () => void
}

export function TripPlannerRequestForm({
    values,
    isTourSelected,
    availableTourDates,
    minimumDate,
    onChange,
    onSubmit,
}: TripPlannerRequestFormProps) {
    const { t, locale } = useTranslation()
    const copy = t.trip
    const selectedCity = getCityById(values.cityId)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
    }

    const toggleInterest = (interest: TripInterest) => {
        const interests = values.interests.includes(interest)
            ? values.interests.filter((item) => item !== interest)
            : [...values.interests, interest]
        onChange({ interests })
    }

    const handleArrivalDateChange = (arrivalDate: string) => {
        const departureDate = values.departureDate
        const updates: Partial<TripPlannerFormValues> = { arrivalDate }

        if (departureDate && departureDate < arrivalDate) updates.departureDate = ''
        onChange(updates)
    }

    const handleScheduledTourDateChange = (arrivalDate: string) => {
        const departureDate = values.departureDate
        const wasSameDay = departureDate === values.arrivalDate
        onChange({
            arrivalDate,
            ...(wasSameDay || departureDate < arrivalDate ? { departureDate: arrivalDate } : {}),
        })
    }

    return (
        <form className="planner-form" onSubmit={handleSubmit}>
            <label className="form-field">
                <span>{copy.fields.destination}</span>
                <select
                    value={values.cityId}
                    onChange={(event) => onChange({ cityId: event.target.value })}
                    disabled={isTourSelected}
                >
                    {citiesByRollout.map((city) => (
                        <option key={city.id} value={city.id}>
                            {t.cities.status.withStatus(city.name, t.cities.status.labels[city.status])}
                        </option>
                    ))}
                </select>
            </label>

            <label className="form-field">
                <span>{isTourSelected ? copy.fields.availableTourDate : copy.fields.arrivalDate}</span>
                {isTourSelected ? (
                    <select
                        required
                        value={values.arrivalDate}
                        onChange={(event) => handleScheduledTourDateChange(event.target.value)}
                    >
                        {availableTourDates.map((date) => (
                            <option key={date} value={date}>
                                {formatTourOptionDate(date, locale)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="date"
                        required
                        min={minimumDate}
                        value={values.arrivalDate}
                        onChange={(event) => handleArrivalDateChange(event.target.value)}
                    />
                )}
            </label>

            <label className="form-field">
                <span>{copy.fields.departureDate}</span>
                <input
                    type="date"
                    required
                    min={values.arrivalDate || minimumDate}
                    value={values.departureDate}
                    onChange={(event) => onChange({ departureDate: event.target.value })}
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
                    value={values.travelers}
                    onChange={(event) => onChange({ travelers: Number(event.target.value) })}
                />
            </label>

            <fieldset className="form-field form-field-full">
                <legend>{copy.fields.interests}</legend>
                <div className="chip-group">
                    {tripInterests.map((interest) => (
                        <Chip
                            key={interest}
                            isActive={values.interests.includes(interest)}
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
                    value={values.name}
                    onChange={(event) => onChange({ name: event.target.value })}
                />
            </label>

            <label className="form-field">
                <span>{copy.fields.email}</span>
                <input
                    type="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => onChange({ email: event.target.value })}
                />
            </label>

            <div className="form-field-full planner-submit">
                <button type="submit" className="primary-button">
                    {copy.submit}
                </button>
            </div>
        </form>
    )
}
