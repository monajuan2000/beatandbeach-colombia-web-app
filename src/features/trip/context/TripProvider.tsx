import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getEventById } from '@/features/events/data/events'
import { isQuoteablePlan } from '@/features/itineraries/config'
import { isTripPlannerAvailable } from '../config'
import type { SavedTour, TripQuoteDetails } from '../types'
import { TripContext, type TripContextValue } from './TripContext'

const STORAGE_KEY = 'beatandbeach:saved-events'
const SAVED_TOUR_STORAGE_KEY = 'beatandbeach:saved-tour'

function readSavedEvents(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed: unknown = raw ? JSON.parse(raw) : []
        // Drop ids of events that no longer exist so the saved count stays accurate.
        return Array.isArray(parsed)
            ? parsed.filter((id): id is string => typeof id === 'string' && Boolean(getEventById(id)))
            : []
    } catch {
        return []
    }
}

function readSavedTour(): SavedTour | undefined {
    try {
        const raw = localStorage.getItem(SAVED_TOUR_STORAGE_KEY)
        const parsed: unknown = raw ? JSON.parse(raw) : null
        if (
            typeof parsed === 'object' && parsed !== null &&
            'cityId' in parsed && typeof parsed.cityId === 'string' &&
            'planId' in parsed && typeof parsed.planId === 'string' &&
            isTripPlannerAvailable(parsed.cityId) &&
            isQuoteablePlan(parsed.cityId, parsed.planId)
        ) {
            return { cityId: parsed.cityId, planId: parsed.planId }
        }
    } catch {
        // Ignore malformed or unavailable storage.
    }
    return undefined
}

export function TripProvider({ children }: { children: ReactNode }) {
    const [savedEventIds, setSavedEventIds] = useState<string[]>(readSavedEvents)
    const [isPlannerOpen, setIsPlannerOpen] = useState(false)
    const [plannerCityId, setPlannerCityId] = useState<string>()
    const [plannerPlanId, setPlannerPlanId] = useState<string>()
    const [savedTour, setSavedTour] = useState<SavedTour | undefined>(readSavedTour)
    const [quoteDetails, setQuoteDetails] = useState<TripQuoteDetails>()

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEventIds))
        } catch {
            // Storage can be unavailable (private mode, blocked site data); saving is best effort.
        }
    }, [savedEventIds])

    useEffect(() => {
        try {
            if (savedTour) localStorage.setItem(SAVED_TOUR_STORAGE_KEY, JSON.stringify(savedTour))
            else localStorage.removeItem(SAVED_TOUR_STORAGE_KEY)
        } catch {
            // Storage can be unavailable; keep the saved tour in memory for this session.
        }
    }, [savedTour])

    const toggleSavedEvent = useCallback((eventId: string) => {
        setSavedEventIds((current) =>
            current.includes(eventId) ? current.filter((id) => id !== eventId) : [...current, eventId],
        )
    }, [])

    const openPlanner = useCallback((cityId: string, planId?: string) => {
        if (!isTripPlannerAvailable(cityId)) return
        if (planId && !isQuoteablePlan(cityId, planId)) return
        setPlannerCityId(cityId)
        setPlannerPlanId(planId)
        if (planId) setSavedTour({ cityId, planId })
        setIsPlannerOpen(true)
    }, [])

    const clearSavedTour = useCallback(() => setSavedTour(undefined), [])
    const clearSavedTrip = useCallback(() => {
        setSavedEventIds([])
        setSavedTour(undefined)
        setQuoteDetails(undefined)
        setPlannerCityId(undefined)
        setPlannerPlanId(undefined)
    }, [])
    const updateQuoteDetails = useCallback((details: TripQuoteDetails) => setQuoteDetails(details), [])
    const closePlanner = useCallback(() => setIsPlannerOpen(false), [])

    const value = useMemo<TripContextValue>(
        () => ({
            savedEventIds,
            savedItemCount: savedEventIds.length + Number(Boolean(savedTour)),
            isEventSaved: (eventId) => savedEventIds.includes(eventId),
            toggleSavedEvent,
            isPlannerOpen,
            plannerCityId,
            plannerPlanId,
            savedTour,
            quoteDetails,
            updateQuoteDetails,
            clearSavedTour,
            clearSavedTrip,
            openPlanner,
            closePlanner,
        }),
        [
            savedEventIds,
            toggleSavedEvent,
            isPlannerOpen,
            plannerCityId,
            plannerPlanId,
            savedTour,
            quoteDetails,
            updateQuoteDetails,
            clearSavedTour,
            clearSavedTrip,
            openPlanner,
            closePlanner,
        ],
    )

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
