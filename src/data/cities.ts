import type { City } from '../types'

export const cities: City[] = [
    {
        id: 'medellin',
        name: 'Medellín',
        region: 'Andean Region',
        tagline: 'Urban energy, culture, and nightlife',
        description:
            'A vibrant city known for innovation, live music, and a strong mix of creative and social experiences.',
        highlights: ['Nightlife', 'Gastronomy', 'Creative districts'],
    },
    {
        id: 'cartagena',
        name: 'Cartagena',
        region: 'Caribbean Coast',
        tagline: 'Historic charm by the sea',
        description:
            'Colorful streets, colonial architecture, and unforgettable sunsets make Cartagena a premium destination for culture lovers.',
        highlights: ['Beachfront events', 'Historic center', 'Sunset tours'],
    },
    {
        id: 'guatape',
        name: 'Guatapé',
        region: 'Antioquia',
        tagline: 'Mountain views and scenic adventures',
        description:
            'A scenic lake town with colorful facades, turquoise waters, and unforgettable outdoor experiences.',
        highlights: ['Outdoor activities', 'Lake views', 'Local artisan culture'],
    },
]
