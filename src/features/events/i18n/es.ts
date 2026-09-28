import type { EventsMessages } from './en'

export const eventsEs: EventsMessages = {
    list: {
        eyebrow: 'Eventos destacados',
        title: 'Experiencias seleccionadas a las que puedes unirte ya.',
        filterAriaLabel: 'Filtrar eventos por ciudad',
        showAll: (hiddenCount: number) => `Ver todos los eventos (${hiddenCount} más)`,
        showFewer: 'Ver menos eventos',
    },
    card: {
        saved: '✓ Guardado',
    },
    details: {
        bestFor: 'Ideal para:',
        addToTrip: 'Agregar a mi viaje',
        savedToTrip: '✓ Guardado en mi viaje',
        planTrip: 'Planear mi viaje',
        explore: (city: string) => `Explorar ${city}`,
    },
    categories: {
        'electronic-music': 'Música electrónica',
        music: 'Música',
        culture: 'Cultura',
        adventure: 'Aventura',
        food: 'Gastronomía',
        'concert-series': 'Ciclo de conciertos',
        'cultural-fair': 'Feria cultural',
        'live-concert': 'Concierto en vivo',
        'dance-experience': 'Experiencia de baile',
        expo: 'Expo / convención',
    },
}
