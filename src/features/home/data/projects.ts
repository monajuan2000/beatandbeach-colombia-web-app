import type { Project } from '../types'

export const projects: Project[] = [
    {
        id: 'beat-and-beach-colombia',
        name: { en: 'Beat & Beach Colombia', es: 'Beat & Beach Colombia' },
        type: { en: 'Tourism platform', es: 'Plataforma de turismo' },
        description: {
            en: 'A digital experience showcasing events, destinations, and travel storytelling across Colombia.',
            es: 'Una experiencia digital que muestra eventos, destinos y relatos de viaje por toda Colombia.',
        },
        status: { en: 'Active', es: 'Activo' },
        accent: 'green',
    },
    {
        id: 'travel-experience-app',
        name: { en: 'Travel Experience App', es: 'App de experiencias de viaje' },
        type: { en: 'Product concept', es: 'Concepto de producto' },
        description: {
            en: 'A future app for booking experiences, city guides, and curated itinerary planning.',
            es: 'Una futura app para reservar experiencias, consultar guías de ciudad y planear itinerarios a la medida.',
        },
        status: { en: 'In progress', es: 'En progreso' },
        accent: 'blue',
    },
    {
        id: 'brand-portfolio',
        name: { en: 'Brand Portfolio', es: 'Portafolio de marca' },
        type: { en: 'Creative showcase', es: 'Vitrina creativa' },
        description: {
            en: 'A visual identity system for tourism, culture, and lifestyle brands in Latin America.',
            es: 'Un sistema de identidad visual para marcas de turismo, cultura y estilo de vida en Latinoamérica.',
        },
        status: { en: 'Planning', es: 'En planeación' },
        accent: 'purple',
    },
]
