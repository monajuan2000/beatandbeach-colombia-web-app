import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal/Modal'
import { getCityById } from '@/features/cities/data/cities'
import { getEventById } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { isQuoteablePlan } from '@/features/itineraries/config'
import { getItinerariesForCity } from '@/features/itineraries/data/itineraries'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { useTrip } from '../../context/TripContext'
import { TRIP_PLANNER_CONFIG } from '../../config'
import type { TripPlannerFormValues } from '../../types'
import { getAvailableTourDates, getTodayDateInputValue } from '../../utils/tripDates'
import { TripPlannerRequestForm } from './TripPlannerRequestForm'
import {
    TripPlannerSavedItems,
    type TripPlannerSavedEvent,
    type TripPlannerSavedTour,
    type TripPlannerTourOption,
} from './TripPlannerSavedItems'
import { TripPlannerSuccess } from './TripPlannerSuccess'
import './TripPlannerModal.css'

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
    const {
        savedEventIds,
        toggleSavedEvent,
        plannerCityId,
        plannerPlanId,
        savedTour,
        clearSavedTour,
        selectSavedTour,
        closePlanner,
    } = useTrip()
    const { t, localize } = useTranslation()
    const copy = t.trip
    const selectableTourCityId = plannerCityId ?? TRIP_PLANNER_CONFIG.defaultCityId

    const savedEvents = useMemo(
        () => savedEventIds
            .map((id) => getEventById(id))
            .filter((event): event is EventItem => Boolean(event)),
        [savedEventIds],
    )
    const selectedTour = useMemo(() => {
        if (!savedTour || !isQuoteablePlan(savedTour.cityId, savedTour.planId)) return undefined
        return getItinerariesForCity(savedTour.cityId)?.plans.find((plan) => plan.id === savedTour.planId)
    }, [savedTour])
    const availableTourDates = useMemo(() => getAvailableTourDates(), [])
    const selectableTours = useMemo(
        () => (getItinerariesForCity(selectableTourCityId)?.plans ?? [])
            .filter((plan) => isQuoteablePlan(selectableTourCityId, plan.id)),
        [selectableTourCityId],
    )
    const savedEventItems = useMemo<TripPlannerSavedEvent[]>(() => savedEvents.map((event) => ({
        id: event.id,
        title: localize(event.title),
        cityName: getCityById(event.cityId)?.name ?? '',
        date: localize(event.date),
    })), [localize, savedEvents])
    const selectedTourItem = useMemo<TripPlannerSavedTour | undefined>(() => {
        if (!selectedTour || !savedTour) return undefined
        return {
            planId: selectedTour.id,
            title: localize(selectedTour.name),
            cityName: getCityById(savedTour.cityId)?.name ?? '',
            code: selectedTour.code,
        }
    }, [localize, savedTour, selectedTour])
    const availableTourOptions = useMemo<TripPlannerTourOption[]>(() => selectableTours.map((tour) => ({
        id: tour.id,
        title: localize(tour.name),
        code: tour.code,
    })), [localize, selectableTours])

    const [formValues, setFormValues] = useState<TripPlannerFormValues>(() => ({
        cityId: plannerCityId ?? TRIP_PLANNER_CONFIG.defaultCityId,
        arrivalDate: selectedTour ? availableTourDates[0] ?? '' : '',
        departureDate: selectedTour ? availableTourDates[0] ?? '' : '',
        travelers: 2,
        interests: [],
        name: '',
        email: '',
    }))
    const [submitted, setSubmitted] = useState(false)

    const selectedCity = getCityById(formValues.cityId)
    const savedItemCount = savedEvents.length + Number(Boolean(selectedTour))
    const todayDate = getTodayDateInputValue()

    const updateFormValues = (changes: Partial<TripPlannerFormValues>) => {
        setFormValues((current) => ({ ...current, ...changes }))
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    const browseEvents = () => {
        closePlanner()
        navigate('/', { state: { scrollTo: 'events' } })
    }

    const handleSelectTour = (planId: string) => {
        selectSavedTour(selectableTourCityId, planId)
        const firstAvailableDate = availableTourDates[0] ?? ''
        updateFormValues({ arrivalDate: firstAvailableDate, departureDate: firstAvailableDate })
    }

    if (submitted) {
        return (
            <TripPlannerSuccess
                firstName={formValues.name.trim().split(/\s+/)[0] ?? ''}
                email={formValues.email}
                summary={{
                    city: selectedCity?.name ?? '',
                    travelers: formValues.travelers,
                    arrivalDate: formValues.arrivalDate,
                    departureDate: formValues.departureDate,
                    savedCount: savedItemCount,
                }}
                onDone={closePlanner}
                onEdit={() => setSubmitted(false)}
            />
        )
    }

    return (
        <div className="modal-body">
            <span className="eyebrow">{copy.eyebrow}</span>
            <h3 id="trip-planner-title">{copy.title}</h3>
            <p className="planner-intro">{copy.intro}</p>

            <TripPlannerSavedItems
                events={savedEventItems}
                selectedTour={selectedTourItem}
                availableTours={availableTourOptions}
                selectedPlanId={savedTour?.planId}
                isTourSelectionLocked={Boolean(plannerPlanId)}
                onBrowseEvents={browseEvents}
                onSelectTour={handleSelectTour}
                onRemoveTour={clearSavedTour}
                onRemoveEvent={toggleSavedEvent}
            />

            <TripPlannerRequestForm
                values={formValues}
                isTourSelected={Boolean(selectedTour)}
                availableTourDates={availableTourDates}
                minimumDate={todayDate}
                onChange={updateFormValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
