import { CITY_IDS } from '@/features/cities/config'

export const ITINERARY_RULES = {
    guatape: {
        cityId: CITY_IDS.guatape,
        unavailablePlanIds: ['guatape-2-days', 'guatape-3-days'],
        quoteablePlanIds: ['guatape-1-day', 'guatape-sena'],
    },
} as const

export const MAX_QUOTE_PDF_SIZE_BYTES = 10 * 1024 * 1024
const UNAVAILABLE_PLAN_IDS: readonly string[] = ITINERARY_RULES.guatape.unavailablePlanIds
const QUOTEABLE_PLAN_IDS: readonly string[] = ITINERARY_RULES.guatape.quoteablePlanIds

export function getUnavailablePlanIds(cityId: string) {
    return cityId === ITINERARY_RULES.guatape.cityId
        ? UNAVAILABLE_PLAN_IDS
        : []
}

export function isQuoteablePlan(cityId: string, planId: string) {
    return cityId === ITINERARY_RULES.guatape.cityId &&
        QUOTEABLE_PLAN_IDS.includes(planId)
}

export function isPlanUnderReview(cityId: string, planId: string) {
    return cityId === ITINERARY_RULES.guatape.cityId && !isQuoteablePlan(cityId, planId)
}
