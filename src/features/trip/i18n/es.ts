import type { TripSummary } from '../types'
import type { TripMessages } from './en'

export const tripEs: TripMessages = {
    eyebrow: 'Planear mi viaje',
    title: 'Diseña tu experiencia en Colombia.',
    intro: 'Cuéntanos dónde y cuándo, y armaremos un itinerario alrededor de los eventos que te encantan.',
    savedItems: 'Elementos guardados',
    selectedTour: 'Tour seleccionado',
    chooseTour: 'Tipo de tour e itinerario',
    selectTour: 'Selecciona un tour',
    tourCode: 'Código del tour',
    noSavedEvents: 'Aún no has guardado eventos.',
    browseEvents: 'Explorar eventos',
    remove: 'Quitar',
    fields: {
        destination: 'Destino',
        arrivalDate: 'Fecha de llegada',
        availableTourDate: 'Fecha disponible del tour',
        departureDate: 'Fecha de salida',
        travelers: 'Viajeros',
        interests: 'Intereses',
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
    },
    interests: {
        music: 'Música',
        culture: 'Cultura',
        nightlife: 'Vida nocturna',
        adventure: 'Aventura',
        food: 'Gastronomía',
        beach: 'Playa',
    },
    submit: 'Enviar mi solicitud de viaje',
    success: {
        tag: 'Solicitud recibida',
        title: (firstName: string) => `¡Gracias, ${firstName}! Tu viaje está tomando forma.`,
        summary: ({ city, travelers, arrivalDate, departureDate, savedCount }: TripSummary) =>
            `Armaremos un itinerario en ${city} para ${travelers} ${travelers === 1 ? 'viajero' : 'viajeros'}, con llegada el ${arrivalDate} y salida el ${departureDate}${
                savedCount > 0 ? `, incluyendo ${savedCount} elemento${savedCount === 1 ? '' : 's'} guardado${savedCount === 1 ? '' : 's'}` : ''
            }.`,
        contact: 'Nuestro equipo te contactará en',
        done: 'Listo',
        edit: 'Editar solicitud',
    },
}
