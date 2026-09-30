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

export type StopKind = 'transport' | 'meal' | 'attraction' | 'lodging'

export type ItineraryStop = {
    /** 24h local time, e.g. "07:00". */
    time: string
    kind: StopKind
    title: LocalizedText
    description: LocalizedText
    /** Priced service this stop consumes once. Attractions without it are free. */
    priceId?: string
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
}

/** Every basic plan offered for one city, with the price list its stops refer to. */
export type CityItineraries = {
    cityId: string
    prices: PriceItem[]
    /** Charged once per day of the plan, independently of the stops (e.g. accident insurance). */
    dailyPriceIds: string[]
    plans: ItineraryPlan[]
}
