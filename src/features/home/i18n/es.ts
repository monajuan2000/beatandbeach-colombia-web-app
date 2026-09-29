import type { HomeMessages } from './en'

export const homeEs: HomeMessages = {
    sections: {
        discover: 'Descubre',
        featured: 'Destacados',
        about: 'Nosotros',
        destinations: 'Destinos',
        events: 'Eventos',
        whyUs: 'Por qué elegirnos',
    },
    hero: {
        eyebrow: 'Vive experiencias inolvidables',
        title: {
            lead: 'Descubre los mejores eventos en los destinos más icónicos de ',
            highlight: 'Colombia',
            end: '.',
        },
        description:
            'Vive la energía de Medellín, el encanto de Cartagena y la belleza natural de Guatapé con experiencias seleccionadas para viajeros y locales.',
        exploreEvents: 'Explorar eventos',
        viewCities: 'Ver ciudades',
        statsAriaLabel: 'Estadísticas principales',
        stats: {
            events: 'Eventos',
            cities: 'Ciudades',
            rating: 'Calificación de viajeros',
        },
        visualAriaLabel: 'Resumen de destinos destacados',
        destinationTitle: 'Colombia',
        destinationDescription: 'Energía urbana, encanto caribeño y escapadas de montaña.',
        destinationsAriaLabel: 'Lista de destinos destacados',
        chooseDestination: 'Elige tu destino',
        nextEvent: {
            label: 'Próximo',
            startsIn: (days: number) => (days === 0 ? 'empieza hoy' : `en ${days} ${days === 1 ? 'día' : 'días'}`),
        },
        scrollCue: 'Desliza para descubrir',
    },
    highlightedHeading: {
        ariaLabel: 'Encabezado de eventos populares',
        eyebrow: 'Temporada 2026',
        title: 'Los eventos más inolvidables de Colombia',
        subtitle: 'Festivales, cultura y paisajes que vale la pena vivir al menos una vez.',
    },
    wonders: {
        ariaLabel: 'Banner de lo mejor de Colombia',
        eyebrow: 'Un país de contrastes',
        title: 'Maravillas de Colombia',
        description:
            'Desde la costa Caribe hasta los Andes y el Pacífico, Colombia ofrece una rica mezcla de cultura, color y paisajes inolvidables en cada región.',
        regionsAriaLabel: 'Regiones de Colombia',
        regions: ['Costa Caribe', 'Andes', 'Pacífico', 'Amazonía'],
    },
    spotlight: {
        ariaLabel: 'Evento destacado',
        eyebrow: 'Evento popular',
        description: (city: string) =>
            `Vive el fin de semana de festival más electrizante de la ciudad, con artistas electrónicos de talla mundial, escenarios inmersivos y un ambiente nocturno único en ${city}.`,
        moreIn: (city: string) => `Más en ${city}`,
        countdown: {
            label: 'Comienza en',
            ended: 'Está pasando ahora 🎉',
            units: { days: 'Días', hours: 'Horas', minutes: 'Min', seconds: 'Seg' },
        },
        factsAriaLabel: 'Datos del evento',
        facts: {
            date: 'Fecha',
            venue: 'Lugar',
            tickets: 'Boletas',
            genre: 'Género',
        },
    },
    projects: {
        ariaLabel: 'Proyectos actuales',
        eyebrow: 'Proyectos actuales',
        title: 'Proyectos que estoy construyendo ahora.',
    },
    about: {
        eyebrow: 'Sobre nosotros',
        title: 'Convertimos Colombia en una historia de viaje inolvidable.',
        paragraphs: [
            'Beat & Beach Colombia es una marca de turismo creada para conectar a los viajeros con el ritmo, la cultura y la belleza de los destinos más icónicos del país. Diseñamos experiencias que combinan identidad local, hospitalidad premium y momentos auténticos en Medellín, Cartagena y Guatapé.',
            'Nuestra misión es simple: ayudar a los visitantes a descubrir el alma de Colombia a través de eventos cuidadosamente seleccionados, experiencias culturales, energía costera y escapadas escénicas que se sienten emocionantes y profundamente locales.',
        ],
        points: [
            { title: 'Viajes a la medida', description: 'Experiencias pensadas para cada destino.' },
            { title: 'Identidad local', description: 'Momentos auténticos moldeados por la cultura y la comunidad de cada región.' },
            { title: 'Eventos memorables', description: 'Música, cultura, vida nocturna y aventura en un solo itinerario.' },
            { title: 'Servicio premium', description: 'Acompañamiento profesional para viajeros que buscan calidad y comodidad.' },
        ],
    },
    highlights: {
        eyebrow: 'Por qué elegirnos',
        title: 'Pensado para viajeros que quieren más que un itinerario genérico.',
    },
}
