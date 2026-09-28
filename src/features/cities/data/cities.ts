import medellinCardImage from '@/assets/images/cities/medellin-card.jpeg'
import type { City } from '../types'

export const cities: City[] = [
    {
        id: 'medellin',
        name: 'Medellín',
        status: 'launching',
        region: { en: 'Andean rhythm', es: 'Ritmo andino' },
        description: {
            en: 'A vibrant city full of innovation, nightlife, and contemporary culture.',
            es: 'Una ciudad vibrante llena de innovación, vida nocturna y cultura contemporánea.',
        },
        intro: {
            en: 'Medellín merges innovation, culture, and nightlife in a way that makes every week feel like a celebration. From electronic music gatherings to big-city festivals, there is always something happening.',
            es: 'Medellín combina innovación, cultura y vida nocturna de una forma que hace que cada semana se sienta como una celebración. Desde encuentros de música electrónica hasta grandes festivales, siempre hay algo pasando.',
        },
        stats: [
            { value: '25+', label: { en: 'major events per month', es: 'grandes eventos al mes' } },
            { value: '3', label: { en: 'top nightlife districts', es: 'zonas top de vida nocturna' } },
            { value: '1', label: { en: 'city full of energy', es: 'ciudad llena de energía' } },
        ],
        image: medellinCardImage,
    },
    {
        id: 'cali',
        name: 'Cali',
        status: 'under-review',
        region: { en: 'Salsa and energy', es: 'Salsa y energía' },
        description: {
            en: 'A city of movement, music, and strong local identity with a deep cultural pulse.',
            es: 'Una ciudad de movimiento, música y fuerte identidad local, con un profundo pulso cultural.',
        },
        intro: {
            en: 'Cali lives to the beat of salsa. Its dance schools, legendary clubs, and year-end fair turn every visit into a lesson in rhythm, joy, and Pacific-influenced culture.',
            es: 'Cali vive al ritmo de la salsa. Sus escuelas de baile, sus discotecas legendarias y su feria de fin de año convierten cada visita en una lección de ritmo, alegría y cultura con influencia del Pacífico.',
        },
        stats: [
            { value: '100+', label: { en: 'salsa schools and clubs', es: 'escuelas y clubes de salsa' } },
            { value: '6', label: { en: 'days of the Cali Fair', es: 'días de Feria de Cali' } },
            { value: '1', label: { en: 'rhythm that never stops', es: 'ritmo que nunca se detiene' } },
        ],
    },
    {
        id: 'cartagena',
        name: 'Cartagena',
        status: 'under-review',
        region: { en: 'Historic coast', es: 'Costa histórica' },
        description: {
            en: 'Colorful colonial streets, Caribbean breeze, and unforgettable sunsets.',
            es: 'Calles coloniales llenas de color, brisa caribeña y atardeceres inolvidables.',
        },
        intro: {
            en: 'Colorful streets, colonial architecture, and unforgettable sunsets make Cartagena a premium destination for culture lovers, with art nights and beachfront sessions all year long.',
            es: 'Sus calles coloridas, su arquitectura colonial y sus atardeceres inolvidables hacen de Cartagena un destino premium para los amantes de la cultura, con noches de arte y sesiones frente al mar todo el año.',
        },
        stats: [
            { value: '11 km', label: { en: 'of colonial walls', es: 'de murallas coloniales' } },
            { value: '30+', label: { en: 'nearby islands', es: 'islas cercanas' } },
            { value: '365', label: { en: 'days of Caribbean sun', es: 'días de sol caribeño' } },
        ],
    },
    {
        id: 'guatape',
        name: 'Guatapé',
        status: 'launching',
        region: { en: 'Lake & mountain views', es: 'Lago y montaña' },
        description: {
            en: 'A scenic getaway with lakes, colorful houses, and outdoor adventure.',
            es: 'Una escapada escénica con lagos, casas coloridas y aventura al aire libre.',
        },
        intro: {
            en: 'A scenic lake town with colorful facades, turquoise waters, and unforgettable outdoor experiences, just two hours from Medellín.',
            es: 'Un pueblo junto al lago con fachadas coloridas, aguas turquesa y experiencias al aire libre inolvidables, a solo dos horas de Medellín.',
        },
        stats: [
            { value: '740', label: { en: 'steps up El Peñol', es: 'escalones hasta la cima de El Peñol' } },
            { value: '2 h', label: { en: 'from Medellín', es: 'desde Medellín' } },
            { value: '1', label: { en: 'lake full of islands', es: 'lago lleno de islas' } },
        ],
    },
]

const rolloutOrder: Record<City['status'], number> = { launching: 0, 'under-review': 1 }

/** Cities with launching destinations first, keeping the original order within each group. */
export const citiesByRollout = [...cities].sort((a, b) => rolloutOrder[a.status] - rolloutOrder[b.status])

export function getCityById(id: string | undefined) {
    return cities.find((city) => city.id === id)
}
