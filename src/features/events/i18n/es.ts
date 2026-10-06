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
        comingSoon: 'Muy pronto · Reservas aún no disponibles',
    },
    details: {
        bestFor: 'Ideal para:',
        addToTrip: 'Agregar a mi viaje',
        savedToTrip: '✓ Guardado en mi viaje',
        bookingSoon: '⏳ Disponible muy pronto',
        eventBookingSoonHint: 'Las reservas para esta experiencia estarán disponibles muy pronto.',
        bookingSoonHint: (city: string) => `Podrás agregar este evento a tu viaje cuando ${city} abra como destino.`,
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
