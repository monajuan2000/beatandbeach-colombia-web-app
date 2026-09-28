import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getEventById } from '@/features/events/data/events'
import { TripContext, type TripContextValue } from './TripContext'

const STORAGE_KEY = 'beatandbeach:saved-events'

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

export function TripProvider({ children }: { children: ReactNode }) {
    const [savedEventIds, setSavedEventIds] = useState<string[]>(readSavedEvents)
    const [isPlannerOpen, setIsPlannerOpen] = useState(false)
    const [plannerCityId, setPlannerCityId] = useState<string>()

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEventIds))
        } catch {
            // Storage can be unavailable (private mode, blocked site data); saving is best effort.
        }
    }, [savedEventIds])

    const toggleSavedEvent = useCallback((eventId: string) => {
        setSavedEventIds((current) =>
            current.includes(eventId) ? current.filter((id) => id !== eventId) : [...current, eventId],
        )
    }, [])

    const openPlanner = useCallback((cityId?: string) => {
        setPlannerCityId(cityId)
        setIsPlannerOpen(true)
    }, [])

    const closePlanner = useCallback(() => setIsPlannerOpen(false), [])

    const value = useMemo<TripContextValue>(
        () => ({
            savedEventIds,
            isEventSaved: (eventId) => savedEventIds.includes(eventId),
            toggleSavedEvent,
            isPlannerOpen,
            plannerCityId,
            openPlanner,
            closePlanner,
        }),
        [savedEventIds, toggleSavedEvent, isPlannerOpen, plannerCityId, openPlanner, closePlanner],
    )

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
