import santaElenaCampingImage from '@/assets/images/destinations/Medellin-Santa-Elena-an-attractive-campground.png'
import ancestralWatersTrailImage from '@/assets/images/destinations/ancestral-waters-muleteer-trail.jpeg'
import { CITY_IDS } from '@/features/cities/config'
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

function interpretiveStop(
    time: string,
    title: ItineraryStop['title'],
    description: ItineraryStop['description'],
): ItineraryStop {
    return { time, kind: 'attraction', title, description, isTentative: true }
}

const countrysidePackagePriceId = 'medellin-countryside-package'

export const medellinItineraries: CityItineraries = {
    cityId: CITY_IDS.medellin,
    prices: [
        ...prices,
        {
            id: countrysidePackagePriceId,
            category: 'package',
            label: {
                en: 'Countryside all-inclusive experience (per person)',
                es: 'Experiencia campestre todo incluido (por persona)',
            },
            unitPrice: 300000,
        },
    ],
    dailyPriceIds: ['santa-elena-insurance'],
    plans: [
        {
            id: 'medellin-santa-elena-1d1n',
            code: 'MED-SE-1D1N',
            name: { en: 'Santa Elena camping getaway', es: 'Escapada de camping en Santa Elena' },
            selectorLabel: { en: 'Santa Elena · camping', es: 'Santa Elena · camping' },
            durationLabel: {
                en: '1 day · 1 night',
                es: '1 día · 1 noche',
            },
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
        {
            id: 'medellin-countryside-2d1n',
            code: 'MED-FIN-2D1N',
            name: {
                en: 'Countryside English and networking getaway',
                es: 'Escapada campestre de inglés y networking',
            },
            selectorLabel: {
                en: 'Countryside · English + networking',
                es: 'Finca · inglés + networking',
            },
            specialLabel: {
                en: '2 days · 1 night',
                es: '2 días · 1 noche',
            },
            packagePriceId: countrysidePackagePriceId,
            summary: {
                en: 'Spend two days and one night at a private country estate with a pool near Girardota or Barbosa, with an all-inclusive group experience focused on practical English and meeting people in your professional community.',
                es: 'Disfruta dos días y una noche en una finca privada con piscina cerca de Girardota o Barbosa, con una experiencia grupal todo incluido enfocada en practicar inglés y conocer personas de tu gremio.',
            },
            inclusions: [
                {
                    en: 'Private round-trip transport from Medellín in a van or minibus for the group.',
                    es: 'Transporte privado de ida y regreso desde Medellín en van o buseta para el grupo.',
                },
                {
                    en: 'One night at a private country estate with a pool, green areas, social spaces, and lounge furniture.',
                    es: 'Una noche en una finca privada con piscina, zonas verdes, áreas sociales y mobiliario de descanso.',
                },
                {
                    en: 'Four meals: day-one lunch and dinner, plus day-two breakfast and lunch; basic hydration and snacks are included.',
                    es: 'Cuatro comidas: almuerzo y cena el primer día, desayuno y almuerzo el segundo; incluye hidratación y snacks básicos.',
                },
                {
                    en: 'A starter kit of national beers, traditional liquor, ice, and mixers.',
                    es: 'Dotación inicial de cervezas nacionales, licores tradicionales, hielo y mezcladores.',
                },
                {
                    en: 'Cook and kitchen assistant during the experience.',
                    es: 'Servicio de cocinera y ayudante de cocina durante la experiencia.',
                },
            ],
            conditions: [
                {
                    en: 'The COP 300,000 per-person base price is calculated for a closed group of 20 travelers. A different final group size may change the quote; maximum capacity is 20.',
                    es: 'El precio base de $300.000 COP por persona se calcula para un grupo cerrado de 20 pasajeros. Una cantidad final diferente puede cambiar la cotización; la capacidad máxima es de 20 personas.',
                },
                {
                    en: 'The finca location in Girardota or Barbosa depends on partner availability. Minor itinerary or service changes may be made for operational reasons while maintaining equivalent quality.',
                    es: 'La finca en Girardota o Barbosa depende de la disponibilidad de aliados. El itinerario o sus servicios pueden tener cambios menores por razones operativas, manteniendo una calidad equivalente.',
                },
                {
                    en: 'The included beverage kit is limited to the items described. Premium or imported drinks and additional consumption are paid for by attendees.',
                    es: 'La dotación de bebidas se limita a lo descrito. Los licores de gama alta, las cervezas importadas y los consumos adicionales corren por cuenta de los asistentes.',
                },
                {
                    en: 'The group is responsible for damage to the estate or its furnishings caused by misuse.',
                    es: 'El grupo es responsable por los daños a la finca o a sus enseres ocasionados por mal uso.',
                },
                {
                    en: 'Payment is split into a 50% deposit when the booking is confirmed and the remaining 50% before departure.',
                    es: 'El pago se divide en un anticipo del 50% al confirmar la reserva y el 50% restante antes del viaje.',
                },
            ],
            days: [
                {
                    title: { en: 'Arrival, English practice, and networking', es: 'Llegada, inglés y networking' },
                    stops: [
                        {
                            time: '09:00',
                            kind: 'transport',
                            title: { en: 'Private departure from Medellín', es: 'Salida privada desde Medellín' },
                            description: {
                                en: 'Travel to the selected country estate near Girardota or Barbosa.',
                                es: 'Traslado a la finca seleccionada cerca de Girardota o Barbosa.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '10:00',
                            kind: 'activity',
                            title: { en: 'Welcome and group introductions', es: 'Bienvenida y presentación del grupo' },
                            description: {
                                en: 'Meet the group, settle in, and review the proposed experience.',
                                es: 'Conoce al grupo, instálate y revisa la experiencia propuesta.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '11:00',
                            kind: 'activity',
                            title: { en: 'English conversation warm-up', es: 'Actividad inicial de conversación en inglés' },
                            description: {
                                en: 'A relaxed, practical English activity with introductions and conversation prompts.',
                                es: 'Actividad práctica y relajada de inglés con presentaciones y preguntas para conversar.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '13:00',
                            kind: 'meal',
                            title: { en: 'Country-style lunch', es: 'Almuerzo campestre' },
                            description: {
                                en: 'First meal at the estate.',
                                es: 'Primera comida en la finca.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '15:00',
                            kind: 'activity',
                            title: { en: 'English in action and poolside time', es: 'Inglés en acción y tiempo de piscina' },
                            description: {
                                en: 'Proposed English conversation challenges woven into the group’s free time.',
                                es: 'Retos de conversación en inglés propuestos para compartir durante el tiempo libre del grupo.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '19:00',
                            kind: 'meal',
                            title: { en: 'Welcome dinner or barbecue', es: 'Cena o asado de bienvenida' },
                            description: {
                                en: 'Dinner at the estate with the included beverage kit.',
                                es: 'Cena en la finca con la dotación de bebidas incluida.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '21:00',
                            kind: 'activity',
                            title: { en: 'Professional community networking', es: 'Networking del gremio' },
                            description: {
                                en: 'A proposed social activity to exchange experiences and meet others in the professional community.',
                                es: 'Actividad social propuesta para compartir experiencias y conocer a otras personas del gremio.',
                            },
                            isTentative: true,
                        },
                    ],
                },
                {
                    title: { en: 'Breakfast, workshop, and return', es: 'Desayuno, taller y regreso' },
                    stops: [
                        {
                            time: '08:00',
                            kind: 'meal',
                            title: { en: 'Country breakfast', es: 'Desayuno campestre' },
                            description: {
                                en: 'Breakfast at the estate.',
                                es: 'Desayuno en la finca.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '09:30',
                            kind: 'activity',
                            title: { en: 'Practical English and professional introductions', es: 'Inglés práctico y presentaciones profesionales' },
                            description: {
                                en: 'A proposed session to practice everyday English and introduce your work to other attendees.',
                                es: 'Sesión propuesta para practicar inglés cotidiano y presentar tu trabajo a los demás asistentes.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '12:00',
                            kind: 'meal',
                            title: { en: 'Closing lunch', es: 'Almuerzo de cierre' },
                            description: {
                                en: 'Final included meal before departure.',
                                es: 'Última comida incluida antes del regreso.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '14:00',
                            kind: 'transport',
                            title: { en: 'Private return to Medellín', es: 'Regreso privado a Medellín' },
                            description: {
                                en: 'Return transport from the selected estate.',
                                es: 'Transporte de regreso desde la finca seleccionada.',
                            },
                            isTentative: true,
                        },
                    ],
                },
            ],
        },
        {
            id: 'medellin-sena-nature',
            code: 'MED-SENA-001',
            name: {
                en: 'Ancestral Waters & Muleteer Trail',
                es: 'Ruta de las Aguas Ancestrales & El Camino del Arriero',
            },
            selectorLabel: { en: 'Ancestral Waters · SENA', es: 'Aguas Ancestrales · SENA' },
            specialLabel: { en: 'SENA plan', es: 'Plan SENA' },
            isSenaPlan: true,
            coverImage: {
                src: ancestralWatersTrailImage,
                alt: {
                    en: 'SENA students guiding a group along the Ancestral Waters and Muleteer Trail beside a mountain stream',
                    es: 'Estudiantes del SENA guían un grupo por la Ruta de las Aguas Ancestrales junto a una quebrada de montaña',
                },
            },
            summary: {
                en: 'A six-hour, approximately 6 km countryside walk through the Copacabana–Barbosa rural corridor, following historic muleteer trails, exploring local water landscapes, and sharing a traditional fiambre wrapped in bijao leaf. Low-to-moderate difficulty. The exact trail and any water access depend on local authorization and current conditions.',
                es: 'Una caminata veredal de seis horas y aproximadamente 6 km por el corredor Copacabana–Barbosa, siguiendo antiguos caminos de arriería, explorando los paisajes del agua y compartiendo un fiambre tradicional envuelto en hoja de bijao. Dificultad baja-media. El sendero exacto y el acceso al agua dependen de la autorización local y las condiciones del momento.',
            },
            inclusions: [
                {
                    en: 'Integrated public transport from Niquía and back; the fare is pending confirmation.',
                    es: 'Pasajes integrados de transporte público desde Niquía y regreso; tarifa pendiente de confirmación.',
                },
                {
                    en: 'Traditional countryside fiambre wrapped in bijao leaf at a local rural eatery.',
                    es: 'Fiambre campesino tradicional envuelto en hoja de bijao en un almorzadero local.',
                },
            ],
            conditions: [
                {
                    en: 'Meet at Niquía Metro Station at 08:00; the experience closes there at approximately 14:00.',
                    es: 'Encuentro en la estación Niquía del Metro a las 08:00; la experiencia termina allí aproximadamente a las 14:00.',
                },
                {
                    en: 'Bring closed-toe shoes with good grip, swimsuit, quick-dry towel, reusable water bottle, personal hydration, and a rain poncho or waterproof jacket.',
                    es: 'Lleva calzado cerrado con buen agarre, traje de baño, toalla de secado rápido, termo reutilizable, hidratación personal y capa impermeable o poncho.',
                },
                {
                    en: 'Swimming is only possible at an authorized site and when water and weather conditions are considered safe by the local guide. Water access may be removed from the itinerary.',
                    es: 'El baño solo se realizará en un sitio autorizado y si el guía local considera seguras las condiciones del agua y del clima. El acceso al agua puede retirarse del itinerario.',
                },
                {
                    en: 'The exact trail, transport service, and water access must be confirmed with local operators before the tour. The integrated transport fare is not yet included in the displayed cost breakdown.',
                    es: 'La ruta exacta, el servicio de transporte y el acceso al agua deben confirmarse con operadores locales antes del recorrido. La tarifa de transporte integrado aún no está incluida en el desglose de costos mostrado.',
                },
            ],
            days: [
                {
                    title: { en: 'Ancestral Waters & Muleteer Trail', es: 'Aguas Ancestrales & Camino del Arriero' },
                    stops: [
                        {
                            time: '08:00',
                            kind: 'transport',
                            title: { en: 'Meet at Niquía Metro Station', es: 'Encuentro en la estación Niquía' },
                            description: {
                                en: 'Meet the group by the turnstiles, receive a route and safety briefing, and board the integrated rural bus toward the Copacabana–Barbosa corridor. The integrated fare is pending confirmation.',
                                es: 'Encuentro del grupo en los torniquetes, indicaciones de ruta y seguridad, y abordaje del bus integrado veredal hacia el corredor Copacabana–Barbosa. La tarifa integrada está pendiente de confirmación.',
                            },
                            isTentative: true,
                        },
                        interpretiveStop(
                            '08:50',
                            { en: 'Start of the interpretive trail', es: 'Inicio del sendero interpretativo' },
                            {
                                en: 'Begin the approximately 6 km walk on a rural bridle path, with short landscape and botanical observation stops.',
                                es: 'Inicio de la caminata de aproximadamente 6 km por un camino de herradura veredal, con paradas breves de observación botánica y paisajística.',
                            },
                        ),
                        interpretiveStop(
                            '09:30',
                            { en: 'The historic stone muleteer road', es: 'El antiguo camino real de piedra' },
                            {
                                en: 'Learn how mule trains carried coffee, panela, and other goods along Antioquia’s historic rural routes.',
                                es: 'Conoce cómo las recuas de mulas transportaban café, panela y otras mercancías por los caminos históricos de Antioquia.',
                            },
                        ),
                        interpretiveStop(
                            '10:15',
                            { en: 'Muleteer stories and mountain plants', es: 'Historias de arriería y plantas de montaña' },
                            {
                                en: 'Hear local muleteer stories and learn about traditional uses of mountain plants without harvesting or consuming them.',
                                es: 'Escucha historias locales de arriería y conoce usos tradicionales de plantas de montaña, sin recolectarlas ni consumirlas.',
                            },
                        ),
                        interpretiveStop(
                            '10:50',
                            { en: 'Waterways and local legends', es: 'Quebradas y relatos del agua' },
                            {
                                en: 'Explore the role of local streams in the rural landscape and hear community stories about their water guardians.',
                                es: 'Explora el papel de las quebradas en el paisaje veredal y escucha relatos comunitarios sobre sus guardianes del agua.',
                            },
                        ),
                        interpretiveStop(
                            '11:15',
                            { en: 'Rest by the stream or waterfall', es: 'Descanso junto a la quebrada o cascada' },
                            {
                                en: 'Time to rest, take photos, or enter the water only if the site is authorized and the guide confirms safe conditions.',
                                es: 'Tiempo para descansar, tomar fotografías o entrar al agua solo si el sitio está autorizado y el guía confirma que las condiciones son seguras.',
                            },
                        ),
                        {
                            time: '12:30',
                            kind: 'meal',
                            title: { en: 'Traditional fiambre in bijao leaf', es: 'Fiambre campesino en hoja de bijao' },
                            description: {
                                en: 'Lunch break at a local rural eatery.',
                                es: 'Receso para almorzar en una fonda veredal local.',
                            },
                            priceId: 'santa-elena-lunch',
                        },
                        {
                            time: '13:20',
                            kind: 'transport',
                            title: { en: 'Integrated return toward Niquía', es: 'Regreso integrado hacia Niquía' },
                            description: {
                                en: 'Board the integrated rural transport back toward the Metro station. The fare is pending confirmation.',
                                es: 'Abordaje del transporte integrado veredal de regreso hacia la estación del Metro. La tarifa está pendiente de confirmación.',
                            },
                            isTentative: true,
                        },
                        {
                            time: '14:00',
                            kind: 'activity',
                            title: { en: 'Close at Niquía Metro Station', es: 'Cierre en la estación Niquía' },
                            description: {
                                en: 'End of the experience at the meeting point.',
                                es: 'Fin de la experiencia en el punto de encuentro.',
                            },
                            isTentative: true,
                        },
                    ],
                },
            ],
        },
    ],
}
