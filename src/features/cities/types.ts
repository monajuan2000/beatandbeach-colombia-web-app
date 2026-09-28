export type CityStat = {
    value: string
    label: string
}

export type City = {
    id: string
    name: string
    region: string
    tagline: string
    description: string
    intro: string
    highlights: string[]
    stats: CityStat[]
    image?: string
}
