import { createContext, useContext } from 'react'

export type TripContextValue = {
    savedEventIds: string[]
    isEventSaved: (eventId: string) => boolean
    toggleSavedEvent: (eventId: string) => void
    isPlannerOpen: boolean
    plannerCityId: string | undefined
    openPlanner: (cityId?: string) => void
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
