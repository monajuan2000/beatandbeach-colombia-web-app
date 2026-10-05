import { createContext, useContext } from 'react'
import type { SavedTour } from '../types'

export type TripContextValue = {
    savedEventIds: string[]
    isEventSaved: (eventId: string) => boolean
    toggleSavedEvent: (eventId: string) => void
    isPlannerOpen: boolean
    plannerCityId: string | undefined
    plannerPlanId: string | undefined
    savedTour: SavedTour | undefined
    clearSavedTour: () => void
    selectSavedTour: (cityId: string, planId: string) => void
    openPlanner: (cityId: string, planId?: string) => void
    closePlanner: () => void
}

export const TripContext = createContext<TripContextValue | null>(null)

export function useTrip() {
    const context = useContext(TripContext)

    if (!context) {
        throw new Error('useTrip must be used inside <TripProvider>')
    }

    return context
}
