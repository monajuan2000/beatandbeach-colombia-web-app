import type { CitiesMessages } from './en'

export const citiesEs: CitiesMessages = {
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
        keepExploring: 'Sigue explorando',
        otherDestinationsAriaLabel: 'Otros destinos',
    },
}
