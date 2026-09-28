import type { LocalizedText } from '@/i18n/types'

export type Highlight = {
    id: string
    title: LocalizedText
    description: LocalizedText
    icon: string
}

export type ProjectAccent = 'green' | 'blue' | 'purple'

/** Lifecycle stage; drives the status dot (only `active` pulses). */
export type ProjectStage = 'active' | 'in-progress' | 'planning'

export type Project = {
    id: string
    name: LocalizedText
    type: LocalizedText
    description: LocalizedText
    status: LocalizedText
    stage: ProjectStage
    accent: ProjectAccent
}
