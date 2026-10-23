import { CITY_IDS } from '@/features/cities/config'

export const TRIP_PLANNER_CONFIG = {
    defaultCityId: CITY_IDS.guatape,
    supportedCityIds: [CITY_IDS.guatape, CITY_IDS.medellin],
    scheduledTour: {
        monthsAhead: 6,
        // Date#getDay indexes Sunday as 0, Wednesday as 3, and Saturday as 6.
        weekdays: [3, 6],
    },
} as const

type SupportedCityId = (typeof TRIP_PLANNER_CONFIG.supportedCityIds)[number]

/** These destinations have itinerary catalogs available in the trip planner. */
export function isTripPlannerAvailable(cityId?: string): cityId is SupportedCityId {
    return TRIP_PLANNER_CONFIG.supportedCityIds.some((supportedCityId) => supportedCityId === cityId)
}
