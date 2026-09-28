export type Highlight = {
    id: string
    title: string
    description: string
    icon: string
}

export type ProjectAccent = 'green' | 'blue' | 'purple'

export type Project = {
    id: string
    name: string
    type: string
    description: string
    status: string
    accent: ProjectAccent
}
