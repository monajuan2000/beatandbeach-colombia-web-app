import santaElenaCampingImage from '@/assets/images/destinations/Medellin-Santa-Elena-an-attractive-campground.png'
import type { CityItineraries, ItineraryStop } from '../types'

const prices: CityItineraries['prices'] = [
    {
        id: 'santa-elena-transport',
        category: 'transport',
        label: {
            en: 'Shared transport Medellín ⇄ Santa Elena (one way)',
            es: 'Transporte compartido Medellín ⇄ Santa Elena (trayecto)',
        },
        unitPrice: 18000,
    },
    {
        id: 'santa-elena-insurance',
        category: 'insurance',
        label: { en: 'Travel accident insurance (per day)', es: 'Póliza de accidentes y asistencia (por día)' },
        unitPrice: 12000,
    },
    {
        id: 'santa-elena-breakfast',
        category: 'meals',
        label: { en: 'Breakfast', es: 'Desayuno' },
        unitPrice: 18000,
    },
    {
        id: 'santa-elena-lunch',
        category: 'meals',
        label: { en: 'Lunch', es: 'Almuerzo' },
        unitPrice: 30000,
    },
    {
        id: 'santa-elena-dinner',
        category: 'meals',
        label: { en: 'Dinner', es: 'Comida' },
        unitPrice: 28000,
    },
    {
        id: 'santa-elena-camping',
        category: 'lodging',
        label: { en: 'Camping night (per person)', es: 'Noche de camping (por persona)' },
        unitPrice: 75000,
    },
]

function transport(time: string, returning = false): ItineraryStop {
    return {
        time,
        kind: 'transport',
        title: returning
            ? { en: 'Return to Medellín', es: 'Regreso a Medellín' }
            : { en: 'Travel to Santa Elena', es: 'Traslado a Santa Elena' },
        description: returning
            ? {
                en: 'Shared transport from the camping area back to Medellín.',
                es: 'Transporte compartido desde la zona de camping de regreso a Medellín.',
            }
            : {
                en: 'Shared transport from Medellín to Santa Elena.',
                es: 'Transporte compartido desde Medellín hasta Santa Elena.',
            },
        priceId: 'santa-elena-transport',
    }
}

export const santaElenaItineraries: CityItineraries = {
    cityId: 'medellin',
    prices,
    dailyPriceIds: ['santa-elena-insurance'],
    plans: [
        {
            id: 'medellin-santa-elena-1d1n',
            code: 'MED-SE-1D1N',
            name: { en: 'Santa Elena camping getaway', es: 'Escapada de camping en Santa Elena' },
            durationLabel: { en: '1 day, 1 night', es: '1 día y 1 noche' },
            coverImage: {
                src: santaElenaCampingImage,
                alt: {
                    en: 'Scenic campground in Santa Elena, Medellín',
                    es: 'Paisaje de un camping en Santa Elena, Medellín',
                },
            },
            summary: {
                en: 'Explore Santa Elena’s nature, spend one night camping, and return to Medellín the next morning.',
                es: 'Explora la naturaleza de Santa Elena, pasa una noche de camping y regresa a Medellín a la mañana siguiente.',
            },
            days: [
                {
                    title: { en: 'Nature and camping', es: 'Naturaleza y camping' },
                    stops: [
                        transport('07:30'),
                        {
                            time: '09:00',
                            kind: 'activity',
                            title: { en: 'Nature activity in Arví Park', es: 'Actividad de naturaleza en el Parque Arví' },
                            description: {
                                en: 'Visit the natural pools only if they are clean and open to visitors; otherwise, enjoy a walk on an open park trail. Check local conditions before departure.',
                                es: 'Visita los charcos naturales solo si están limpios y habilitados para visitantes; de lo contrario, disfruta una caminata por un sendero abierto del parque. Verifica las condiciones antes de salir.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '11:00',
                            kind: 'attraction',
                            title: { en: 'Nature walk in Santa Elena', es: 'Caminata por la naturaleza de Santa Elena' },
                            description: {
                                en: 'Enjoy the rural landscapes and fresh mountain air on a relaxed walk.',
                                es: 'Disfruta los paisajes rurales y el aire fresco de montaña en una caminata tranquila.',
                            },
                        },
                        {
                            time: '12:30',
                            kind: 'meal',
                            title: { en: 'Country-style lunch', es: 'Almuerzo campesino' },
                            description: {
                                en: 'Lunch at a local restaurant in the corregimiento.',
                                es: 'Almuerzo en un restaurante local del corregimiento.',
                            },
                            priceId: 'santa-elena-lunch',
                        },
                        {
                            time: '15:00',
                            kind: 'activity',
                            title: { en: 'Check in and set up camp', es: 'Ingreso y montaje del campamento' },
                            description: {
                                en: 'Settle into the campsite and enjoy the surrounding countryside.',
                                es: 'Instálate en la zona de camping y disfruta del entorno campestre.',
                            },
                        },
                        {
                            time: '19:00',
                            kind: 'meal',
                            title: { en: 'Dinner at the campsite', es: 'Comida en el campamento' },
                            description: {
                                en: 'A warm dinner before spending the night outdoors.',
                                es: 'Una comida caliente antes de pasar la noche al aire libre.',
                            },
                            priceId: 'santa-elena-dinner',
                        },
                        {
                            time: '20:30',
                            kind: 'lodging',
                            title: { en: 'Camping night in Santa Elena', es: 'Noche de camping en Santa Elena' },
                            description: {
                                en: 'Spend one night at a local campsite. Confirm campsite facilities and equipment when booking.',
                                es: 'Pasa una noche en una zona de camping local. Confirma los servicios y el equipo disponibles al reservar.',
                            },
                            priceId: 'santa-elena-camping',
                            isTentative: true,
                        },
                    ],
                },
                {
                    title: { en: 'Breakfast and return', es: 'Desayuno y regreso' },
                    stops: [
                        {
                            time: '07:00',
                            kind: 'meal',
                            title: { en: 'Breakfast', es: 'Desayuno' },
                            description: {
                                en: 'Breakfast before packing up and checking out.',
                                es: 'Desayuno antes de recoger el campamento y hacer el check-out.',
                            },
                            priceId: 'santa-elena-breakfast',
                        },
                        transport('09:00', true),
                    ],
                },
            ],
        },
    ],
}
