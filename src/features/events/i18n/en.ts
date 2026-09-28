import type { EventCategory } from '../types'

export const eventsEn = {
    list: {
        eyebrow: 'Featured events',
        title: 'Curated experiences you can join right away.',
        filterAriaLabel: 'Filter events by city',
        showAll: (hiddenCount: number) => `Show all events (${hiddenCount} more)`,
        showFewer: 'Show fewer events',
    },
    card: {
        saved: '✓ Saved',
    },
    details: {
        bestFor: 'Best for:',
        addToTrip: 'Add to my trip',
        savedToTrip: '✓ Saved to my trip',
        planTrip: 'Plan my trip',
        explore: (city: string) => `Explore ${city}`,
    },
    categories: {
        'electronic-music': 'Electronic music',
        music: 'Music',
        culture: 'Culture',
        adventure: 'Adventure',
        food: 'Food',
        'concert-series': 'Concert series',
        'cultural-fair': 'Cultural fair',
        'live-concert': 'Live concert',
        'dance-experience': 'Dance experience',
        expo: 'Expo / convention',
    } satisfies Record<EventCategory, string>,
}

export type EventsMessages = typeof eventsEn
