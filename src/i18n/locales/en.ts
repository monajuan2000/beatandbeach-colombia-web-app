/** App-wide UI copy shared by several features (layout, generic actions). */
export const commonEn = {
    documentTitle: 'Beat & Beach Colombia | Events',
    languageLabel: 'Language',
    featured: 'Featured',
    viewDetails: 'View details',
    close: 'Close',
    all: 'All',
    backToHome: 'Back to home',
    header: {
        homeAriaLabel: 'Beat and Beach Colombia, go to home',
        logoAlt: 'Beat and Beach Colombia logo',
        subtitle: 'Colombia events',
        navAriaLabel: 'Main navigation',
        nav: {
            discover: 'Discover',
            cities: 'Cities',
            events: 'Events',
            insights: 'Insights',
        },
        planTrip: 'Plan my trip',
        savedEvents: (count: number) => `${count} saved ${count === 1 ? 'event' : 'events'}`,
    },
}

export type CommonMessages = typeof commonEn
