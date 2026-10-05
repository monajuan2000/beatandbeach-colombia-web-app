import type { CityItineraries, ItineraryStop } from '../types'

/*
 * Reference prices per person in COP (2026), for a basic plan.
 * They are estimates to confirm with each provider before selling a package.
 */
const prices: CityItineraries['prices'] = [
    {
        id: 'intercity-bus',
        category: 'transport',
        label: { en: 'Bus Medellín ⇄ Guatapé (one way)', es: 'Bus Medellín ⇄ Guatapé (trayecto)' },
        unitPrice: 28000,
    },
    {
        id: 'mototaxi',
        category: 'transport',
        label: { en: 'Mototaxi ride (shared)', es: 'Trayecto en mototaxi (compartido)' },
        unitPrice: 10000,
    },
    {
        id: 'private-transport',
        category: 'transport',
        label: {
            en: 'Private vehicle Medellín ⇄ Guatapé, group rate (one way)',
            es: 'Carro privado Medellín ⇄ Guatapé, tarifa de grupo (trayecto)',
        },
        unitPrice: 40000,
    },
    {
        id: 'accident-insurance',
        category: 'insurance',
        label: { en: 'Travel accident insurance (per day)', es: 'Póliza de accidentes y asistencia (por día)' },
        unitPrice: 12000,
    },
    {
        id: 'breakfast',
        category: 'meals',
        label: { en: 'Breakfast', es: 'Desayuno' },
        unitPrice: 18000,
    },
    {
        id: 'lunch',
        category: 'meals',
        label: { en: 'Lunch', es: 'Almuerzo' },
        unitPrice: 35000,
    },
    {
        id: 'dinner',
        category: 'meals',
        label: { en: 'Dinner', es: 'Comida' },
        unitPrice: 32000,
    },
    {
        id: 'snack',
        category: 'meals',
        label: { en: 'Snack', es: 'Refrigerio' },
        unitPrice: 12000,
    },
    {
        id: 'basic-lodging',
        category: 'lodging',
        label: {
            en: 'Hostel or basic hotel, shared room (per night)',
            es: 'Hostal u hotel básico, habitación compartida (por noche)',
        },
        unitPrice: 90000,
    },
    {
        id: 'el-penol-ticket',
        category: 'attractions',
        label: { en: 'El Peñol rock entrance', es: 'Entrada a la Piedra del Peñol' },
        unitPrice: 28000,
    },
    {
        id: 'boat-tour',
        category: 'attractions',
        label: { en: 'Shared boat tour on the reservoir', es: 'Recorrido colectivo en barco por el embalse' },
        unitPrice: 40000,
    },
    {
        id: 'kayak',
        category: 'attractions',
        label: { en: 'Kayak rental (1 hour)', es: 'Alquiler de kayak (1 hora)' },
        unitPrice: 35000,
    },
]

/* Stops shared by several plans; the time is set by each plan. */

/** Proposed interpretive stop of the SENA plan, pending the final route. */
function interpretiveStop(time: string, title: ItineraryStop['title'], description: ItineraryStop['description']): ItineraryStop {
    return { time, kind: 'attraction', title, description, isTentative: true }
}

function busToGuatape(time: string): ItineraryStop {
    return {
        time,
        kind: 'transport',
        title: { en: 'Bus to Guatapé', es: 'Bus hacia Guatapé' },
        description: {
            en: 'Departure from Medellín’s North Bus Terminal. The ride takes about 2 hours.',
            es: 'Salida desde la Terminal del Norte de Medellín. El trayecto dura unas 2 horas.',
        },
        priceId: 'intercity-bus',
    }
}

function busToMedellin(time: string): ItineraryStop {
    return {
        time,
        kind: 'transport',
        title: { en: 'Bus back to Medellín', es: 'Bus de regreso a Medellín' },
        description: {
            en: 'Return from the Guatapé terminal, next to the main square.',
            es: 'Regreso desde la terminal de Guatapé, junto al parque principal.',
        },
        priceId: 'intercity-bus',
    }
}

