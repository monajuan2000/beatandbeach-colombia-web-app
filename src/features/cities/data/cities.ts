import type { City } from '../types'
import medellinCardImage from '@/assets/images/cities/medellin-card.jpeg'

export const cities: City[] = [
    {
        id: 'medellin',
        name: 'Medellín',
        region: 'Andean rhythm',
        tagline: 'Urban energy, culture, and nightlife',
        description: 'A vibrant city full of innovation, nightlife, and contemporary culture.',
        intro:
            'Medellín merges innovation, culture, and nightlife in a way that makes every week feel like a celebration. From electronic music gatherings to big-city festivals, there is always something happening.',
        highlights: ['Nightlife', 'Gastronomy', 'Creative districts'],
        stats: [
            { value: '25+', label: 'major events per month' },
            { value: '3', label: 'top nightlife districts' },
            { value: '1', label: 'city full of energy' },
        ],
        image: medellinCardImage,
    },
    {
        id: 'cali',
        name: 'Cali',
        region: 'Salsa and energy',
        tagline: 'The world capital of salsa',
        description: 'A city of movement, music, and strong local identity with a deep cultural pulse.',
        intro:
            'Cali lives to the beat of salsa. Its dance schools, legendary clubs, and year-end fair turn every visit into a lesson in rhythm, joy, and Pacific-influenced culture.',
        highlights: ['Salsa clubs', 'Pacific culture', 'Year-end fair'],
        stats: [
            { value: '100+', label: 'salsa schools and clubs' },
            { value: '6', label: 'days of the Cali Fair' },
            { value: '1', label: 'rhythm that never stops' },
        ],
    },
    {
        id: 'cartagena',
        name: 'Cartagena',
        region: 'Historic coast',
        tagline: 'Historic charm by the sea',
        description: 'Colorful colonial streets, Caribbean breeze, and unforgettable sunsets.',
        intro:
            'Colorful streets, colonial architecture, and unforgettable sunsets make Cartagena a premium destination for culture lovers, with art nights and beachfront sessions all year long.',
        highlights: ['Beachfront events', 'Historic center', 'Sunset tours'],
        stats: [
            { value: '11 km', label: 'of colonial walls' },
            { value: '30+', label: 'nearby islands' },
            { value: '365', label: 'days of Caribbean sun' },
        ],
    },
    {
        id: 'guatape',
        name: 'Guatapé',
        region: 'Lake & mountain views',
        tagline: 'Mountain views and scenic adventures',
        description: 'A scenic getaway with lakes, colorful houses, and outdoor adventure.',
        intro:
            'A scenic lake town with colorful facades, turquoise waters, and unforgettable outdoor experiences, just two hours from Medellín.',
        highlights: ['Outdoor activities', 'Lake views', 'Local artisan culture'],
        stats: [
            { value: '740', label: 'steps up El Peñol' },
            { value: '2 h', label: 'from Medellín' },
            { value: '1', label: 'lake full of islands' },
        ],
    },
]

export function getCityById(id: string | undefined) {
    return cities.find((city) => city.id === id)
}
