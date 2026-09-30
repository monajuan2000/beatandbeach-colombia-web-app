import type { ItinerariesMessages } from './en'

export const itinerariesEs: ItinerariesMessages = {
    section: {
        eyebrow: 'Itinerarios',
        title: (city: string) => `Planes básicos para vivir ${city}`,
        intro: 'Elige cuántos días tienes. Todos los planes incluyen transporte, póliza de accidentes, desayuno, almuerzo y comida, los atractivos principales y, en los viajes de varios días, hospedaje.',
        durationAriaLabel: 'Elige la duración de tu viaje',
        duration: (days: number) => `${days} ${days === 1 ? 'día' : 'días'}`,
        show: (count: number) => `Ver los ${count} planes`,
        hide: 'Ocultar planes',
        fromPrice: (price: string) => `Desde ${price} por persona`,
    },
    timeline: {
        ariaLabel: (plan: string) => `Cronograma de ${plan}`,
        day: (day: number) => `Día ${day}`,
        free: 'Gratis',
        kinds: {
            transport: 'Transporte',
            meal: 'Comida',
            attraction: 'Atractivo',
            lodging: 'Hospedaje',
        },
    },
    costs: {
        eyebrow: 'Precio por persona',
        categories: {
            transport: 'Transporte',
            insurance: 'Póliza de accidentes',
            meals: 'Alimentación',
            lodging: 'Hospedaje',
            attractions: 'Atractivos',
        },
        quantity: (quantity: number, unitPrice: string) => `${quantity} × ${unitPrice}`,
        total: 'Total estimado',
        disclaimer: 'Precios de referencia en pesos colombianos (COP) para 2026. Pueden variar según la temporada y cada proveedor; confirmamos el valor final al reservar.',
    },
}
