import type { CostCategory, StopKind } from '../types'

export const itinerariesEn = {
    section: {
        eyebrow: 'Itineraries',
        title: (city: string) => `Basic plans to experience ${city}`,
        intro: 'Pick how many days you have. Basic plans include transport, accident insurance, breakfast, lunch and dinner, the main attractions and, for multi-day trips, lodging.',
        durationAriaLabel: 'Choose the length of your trip',
        duration: (days: number) => `${days} ${days === 1 ? 'day' : 'days'}`,
        show: (count: number) => `See the ${count} plans`,
        hide: 'Hide plans',
        fromPrice: (price: string) => `From ${price} per person`,
    },
    timeline: {
        ariaLabel: (plan: string) => `Schedule for ${plan}`,
        day: (day: number) => `Day ${day}`,
        free: 'Free',
        tentative: 'To be confirmed',
        specialPlan: 'Special plan',
        kinds: {
            transport: 'Transport',
            meal: 'Meal',
            attraction: 'Attraction',
            lodging: 'Lodging',
            activity: 'Activity',
        } satisfies Record<StopKind, string>,
    },
    costs: {
        eyebrow: 'Price per person',
        categories: {
            transport: 'Transport',
            insurance: 'Accident insurance',
            meals: 'Meals',
            lodging: 'Lodging',
            attractions: 'Attractions',
        } satisfies Record<CostCategory, string>,
        quantity: (quantity: number, unitPrice: string) => `${quantity} × ${unitPrice}`,
        total: 'Estimated total',
        disclaimer: 'Reference prices in Colombian pesos (COP) for 2026. They may change with the season and each provider; we confirm the final price when you book.',
    },
}

export type ItinerariesMessages = typeof itinerariesEn
