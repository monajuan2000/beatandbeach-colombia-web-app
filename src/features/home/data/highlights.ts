import type { Highlight } from '../types'

export const experienceHighlights: Highlight[] = [
    {
        id: 'curated-events',
        title: { en: 'Curated experiences', es: 'Experiencias seleccionadas' },
        description: {
            en: 'Every event is selected for authenticity, atmosphere, and memorable moments.',
            es: 'Cada evento se elige por su autenticidad, su ambiente y sus momentos memorables.',
        },
        icon: '✦',
    },
    {
        id: 'local-guides',
        title: { en: 'Local insights', es: 'Guía local' },
        description: {
            en: 'Connect with trusted local recommendations and neighborhood-driven planning.',
            es: 'Conecta con recomendaciones locales confiables y una planeación centrada en cada barrio.',
        },
        icon: '✓',
    },
    {
        id: 'smart-planning',
        title: { en: 'Smart itinerary design', es: 'Itinerarios inteligentes' },
        description: {
            en: 'Build trips that combine culture, adventure, and relaxation without friction.',
            es: 'Arma viajes que combinan cultura, aventura y descanso sin complicaciones.',
        },
        icon: '◎',
    },
    {
        id: 'seamless-booking',
        title: { en: 'Seamless booking', es: 'Reservas fáciles' },
        description: {
            en: 'Plan your visit with simple steps, transparent pricing, and flexible options.',
            es: 'Planea tu visita con pasos simples, precios transparentes y opciones flexibles.',
        },
        icon: '→',
    },
]
