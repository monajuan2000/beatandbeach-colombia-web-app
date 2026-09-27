export type City = {
    id: string
    name: string
    region: string
    tagline: string
    description: string
    highlights: string[]
}

export type EventItem = {
    id: string
    title: string
    city: string
    category: string
    date: string
    location: string
    summary: string
    price: string
    featured: boolean
    audience: string
}

export type Highlight = {
    id: string
    title: string
    description: string
    icon: string
}
