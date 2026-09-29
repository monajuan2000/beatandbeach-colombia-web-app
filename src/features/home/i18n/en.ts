export const homeEn = {
    sections: {
        discover: 'Discover',
        featured: 'Featured',
        about: 'About us',
        destinations: 'Destinations',
        events: 'Events',
        whyUs: 'Why us',
    },
    hero: {
        eyebrow: 'Live unforgettable experiences',
        title: {
            lead: 'Discover the best events across the most iconic destinations of ',
            highlight: 'Colombia',
            end: '.',
        },
        description:
            'Explore the energy of Medellín, the charm of Cartagena, and the scenic beauty of Guatapé through curated experiences designed for travelers and locals alike.',
        exploreEvents: 'Explore events',
        viewCities: 'View cities',
        statsAriaLabel: 'Key event statistics',
        stats: {
            events: 'Events',
            cities: 'Cities',
            rating: 'Traveler rating',
        },
        visualAriaLabel: 'Featured destinations summary',
        destinationTitle: 'Colombia',
        destinationDescription: 'Urban energy, Caribbean charm, and mountain escapes.',
        destinationsAriaLabel: 'Featured destination list',
        chooseDestination: 'Choose your destination',
        nextEvent: {
            label: 'Next up',
            startsIn: (days: number) => (days === 0 ? 'starts today' : `in ${days} ${days === 1 ? 'day' : 'days'}`),
        },
        scrollCue: 'Scroll to discover',
    },
    highlightedHeading: {
        ariaLabel: 'Popular events heading',
        eyebrow: '2026 season',
        title: 'Colombia’s most unforgettable events',
        subtitle: 'Festivals, culture, and landscapes worth living at least once.',
    },
    wonders: {
        ariaLabel: 'Colombia highlights banner',
        eyebrow: 'A country of contrasts',
        title: 'Wonders of Colombia',
        description:
            'From the Caribbean coast to the Andes and the Pacific, Colombia offers a rich mix of culture, color, and unforgettable landscapes in every region.',
        regionsAriaLabel: 'Colombian regions',
        regions: ['Caribbean coast', 'Andes', 'Pacific', 'Amazon'],
    },
    spotlight: {
        ariaLabel: 'Featured event spotlight',
        eyebrow: 'Popular event',
        description: (city: string) =>
            `Experience the city’s most electrifying festival weekend with world-class electronic acts, immersive stages, and a late-night atmosphere unlike any other in ${city}.`,
        moreIn: (city: string) => `More in ${city}`,
        countdown: {
            label: 'Starts in',
            ended: 'Happening now 🎉',
            units: { days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' },
        },
        factsAriaLabel: 'Event details',
        facts: {
            date: 'Date',
            venue: 'Venue',
            tickets: 'Tickets',
            genre: 'Genre',
        },
    },
    projects: {
        ariaLabel: 'Current projects',
        eyebrow: 'Current projects',
        title: 'Projects I’m building right now.',
    },
    about: {
        eyebrow: 'About us',
        title: 'We turn Colombia into an unforgettable travel story.',
        paragraphs: [
            'Beat & Beach Colombia is a tourism brand created to connect travelers with the rhythm, culture, and beauty of the country’s most iconic destinations. We design experiences that blend local identity, premium hospitality, and authentic moments in Medellín, Cartagena, and Guatapé.',
            'Our mission is simple: help visitors discover the soul of Colombia through carefully curated events, cultural experiences, coastal energy, and scenic escapes that feel both exciting and deeply local.',
        ],
        points: [
            { title: 'Curated journeys', description: 'Thoughtful experiences built around each destination.' },
            { title: 'Local identity', description: 'Authentic moments shaped by regional culture and community.' },
            { title: 'Memorable events', description: 'Music, culture, nightlife, and adventure in one itinerary.' },
            { title: 'Premium service', description: 'Professional guidance for travelers who want quality and ease.' },
        ],
    },
    highlights: {
        eyebrow: 'Why choose us',
        title: 'Built for travelers who want more than a generic itinerary.',
    },
}

export type HomeMessages = typeof homeEn