function mototaxi(time: string, destination: 'rock' | 'town' | 'replica'): ItineraryStop {
    const titles = {
        rock: { en: 'Mototaxi to El Peñol rock', es: 'Mototaxi a la Piedra del Peñol' },
        town: { en: 'Mototaxi back to town', es: 'Mototaxi de regreso al pueblo' },
        replica: { en: 'Mototaxi to the Old Peñol replica', es: 'Mototaxi a la Réplica del Viejo Peñol' },
    }

    return {
        time,
        kind: 'transport',
        title: titles[destination],
        description: {
            en: 'Short ride in the town’s typical moto-rickshaws.',
            es: 'Trayecto corto en los típicos motocarros del pueblo.',
        },
        priceId: 'mototaxi',
    }
}

function breakfast(time: string): ItineraryStop {
    return {
        time,
        kind: 'meal',
        title: { en: 'Paisa breakfast', es: 'Desayuno paisa' },
        description: {
            en: 'Arepa, eggs, hot chocolate or coffee in a local café.',
            es: 'Arepa, huevos, chocolate o café en una cafetería local.',
        },
        priceId: 'breakfast',
    }
}

function lunch(time: string): ItineraryStop {
    return {
        time,
        kind: 'meal',
        title: { en: 'Lunch', es: 'Almuerzo' },
        description: {
            en: 'Lake trout or bandeja paisa, the region’s classics.',
            es: 'Trucha del embalse o bandeja paisa, los clásicos de la región.',
        },
        priceId: 'lunch',
    }
}

function dinner(time: string): ItineraryStop {
    return {
        time,
        kind: 'meal',
        title: { en: 'Dinner', es: 'Comida' },
        description: {
            en: 'Set dinner in a restaurant near the main square.',
            es: 'Comida del día en un restaurante cerca del parque principal.',
        },
        priceId: 'dinner',
    }
}

function lodging(time: string): ItineraryStop {
    return {
        time,
        kind: 'lodging',
        title: { en: 'Night at the hostel', es: 'Noche en el hostal' },
        description: {
            en: 'Basic lodging in town, walking distance from the pier.',
            es: 'Hospedaje básico en el pueblo, a pocos pasos del malecón.',
        },
        priceId: 'basic-lodging',
    }
}

function elPenolClimb(time: string): ItineraryStop {
    return {
        time,
        kind: 'attraction',
        title: { en: 'Climb El Peñol rock', es: 'Subida a la Piedra del Peñol' },
        description: {
            en: '740 steps to a 360° view over the islands of the reservoir.',
            es: '740 escalones hasta una vista de 360° sobre las islas del embalse.',
        },
        priceId: 'el-penol-ticket',
    }
}

function boatTour(time: string): ItineraryStop {
    return {
        time,
        kind: 'attraction',
        title: { en: 'Boat tour on the reservoir', es: 'Recorrido en barco por el embalse' },
        description: {
            en: 'About an hour among islands, the sunken Old Peñol site and lakeside estates.',
            es: 'Cerca de una hora entre islas, el sitio del Viejo Peñol sumergido y fincas a orillas del lago.',
        },
        priceId: 'boat-tour',
    }
}

function townWalk(time: string): ItineraryStop {
    return {
        time,
        kind: 'attraction',
        title: { en: 'Walk through the colorful town', es: 'Recorrido por el pueblo de colores' },
        description: {
            en: 'Calle del Recuerdo, Plazoleta de los Zócalos and the Our Lady of Carmen church.',
            es: 'Calle del Recuerdo, Plazoleta de los Zócalos e Iglesia Nuestra Señora del Carmen.',
        },
    }
}

function pierSunset(time: string): ItineraryStop {
    return {
        time,
        kind: 'attraction',
        title: { en: 'Sunset at the pier', es: 'Atardecer en el malecón' },
        description: {
            en: 'Stroll along the lakefront promenade and its local food stalls.',
            es: 'Paseo por el malecón frente al lago y sus puestos de comida local.',
        },
    }
}

