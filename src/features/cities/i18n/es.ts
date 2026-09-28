import type { CitiesMessages } from './en'

export const citiesEs: CitiesMessages = {
    status: {
        labels: {
            launching: 'Próxima apertura',
            'under-review': 'Muy pronto',
        },
        pillTag: 'Pronto',
        cardNotice: 'En revisión técnica, legal y logística',
        reviewNotice: (city: string) =>
            `${city} está en revisión técnica, legal y logística para abrirse como destino muy pronto. Mientras tanto, puedes explorar sus eventos y planear tu viaje con anticipación.`,
        withStatus: (city: string, status: string) => `${city} · ${status}`,
    },
    grid: {
        eyebrow: 'Destinos principales',
        title: 'Explora Colombia a través de cuatro ciudades inolvidables.',
        eventCount: (count: number) => `${count} ${count === 1 ? 'evento' : 'eventos'} · Explorar →`,
    },
    page: {
        eyebrow: 'Experiencia de ciudad',
        title: (city: string) => `Eventos en ${city}`,
        planTrip: (city: string) => `Planear un viaje a ${city}`,
        whyStandsOut: (city: string) => `Por qué ${city} se destaca`,
        filterAriaLabel: (city: string) => `Filtrar eventos de ${city} por categoría`,
        eventsAriaLabel: (city: string) => `Lista de eventos de ${city}`,
        coverAlt: (city: string) => `Paisaje de ${city}`,
        keepExploring: 'Sigue explorando',
        otherDestinationsAriaLabel: 'Otros destinos',
    },
}
