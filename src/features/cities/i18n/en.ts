import type { CityStatus } from '../types'

export const citiesEn = {
    status: {
        labels: {
            launching: 'Opening soon',
            'under-review': 'Coming soon',
        } satisfies Record<CityStatus, string>,
        pillTag: 'Soon',
        cardNotice: 'In technical, legal & logistics review',
        reviewNotice: (city: string) =>
            `${city} is in technical, legal, and logistics review so we can open it as a destination very soon. You can still explore its events and plan ahead.`,
        withStatus: (city: string, status: string) => `${city} · ${status}`,
    },
    grid: {
        eyebrow: 'Top destinations',
        title: 'Explore Colombia through four unforgettable cities.',
        eventCount: (count: number) => `${count} ${count === 1 ? 'event' : 'events'} · Explore →`,
    },
    page: {
        eyebrow: 'City experience',
        title: (city: string) => `${city} events`,
        planTrip: (city: string) => `Plan a trip to ${city}`,
        whyStandsOut: (city: string) => `Why ${city} stands out`,
        filterAriaLabel: (city: string) => `Filter ${city} events by category`,
        eventsAriaLabel: (city: string) => `${city} events list`,
        keepExploring: 'Keep exploring',
        otherDestinationsAriaLabel: 'Other destinations',
    },
}

export type CitiesMessages = typeof citiesEn