export const guatapeItineraries: CityItineraries = {
    cityId: 'guatape',
    prices,
    dailyPriceIds: ['accident-insurance'],
    plans: [
        {
            id: 'guatape-1-day',
            code: 'GUA-1D',
            name: { en: 'Guatapé in one day', es: 'Guatapé en un día' },
            summary: {
                en: 'The essentials in a round trip from Medellín: the rock, the reservoir and the colorful town.',
                es: 'Lo esencial en un viaje de ida y vuelta desde Medellín: la piedra, el embalse y el pueblo de colores.',
            },
            days: [
                {
                    title: { en: 'Rock, lake and zócalos', es: 'Piedra, lago y zócalos' },
                    stops: [
                        busToGuatape('06:00'),
                        breakfast('08:15'),
                        mototaxi('09:00', 'rock'),
                        elPenolClimb('09:15'),
                        mototaxi('11:30', 'town'),
                        lunch('12:00'),
                        boatTour('13:30'),
                        townWalk('15:00'),
                        dinner('17:30'),
                        busToMedellin('18:30'),
                    ],
                },
            ],
        },
        {
            id: 'guatape-2-days',
            code: 'GUA-2D',
            name: { en: 'Guatapé in two days', es: 'Guatapé en dos días' },
            summary: {
                en: 'A calmer pace with a night by the lake to enjoy the sunset and climb the rock early.',
                es: 'Un ritmo más tranquilo, con una noche junto al lago para ver el atardecer y subir la piedra temprano.',
            },
            days: [
                {
                    title: { en: 'Arrival and the colorful town', es: 'Llegada y pueblo de colores' },
                    stops: [
                        busToGuatape('07:00'),
                        breakfast('09:15'),
                        townWalk('10:00'),
                        lunch('12:30'),
                        boatTour('14:00'),
                        pierSunset('17:30'),
                        dinner('19:00'),
                        lodging('21:00'),
                    ],
                },
                {
                    title: { en: 'El Peñol rock', es: 'Piedra del Peñol' },
                    stops: [
                        breakfast('07:30'),
                        mototaxi('08:15', 'rock'),
                        elPenolClimb('08:30'),
                        mototaxi('11:30', 'town'),
                        lunch('12:30'),
                        dinner('17:00'),
                        busToMedellin('18:00'),
                    ],
                },
            ],
        },
        {
            id: 'guatape-3-days',
            code: 'GUA-3D',
            name: { en: 'Guatapé in three days', es: 'Guatapé en tres días' },
            summary: {
                en: 'The full experience: town, rock, the Old Peñol replica and a morning on the water.',
                es: 'La experiencia completa: pueblo, piedra, la Réplica del Viejo Peñol y una mañana en el agua.',
            },
            days: [
                {
                    title: { en: 'Arrival and the colorful town', es: 'Llegada y pueblo de colores' },
                    stops: [
                        busToGuatape('07:00'),
                        breakfast('09:15'),
                        townWalk('10:00'),
                        lunch('12:30'),
                        pierSunset('17:30'),
                        dinner('19:00'),
                        lodging('21:00'),
                    ],
                },
                {
                    title: { en: 'El Peñol rock and its history', es: 'La Piedra del Peñol y su historia' },
                    stops: [
                        breakfast('07:30'),
                        mototaxi('08:15', 'rock'),
                        elPenolClimb('08:30'),
                        lunch('12:00'),
                        mototaxi('13:30', 'replica'),
                        {
                            time: '14:00',
                            kind: 'attraction',
                            title: { en: 'Old Peñol replica', es: 'Réplica del Viejo Peñol' },
                            description: {
                                en: 'The rebuilt square of the town flooded by the reservoir, with its church and houses.',
                                es: 'La plaza reconstruida del pueblo que inundó el embalse, con su iglesia y sus casas.',
                            },
                        },
                        mototaxi('16:00', 'town'),
                        dinner('19:00'),
                        lodging('21:00'),
                    ],
                },
                {
                    title: { en: 'A morning on the water', es: 'Una mañana en el agua' },
                    stops: [
                        breakfast('08:00'),
                        boatTour('09:00'),
                        {
                            time: '10:30',
                            kind: 'attraction',
                            title: { en: 'Kayak on the reservoir', es: 'Kayak en el embalse' },
                            description: {
                                en: 'Paddle through the calm bays next to the pier, life jacket included.',
                                es: 'Remada por las bahías tranquilas junto al malecón, con chaleco salvavidas.',
                            },
                            priceId: 'kayak',
                        },
                        lunch('12:30'),
                        dinner('17:00'),
                        busToMedellin('18:00'),
                    ],
                },
            ],
        },
        {
            id: 'guatape-sena',
            code: 'GUA-SENA',
            name: { en: 'SENA special plan', es: 'Plan especial SENA' },
            specialLabel: { en: 'SENA plan', es: 'Plan SENA' },
            summary: {
                en: 'A 6-hour interpretive tour in Guatapé, plus the ride from and back to Medellín. Includes round-trip transport, accident insurance, a snack and lunch.',
                es: 'Un recorrido interpretativo de 6 horas en Guatapé, más el trayecto desde y hacia Medellín. Incluye transporte de ida y regreso, póliza de accidentes, refrigerio y almuerzo.',
            },
            days: [
                {
                    title: { en: 'Interpretive tour', es: 'Recorrido interpretativo' },
                    stops: [
                        {
                            time: '06:00',
                            kind: 'transport',
                            title: { en: 'Departure from Medellín', es: 'Salida desde Medellín' },
                            description: {
                                en: 'The group leaves in a private vehicle; arrival in Guatapé by 8:00 at the latest.',
                                es: 'El grupo sale en carro privado; llegada a Guatapé a más tardar a las 8:00.',
                            },
                            priceId: 'private-transport',
                        },
                        {
                            time: '08:00',
                            kind: 'meal',
                            title: { en: 'Welcome snack', es: 'Refrigerio de bienvenida' },
                            description: {
                                en: 'A short break on arrival before starting the tour.',
                                es: 'Una pausa corta al llegar, antes de iniciar el recorrido.',
                            },
                            priceId: 'snack',
                        },
                        interpretiveStop(
                            '08:30',
                            { en: 'El Peñol rock viewpoint', es: 'Mirador de la Piedra del Peñol' },
                            {
                                en: 'The geology of the monolith and its place in the region’s history, from its base.',
                                es: 'La geología del monolito y su lugar en la historia de la región, desde su base.',
                            },
                        ),
                        interpretiveStop(
                            '09:45',
                            { en: 'Reservoir pier', es: 'Malecón del embalse' },
                            {
                                en: 'How the hydroelectric reservoir was built and how it flooded the old town of El Peñol.',
                                es: 'Cómo se construyó el embalse hidroeléctrico y cómo inundó el antiguo pueblo de El Peñol.',
                            },
                        ),
                        interpretiveStop(
                            '10:45',
                            { en: 'Calle del Recuerdo and the zócalos', es: 'Calle del Recuerdo y zócalos' },
                            {
                                en: 'The colorful skirting boards that tell the town’s stories and trades.',
                                es: 'Los zócalos de colores que cuentan las historias y los oficios del pueblo.',
                            },
                        ),
                        interpretiveStop(
                            '11:30',
                            { en: 'Main square and church', es: 'Parque principal e iglesia' },
                            {
                                en: 'Our Lady of Carmen church and the heart of local life. The tour closes here.',
                                es: 'La Iglesia Nuestra Señora del Carmen y el corazón de la vida local. Aquí cierra el recorrido.',
                            },
                        ),
                        {
                            time: '12:00',
                            kind: 'activity',
                            title: { en: 'Feedback session', es: 'Retroalimentación y feedback' },
                            description: {
                                en: 'The group shares what they learned and evaluates the tour.',
                                es: 'El grupo comparte lo aprendido y evalúa el recorrido.',
                            },
                        },
                        lunch('12:30'),
                        {
                            time: '13:00',
                            kind: 'transport',
                            title: { en: 'Pickup and return to Medellín', es: 'Recogida y regreso a Medellín' },
                            description: {
                                en: 'The vehicle picks the group up; arrival in Medellín around 15:00.',
                                es: 'El carro recoge al grupo; llegada a Medellín hacia las 15:00.',
                            },
                            priceId: 'private-transport',
                        },
                    ],
                },
            ],
        },
    ],
}
