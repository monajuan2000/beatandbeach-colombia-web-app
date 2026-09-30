import type { LocalizedText } from '@/i18n/types'

/** Groups used in the cost breakdown; display labels live in `itineraries/i18n`. */
export type CostCategory = 'transport' | 'insurance' | 'meals' | 'lodging' | 'attractions'

/** A priced service, in Colombian pesos per person. */
export type PriceItem = {
    id: string
    category: CostCategory
    /** Includes the unit it is charged by, e.g. "Bus Medellín ⇄ Guatapé (one way)". */
    label: LocalizedText
    unitPrice: number
}

/** `activity` covers group moments such as a feedback session. */
export type StopKind = 'transport' | 'meal' | 'attraction' | 'lodging' | 'activity'

export type ItineraryStop = {
    /** 24h local time, e.g. "07:00". */
    time: string
    kind: StopKind
    title: LocalizedText
    description: LocalizedText
    /** Priced service this stop consumes once. Attractions without it are free. */
    priceId?: string
    /** Proposed stop still to be confirmed; shown with a "to be confirmed" tag. */
    isTentative?: boolean
}

export type ItineraryDay = {
    title: LocalizedText
    stops: ItineraryStop[]
}

export type ItineraryPlan = {
    id: string
    name: LocalizedText
    summary: LocalizedText
    days: ItineraryDay[]
    /**
     * Marks a plan made for a specific group (e.g. SENA). It is shown as the selector label instead
     * of the duration, and the plan is left out of the public "from" price.
     */
    specialLabel?: LocalizedText
}

/** Every plan (basic and special) offered for one city, with the price list its stops refer to. */
export type CityItineraries = {
    cityId: string
    prices: PriceItem[]
    /** Charged once per day of the plan, independently of the stops (e.g. accident insurance). */
    dailyPriceIds: string[]
    plans: ItineraryPlan[]
}
