import type { TripInterest, TripSummary } from '../types'

export const tripEn = {
    eyebrow: 'Plan my trip',
    title: 'Design your Colombia experience.',
    intro: 'Tell us where and when, and we’ll build an itinerary around the events you love.',
    savedItems: 'Saved trip items',
    selectedTour: 'Selected tour',
    chooseTour: 'Tour and itinerary type',
    selectTour: 'Select a tour',
    tourCode: 'Tour code',
    noSavedEvents: 'No events saved yet.',
    browseEvents: 'Browse events',
    remove: 'Remove',
    fields: {
        destination: 'Destination',
        arrivalDate: 'Arrival date',
        availableTourDate: 'Available tour date',
        departureDate: 'Departure date',
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
        summary: ({ city, travelers, arrivalDate, departureDate, savedCount }: TripSummary) =>
            `We’ll put together a ${city} itinerary for ${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}, arriving on ${arrivalDate} and departing on ${departureDate}${
                savedCount > 0 ? `, including ${savedCount} saved ${savedCount === 1 ? 'item' : 'items'}` : ''
            }.`,
        contact: 'Our team will reach out at',
        done: 'Done',
        edit: 'Edit request',
    },
}

export type TripMessages = typeof tripEn
