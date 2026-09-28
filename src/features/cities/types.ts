import type { LocalizedText } from '@/i18n/types'

export type CityStat = {
    value: string
    label: LocalizedText
}

export type City = {
    id: string
    /** Proper noun, identical in every language. */
    name: string
    region: LocalizedText
    description: LocalizedText
    intro: LocalizedText
    stats: CityStat[]
    image?: string
}
