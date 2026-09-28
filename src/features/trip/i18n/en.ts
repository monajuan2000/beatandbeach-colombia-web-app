import type { TripInterest, TripSummary } from '../types'

export const tripEn = {
    eyebrow: 'Plan my trip',
    title: 'Design your Colombia experience.',
    intro: 'Tell us where and when, and we’ll build an itinerary around the events you love.',
    savedEvents: 'Saved events',
    noSavedEvents: 'No events saved yet.',
    browseEvents: 'Browse events',
    remove: 'Remove',
    fields: {
        destination: 'Destination',
        arrivalDate: 'Arrival date',
        travelers: 'Travelers',
        interests: 'Interests',
        fullName: 'Full name',
        email: 'Email',
    },
    interests: {
        music: 'Music',
        culture: 'Culture',
        nightlife: 'Nightlife',
        adventure: 'Adventure',
        food: 'Food',
        beach: 'Beach',
    } satisfies Record<TripInterest, string>,
    submit: 'Send my trip request',
    success: {
        tag: 'Request received',
        title: (firstName: string) => `Thanks, ${firstName}! Your trip is taking shape.`,
        summary: ({ city, travelers, date, savedCount }: TripSummary) =>
            `We’ll put together a ${city} itinerary for ${travelers} ${travelers === 1 ? 'traveler' : 'travelers'} arriving on ${date}${
                savedCount > 0 ? `, including ${savedCount} saved ${savedCount === 1 ? 'event' : 'events'}` : ''
            }.`,
        contact: 'Our team will reach out at',
        done: 'Done',
        edit: 'Edit request',
    },
}

export type TripMessages = typeof tripEn
