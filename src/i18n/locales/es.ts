import type { CommonMessages } from './en'

export const commonEs: CommonMessages = {
    documentTitle: 'Beat & Beach Colombia | Eventos',
    languageLabel: 'Idioma',
    featured: 'Destacado',
    viewDetails: 'Ver detalles',
    close: 'Cerrar',
    all: 'Todos',
    backToHome: 'Volver al inicio',
    header: {
        homeAriaLabel: 'Beat and Beach Colombia, ir al inicio',
        logoAlt: 'Logo de Beat and Beach Colombia',
        subtitle: 'Eventos en Colombia',
        navAriaLabel: 'Navegación principal',
        nav: {
            discover: 'Descubre',
            cities: 'Ciudades',
            events: 'Eventos',
            insights: 'Beneficios',
        },
        planTrip: 'Planear mi viaje',
        savedEvents: (count: number) => `${count} ${count === 1 ? 'evento guardado' : 'eventos guardados'}`,
    },
}
