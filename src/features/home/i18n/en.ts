export const homeEn = {
    hero: {
        eyebrow: 'Live unforgettable experiences',
        title: 'Discover the best events across Colombia’s most iconic destinations.',
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
    },
    highlightedHeading: {
        ariaLabel: 'Popular events heading',
        title: 'Colombia’s most unforgettable events',
    },
    wonders: {
        ariaLabel: 'Colombia highlights banner',
        eyebrow: 'A country of contrasts',
        title: 'Wonders of Colombia',
        description:
            'From the Caribbean coast to the Andes and the Pacific, Colombia offers a rich mix of culture, color, and unforgettable landscapes in every region.',
    },
    spotlight: {
        ariaLabel: 'Featured event spotlight',
        eyebrow: 'Popular event',
        description: (city: string) =>
            `Experience the city’s most electrifying festival weekend with world-class electronic acts, immersive stages, and a late-night atmosphere unlike any other in ${city}.`,
        moreIn: (city: string) => `More in ${city}`,
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
