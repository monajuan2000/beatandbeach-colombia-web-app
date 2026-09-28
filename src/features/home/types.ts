import type { LocalizedText } from '@/i18n/types'

export type Highlight = {
    id: string
    title: LocalizedText
    description: LocalizedText
    icon: string
}

export type ProjectAccent = 'green' | 'blue' | 'purple'

export type Project = {
    id: string
    name: LocalizedText
    type: LocalizedText
    description: LocalizedText
    status: LocalizedText
    accent: ProjectAccent
}
