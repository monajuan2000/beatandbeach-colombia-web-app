export const citiesEn = {
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
