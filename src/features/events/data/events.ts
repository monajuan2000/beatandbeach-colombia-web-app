import edcColombiaImage from '@/assets/images/events/edc-colombia-2026.jpeg'
import { getCityById } from '@/features/cities/data/cities'
import type { EventItem } from '../types'

export const events: EventItem[] = [
    {
        id: 'edc-colombia-2026',
        title: { en: 'EDC Colombia 2026', es: 'EDC Colombia 2026' },
        cityId: 'medellin',
        category: 'electronic-music',
        date: { en: '10–11 Oct 2026', es: '10–11 oct 2026' },
        startsAt: '2026-10-10T00:00:00-05:00',
        endsAt: '2026-10-11T23:59:00-05:00',
        location: { en: 'Festival grounds', es: 'Recinto del festival' },
        summary: {
            en: 'The city’s biggest electronic celebration with immersive stages, iconic DJs, and a full weekend of music, lights, and atmosphere.',
            es: 'La mayor celebración electrónica de la ciudad, con escenarios inmersivos, DJs icónicos y un fin de semana completo de música, luces y ambiente.',
        },
        featured: true,
        audience: { en: 'Electronic music fans', es: 'Fans de la música electrónica' },
        image: edcColombiaImage,
    },
    {
        id: 'medellin-sound-park',
        title: { en: 'Sound Park Festival', es: 'Sound Park Festival' },
        cityId: 'medellin',
        category: 'music',
        date: { en: 'June 22, 2026', es: '22 de junio de 2026' },
        location: { en: 'Explora Park', es: 'Parque Explora' },
        summary: {
            en: 'A multi-stage music celebration blending local and international artists with food and design pop-ups.',
            es: 'Una celebración musical con varios escenarios que mezcla artistas locales e internacionales con puestos de comida y diseño.',
        },
        price: { en: 'From $80.000', es: 'Desde $80.000' },
        featured: true,
        audience: { en: 'Young adults and music lovers', es: 'Jóvenes y amantes de la música' },
    },
    {
        id: 'cartagena-barrio-arts',
        title: { en: 'Cartagena Arts Night', es: 'Noche de Arte en Cartagena' },
        cityId: 'cartagena',
        category: 'culture',
        date: { en: 'July 4, 2026', es: '4 de julio de 2026' },
        location: { en: 'Getsemaní', es: 'Getsemaní' },
        summary: {
            en: 'A creative evening of visual arts, local storytelling, and cultural performances in the historic center.',
            es: 'Una noche creativa de artes visuales, relatos locales y presentaciones culturales en el centro histórico.',
        },
        price: { en: 'From $60.000', es: 'Desde $60.000' },
        featured: true,
        audience: { en: 'Culture enthusiasts', es: 'Amantes de la cultura' },
    },
    {
        id: 'guatape-lake-run',
        title: { en: 'Guatapé Lake Run', es: 'Carrera del Lago de Guatapé' },
        cityId: 'guatape',
        category: 'adventure',
        date: { en: 'August 15, 2026', es: '15 de agosto de 2026' },
        location: { en: 'Lake Guatapé', es: 'Embalse de Guatapé' },
        summary: {
            en: 'An outdoor running and wellness event with panoramic routes, local food, and eco-friendly activities.',
            es: 'Un evento de running y bienestar al aire libre con rutas panorámicas, comida local y actividades sostenibles.',
        },
        price: { en: 'From $45.000', es: 'Desde $45.000' },
        featured: true,
        audience: { en: 'Active travelers and fitness lovers', es: 'Viajeros activos y amantes del ejercicio' },
    },
    {
        id: 'medellin-food-market',
        title: { en: 'Urban Food Market', es: 'Mercado Gastronómico Urbano' },
        cityId: 'medellin',
        category: 'food',
        date: { en: 'Every Saturday', es: 'Todos los sábados' },
        location: { en: 'El Poblado', es: 'El Poblado' },
        summary: {
            en: 'A modern food market featuring signature dishes, artisan drinks, and live music.',
            es: 'Un mercado gastronómico moderno con platos de autor, bebidas artesanales y música en vivo.',
        },
        price: { en: 'Free Entry', es: 'Entrada libre' },
        featured: false,
        audience: { en: 'Families and foodies', es: 'Familias y amantes de la buena comida' },
    },
    {
        id: 'medellin-music-week',
        title: { en: 'Medellín Music Week', es: 'Semana de la Música de Medellín' },
        cityId: 'medellin',
        category: 'concert-series',
        date: { en: '18 Sep 2026', es: '18 sep 2026' },
        location: { en: 'El Poblado', es: 'El Poblado' },
        summary: {
            en: 'A week of concerts, indie showcases, and urban culture experiences that bring together local and global artists.',
            es: 'Una semana de conciertos, showcases independientes y experiencias de cultura urbana que reúne a artistas locales y globales.',
        },
        price: { en: 'From $50.000', es: 'Desde $50.000' },
        featured: false,
        audience: { en: 'Live music lovers', es: 'Amantes de la música en vivo' },
    },
    {
        id: 'medellin-flower-festival',
        title: { en: 'Flower Festival', es: 'Feria de las Flores' },
        cityId: 'medellin',
        category: 'cultural-fair',
        date: { en: '2 Oct 2026', es: '2 oct 2026' },
        location: { en: 'Historic Center', es: 'Centro Histórico' },
        summary: {
            en: 'One of the city’s most iconic celebrations, combining music, flowers, local gastronomy, and community traditions.',
            es: 'Una de las celebraciones más icónicas de la ciudad, que combina música, flores, gastronomía local y tradiciones comunitarias.',
        },
        price: { en: 'Free Entry', es: 'Entrada libre' },
        featured: false,
        audience: { en: 'Families and culture lovers', es: 'Familias y amantes de la cultura' },
    },
    {
        id: 'medellin-arena-live',
        title: { en: 'Arena Medellín Live', es: 'Arena Medellín en Vivo' },
        cityId: 'medellin',
        category: 'live-concert',
        date: { en: '7 Nov 2026', es: '7 nov 2026' },
        location: { en: 'Arena Medellín', es: 'Arena Medellín' },
        summary: {
            en: 'A major venue for concerts, pop, rock, and global talent, designed for a high-energy night experience.',
            es: 'Un gran escenario para conciertos de pop, rock y talento internacional, pensado para una noche llena de energía.',
        },
        price: { en: 'From $120.000', es: 'Desde $120.000' },
        featured: false,
        audience: { en: 'Concert goers', es: 'Amantes de los conciertos' },
    },
    {
        id: 'medellin-salsa-nights',
        title: { en: 'Salsa & Rhythm Nights', es: 'Noches de Salsa y Ritmo' },
        cityId: 'medellin',
        category: 'dance-experience',
        date: { en: 'Every Friday', es: 'Todos los viernes' },
        location: { en: 'Various clubs', es: 'Varios clubes' },
        summary: {
            en: 'A rotating selection of salsa, electronic fusion, and live sets in Medellín’s nightlife scene.',
            es: 'Una selección rotativa de salsa, fusión electrónica y sets en vivo en la vida nocturna de Medellín.',
        },
        price: { en: 'From $30.000', es: 'Desde $30.000' },
        featured: false,
        audience: { en: 'Dancers and night owls', es: 'Bailarines y amantes de la noche' },
    },
    {
        id: 'medellin-innovation-fair',
        title: { en: 'Innovation & Design Fair', es: 'Feria de Innovación y Diseño' },
        cityId: 'medellin',
        category: 'expo',
        date: { en: '21 Nov 2026', es: '21 nov 2026' },
        location: { en: 'Ruta N', es: 'Ruta N' },
        summary: {
            en: 'An entrepreneurship and innovation event with talks, culture spaces, networking, and brand showcases.',
            es: 'Un evento de emprendimiento e innovación con charlas, espacios culturales, networking y vitrinas de marca.',
        },
        price: { en: 'From $40.000', es: 'Desde $40.000' },
        featured: false,
        audience: { en: 'Founders and creatives', es: 'Emprendedores y creativos' },
    },
    {
        id: 'cali-fair',
        title: { en: 'Cali Fair', es: 'Feria de Cali' },
        cityId: 'cali',
        category: 'cultural-fair',
        date: { en: '25–30 Dec 2026', es: '25–30 dic 2026' },
        location: { en: 'Across the city', es: 'Toda la ciudad' },
        summary: {
            en: 'Cali’s legendary year-end fair with its grand salsa parade, orchestras, concerts, and a citywide festive atmosphere.',
            es: 'La legendaria feria de fin de año de Cali, con el Salsódromo, orquestas, conciertos y un ambiente festivo en toda la ciudad.',
        },
        price: { en: 'Free & ticketed events', es: 'Eventos gratuitos y con boleta' },
        featured: true,
        audience: { en: 'Salsa lovers and festival goers', es: 'Amantes de la salsa y de los festivales' },
    },
    {
        id: 'cali-salsa-juanchito',
        title: { en: 'Salsa Nights in Juanchito', es: 'Noches de Salsa en Juanchito' },
        cityId: 'cali',
        category: 'dance-experience',
        date: { en: 'Every Saturday', es: 'Todos los sábados' },
        location: { en: 'Juanchito', es: 'Juanchito' },
        summary: {
            en: 'A guided night through Cali’s most iconic salsa venues, with a beginner class before hitting the dance floor.',
            es: 'Una noche guiada por los lugares de salsa más icónicos de Cali, con una clase para principiantes antes de salir a la pista.',
        },
        price: { en: 'From $70.000', es: 'Desde $70.000' },
        featured: false,
        audience: { en: 'Dancers of every level', es: 'Bailarines de todos los niveles' },
    },
    {
        id: 'cartagena-sunset-sessions',
        title: { en: 'Sunset Beach Sessions', es: 'Sesiones de Atardecer en la Playa' },
        cityId: 'cartagena',
        category: 'music',
        date: { en: 'Every Sunday', es: 'Todos los domingos' },
        location: { en: 'Bocagrande', es: 'Bocagrande' },
        summary: {
            en: 'Live DJ sets and Caribbean sounds on the beach as the sun goes down over the bay.',
            es: 'Sets de DJ en vivo y sonidos caribeños en la playa mientras el sol se oculta sobre la bahía.',
        },
        price: { en: 'From $55.000', es: 'Desde $55.000' },
        featured: false,
        audience: { en: 'Beach and music lovers', es: 'Amantes de la playa y la música' },
    },
    {
        id: 'guatape-paddle-day',
        title: { en: 'Paddle & Viewpoint Day', es: 'Día de Kayak y Mirador' },
        cityId: 'guatape',
        category: 'adventure',
        date: { en: 'Weekends', es: 'Fines de semana' },
        location: { en: 'El Peñol', es: 'El Peñol' },
        summary: {
            en: 'A full-day experience combining kayaking on the reservoir with the climb to the famous rock viewpoint.',
            es: 'Una experiencia de día completo que combina kayak en el embalse con el ascenso al famoso mirador de la piedra.',
        },
        price: { en: 'From $95.000', es: 'Desde $95.000' },
        featured: false,
        audience: { en: 'Outdoor explorers', es: 'Exploradores al aire libre' },
    },
]

export function getEventById(id: string) {
    return events.find((event) => event.id === id)
}

export function getEventsByCity(cityId: string) {
    return events.filter((event) => event.cityId === cityId)
}

/** Destinations under review can be browsed, but their events cannot be added to a trip yet. */
export function isEventBookable(event: EventItem) {
    return getCityById(event.cityId)?.status !== 'under-review'
}
