import type { LocalizedText } from '@/i18n/types'

/** Stable category ids; display labels live in `events/i18n`. */
export type EventCategory =
    | 'electronic-music'
    | 'music'
    | 'culture'
    | 'adventure'
    | 'food'
    | 'concert-series'
    | 'cultural-fair'
    | 'live-concert'
    | 'dance-experience'
    | 'expo'

export type EventItem = {
    id: string
    title: LocalizedText
    cityId: string
    category: EventCategory
    date: LocalizedText
    /** ISO start/end, used for the calendar tile and countdown. */
    startsAt?: string
    endsAt?: string
    location: LocalizedText
    summary: LocalizedText
    price: LocalizedText
    featured: boolean
    audience: LocalizedText
    image?: string
}
