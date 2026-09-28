import type { LocalizedText } from '@/i18n/types'

export type CityStat = {
    value: string
    label: LocalizedText
}

/**
 * Rollout stage of a destination.
 * - `launching`: first destinations to open; highlighted across the UI.
 * - `under-review`: still navigable, but shown with a "coming soon" notice while the
 *   technical, legal, and logistics review is completed.
 */
export type CityStatus = 'launching' | 'under-review'

export type City = {
    id: string
    /** Proper noun, identical in every language. */
    name: string
    status: CityStatus
    region: LocalizedText
    description: LocalizedText
    intro: LocalizedText
    stats: CityStat[]
    image?: string
}
