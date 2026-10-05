import { CITY_IDS } from '@/features/cities/config'

export const TRIP_PLANNER_CONFIG = {
    defaultCityId: CITY_IDS.guatape,
    scheduledTour: {
        monthsAhead: 6,
        // Date#getDay indexes Sunday as 0, Wednesday as 3, and Saturday as 6.
        weekdays: [3, 6],
    },
} as const

/** Trip planning is currently configured only for Guatapé. */
export function isTripPlannerAvailable(cityId?: string): cityId is typeof CITY_IDS.guatape {
    return cityId === CITY_IDS.guatape
}
