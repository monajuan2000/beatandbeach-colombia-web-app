import type { Survey } from '../types'

export const guatapeCulturalSurvey: Survey = {
    id: 'guatape-cultural-interpretation',
    cityId: 'guatape',
    title: {
        en: 'Visitor perception of the tourist interpretation of Guatapé’s cultural attractions',
        es: 'Percepción de los visitantes sobre la interpretación turística de los atractivos culturales de Guatapé, Antioquia',
    },
    researchTitle: {
        en: 'Strengthening the tourist interpretation of the cultural attractions of Guatapé, Antioquia, to improve the visitor experience',
        es: 'Fortalecimiento de la interpretación turística de los atractivos culturales de Guatapé, Antioquia, para mejorar la experiencia del visitante',
    },
    intro: [
        {
            en: 'This questionnaire aims to understand how visitors perceive the information, interpretation, and value of the cultural attractions of Guatapé, Antioquia. The information collected will be used exclusively for academic purposes.',
            es: 'El presente cuestionario tiene como objetivo conocer la percepción de los visitantes sobre la información, interpretación y valoración de los atractivos culturales de Guatapé, Antioquia. La información recopilada será utilizada exclusivamente con fines académicos.',
        },
        {
            en: 'Your personal data will be handled confidentially and results will be analyzed in aggregate. There are no right or wrong answers: please respond based on your experience during your visit. Estimated time: 8–10 minutes.',
            es: 'Sus datos personales serán tratados de forma confidencial y los resultados se analizarán de manera general. No existen respuestas correctas o incorrectas: responda de acuerdo con su experiencia durante la visita. Tiempo estimado: 8 a 10 minutos.',
        },
    ],
    callout: {
        title: {
            en: 'Help us improve cultural tourism in Guatapé',
            es: 'Ayúdanos a mejorar el turismo cultural en Guatapé',
        },
        description: {
            en: 'Share your experience in a short academic survey about the history, culture, and information you found during your visit.',
            es: 'Comparte tu experiencia en una breve encuesta académica sobre la historia, la cultura y la información que encontraste durante tu visita.',
        },
    },
    emailSubject: 'Nueva respuesta · Interpretación turística de Guatapé',
    likertScale: [
        { id: '1', label: { en: 'Strongly disagree', es: 'Muy en desacuerdo' } },
        { id: '2', label: { en: 'Disagree', es: 'En desacuerdo' } },
        { id: '3', label: { en: 'Neither agree nor disagree', es: 'Ni de acuerdo ni en desacuerdo' } },
        { id: '4', label: { en: 'Agree', es: 'De acuerdo' } },
        { id: '5', label: { en: 'Strongly agree', es: 'Muy de acuerdo' } },
    ],
    sections: [
        {
            id: 'visitor-profile',
            title: { en: 'Visitor information', es: 'Información general del visitante' },
            questions: [
                {
                    id: 'first-visit',
                    type: 'single',
                    label: { en: 'Is this your first time visiting Guatapé?', es: '¿Es la primera vez que visita Guatapé?' },
                    options: [
                        { id: 'yes', label: { en: 'Yes', es: 'Sí' } },
                        { id: 'no', label: { en: 'No', es: 'No' } },
                    ],
                },
                {
                    id: 'origin',
                    type: 'single',
                    label: { en: 'Where are you from?', es: '¿Cuál es su lugar de procedencia?' },
                    allowOther: true,
                    options: [
                        { id: 'medellin', label: { en: 'Medellín', es: 'Medellín' } },
                        { id: 'antioquia', label: { en: 'Another municipality in Antioquia', es: 'Otro municipio de Antioquia' } },
                        { id: 'colombia', label: { en: 'Another department of Colombia', es: 'Otro departamento de Colombia' } },
                        { id: 'abroad', label: { en: 'Another country', es: 'Otro país' } },
                    ],
                },
                {
                    id: 'age-range',
                    type: 'single',
                    label: { en: 'What is your age range?', es: '¿Cuál es su rango de edad?' },
                    options: [
                        { id: 'under-18', label: { en: 'Under 18', es: 'Menor de 18 años' } },
                        { id: '18-25', label: { en: '18–25', es: '18–25 años' } },
                        { id: '26-35', label: { en: '26–35', es: '26–35 años' } },
                        { id: '36-45', label: { en: '36–45', es: '36–45 años' } },
                        { id: '46-55', label: { en: '46–55', es: '46–55 años' } },
                        { id: '56-plus', label: { en: '56 or older', es: '56 años o más' } },
                    ],
                },
                {
                    id: 'companions',
                    type: 'single',
                    label: { en: 'Who are you mainly visiting Guatapé with?', es: '¿Con quién realiza principalmente su visita a Guatapé?' },
                    allowOther: true,
                    options: [
                        { id: 'alone', label: { en: 'Alone', es: 'Solo/a' } },
                        { id: 'family', label: { en: 'Family', es: 'Familia' } },
                        { id: 'partner', label: { en: 'Partner', es: 'Pareja' } },
                        { id: 'friends', label: { en: 'Friends', es: 'Amigos' } },
                        { id: 'tour-group', label: { en: 'Tour group', es: 'Grupo turístico' } },
                        { id: 'academic-group', label: { en: 'Academic group', es: 'Grupo académico' } },
                    ],
                },
                {
                    id: 'visit-reason',
                    type: 'single',
                    label: { en: 'What is the main reason for your visit to Guatapé?', es: '¿Cuál es el principal motivo de su visita a Guatapé?' },
                    allowOther: true,
                    options: [
                        { id: 'recreation', label: { en: 'Tourism and recreation', es: 'Turismo y recreación' } },
                        { id: 'culture', label: { en: 'Discover the culture and heritage', es: 'Conocer la cultura y el patrimonio' } },
                        { id: 'nature', label: { en: 'Nature and landscapes', es: 'Naturaleza y paisajes' } },
                        { id: 'gastronomy', label: { en: 'Gastronomy', es: 'Gastronomía' } },
                        { id: 'water-activities', label: { en: 'Water activities', es: 'Actividades acuáticas' } },
                        { id: 'visiting-people', label: { en: 'Visiting family or friends', es: 'Visitar familiares o amigos' } },
                    ],
                },
            ],
        },
        {
            id: 'cultural-attractions',
            title: { en: 'Knowledge of the cultural attractions', es: 'Conocimiento y visita de los atractivos culturales' },
            questions: [
                {
                    id: 'visited-attractions',
                    type: 'multiple',
                    label: {
                        en: 'Which cultural attractions of Guatapé have you visited during your trip?',
                        es: '¿Qué atractivos culturales de Guatapé ha visitado durante su viaje?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'zocalos', label: { en: 'Zócalos of Guatapé', es: 'Zócalos de Guatapé' } },
                        { id: 'calle-del-recuerdo', label: { en: 'Calle del Recuerdo', es: 'Calle del Recuerdo' } },
                        { id: 'main-square', label: { en: 'Main square', es: 'Parque principal' } },
                        { id: 'carmen-church', label: { en: 'Church of Our Lady of Carmen', es: 'Iglesia de Nuestra Señora del Carmen' } },
                        { id: 'history-museum', label: { en: 'Guatapé History Museum', es: 'Museo Histórico de Guatapé' } },
                        { id: 'boardwalk', label: { en: 'Malecón (lakeside boardwalk)', es: 'Malecón' } },
                        { id: 'zocalos-square', label: { en: 'Plazoleta de los Zócalos', es: 'Plazoleta de los Zócalos' } },
                        { id: 'traditional-architecture', label: { en: 'Traditional architecture and houses', es: 'Arquitectura y viviendas tradicionales' } },
                    ],
                },
                {
                    id: 'prior-knowledge',
                    type: 'single',
                    label: {
                        en: 'Before visiting Guatapé, how much did you know about its cultural heritage?',
                        es: 'Antes de visitar Guatapé, ¿qué tanto conocía sobre su patrimonio cultural?',
                    },
                    options: [
                        { id: 'none', label: { en: 'Nothing', es: 'Nada' } },
                        { id: 'little', label: { en: 'A little', es: 'Poco' } },
                        { id: 'some', label: { en: 'Some', es: 'Algo' } },
                        { id: 'quite-a-lot', label: { en: 'Quite a lot', es: 'Bastante' } },
                        { id: 'a-lot', label: { en: 'A lot', es: 'Mucho' } },
                    ],
                },
                {
                    id: 'prior-info-source',
                    type: 'single',
                    label: {
                        en: 'Before your visit, where did you mainly get information about Guatapé’s cultural attractions?',
                        es: '¿Por qué medio obtuvo principalmente información sobre los atractivos culturales de Guatapé antes de su visita?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'social-media', label: { en: 'Social media', es: 'Redes sociales' } },
                        { id: 'websites', label: { en: 'Websites', es: 'Páginas web' } },
                        { id: 'travel-blogs', label: { en: 'Blogs or travel sites', es: 'Blogs o sitios de viajes' } },
                        { id: 'family-friends', label: { en: 'Family or friends', es: 'Familiares o amigos' } },
                        { id: 'agencies-guides', label: { en: 'Travel agencies or tour guides', es: 'Agencias o guías turísticos' } },
                        { id: 'academic-material', label: { en: 'Academic material', es: 'Material académico' } },
                        { id: 'no-prior-info', label: { en: 'I didn’t look for information beforehand', es: 'No obtuve información previamente' } },
                    ],
                },
                {
                    id: 'received-info',
                    type: 'single',
                    label: {
                        en: 'During your visit, did you receive information about the history and culture of the places you visited?',
                        es: 'Durante su visita, ¿recibió información sobre la historia y cultura de los lugares que visitó?',
                    },
                    options: [
                        { id: 'yes', label: { en: 'Yes', es: 'Sí' } },
                        { id: 'no', label: { en: 'No', es: 'No' } },
                        { id: 'not-sure', label: { en: 'I’m not sure', es: 'No estoy seguro/a' } },
                    ],
                },
                {
                    id: 'visit-info-medium',
                    type: 'single',
                    label: {
                        en: 'What did you mainly use to learn about the history and features of the cultural attractions?',
                        es: '¿Qué medio utilizó principalmente para conocer la historia y características de los atractivos culturales?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'tour-guide', label: { en: 'Tour guide', es: 'Guía turístico' } },
                        { id: 'signage', label: { en: 'Tourist signage', es: 'Señalización turística' } },
                        { id: 'brochures-maps', label: { en: 'Brochures or maps', es: 'Folletos o mapas' } },
                        { id: 'qr-codes', label: { en: 'QR codes', es: 'Código QR' } },
                        { id: 'mobile-apps', label: { en: 'Mobile apps', es: 'Aplicaciones móviles' } },
                        { id: 'social-media', label: { en: 'Social media', es: 'Redes sociales' } },
                        { id: 'locals', label: { en: 'Local residents', es: 'Habitantes locales' } },
                        { id: 'no-info', label: { en: 'I didn’t receive information', es: 'No recibí información' } },
                    ],
                },
            ],
        },
        {
            id: 'interpretation-quality',
            title: { en: 'Quality of the tourist interpretation', es: 'Calidad de la interpretación turística' },
            description: {
                en: 'Rate how much you agree with each statement.',
                es: 'Indique qué tan de acuerdo está con cada afirmación.',
            },
            questions: [
                {
                    id: 'info-is-clear',
                    type: 'likert',
                    label: {
                        en: 'The tourist information available about Guatapé’s cultural attractions is clear.',
                        es: 'La información turística disponible sobre los atractivos culturales de Guatapé es clara.',
                    },
                },
                {
                    id: 'info-easy-to-understand',
                    type: 'likert',
                    label: {
                        en: 'The information I received during my visit was easy to understand.',
                        es: 'La información que recibí durante mi visita fue fácil de comprender.',
                    },
                },
                {
                    id: 'info-explains-history',
                    type: 'likert',
                    label: {
                        en: 'The tourist information adequately explains the history of Guatapé.',
                        es: 'La información turística explica adecuadamente la historia de Guatapé.',
                    },
                },
                {
                    id: 'info-explains-zocalos',
                    type: 'likert',
                    label: {
                        en: 'The information helps me understand the meaning of the zócalos and other cultural elements of the town.',
                        es: 'La información permite comprender el significado de los zócalos y otros elementos culturales del municipio.',
                    },
                },
                {
                    id: 'info-shows-traditions',
                    type: 'likert',
                    label: {
                        en: 'The tourist information helps me learn about the traditions and customs of the local community.',
                        es: 'La información turística permite conocer las tradiciones y costumbres de la comunidad local.',
                    },
                },
                {
                    id: 'resources-attractive',
                    type: 'likert',
                    label: {
                        en: 'The resources used to provide tourist information are attractive and eye-catching.',
                        es: 'Los recursos utilizados para brindar información turística son atractivos y llamativos.',
                    },
                },
                {
                    id: 'signage-helps',
                    type: 'likert',
                    label: {
                        en: 'The signage at the cultural attractions makes them easier to interpret.',
                        es: 'La señalización de los atractivos culturales facilita su interpretación.',
                    },
                },
                {
                    id: 'info-sparks-interest',
                    type: 'likert',
                    label: {
                        en: 'The available information makes me want to learn more about Guatapé’s culture.',
                        es: 'La información disponible despierta interés por conocer más sobre la cultura de Guatapé.',
                    },
                },
                {
                    id: 'info-builds-respect',
                    type: 'likert',
                    label: {
                        en: 'The tourist information helps me value and respect the town’s cultural heritage.',
                        es: 'La información turística contribuye a valorar y respetar el patrimonio cultural del municipio.',
                    },
                },
                {
                    id: 'represents-identity',
                    type: 'likert',
                    label: {
                        en: 'The current tourist interpretation adequately represents Guatapé’s cultural identity.',
                        es: 'Considero que la interpretación turística actual representa adecuadamente la identidad cultural de Guatapé.',
                    },
                },
            ],
        },
        {
            id: 'visitor-experience',
            title: { en: 'Visitor experience', es: 'Experiencia del visitante' },
            description: {
                en: 'Rate how much you agree with each statement.',
                es: 'Indique qué tan de acuerdo está con cada afirmación.',
            },
            questions: [
                {
                    id: 'improved-experience',
                    type: 'likert',
                    label: {
                        en: 'The cultural information I received improved my experience during the visit.',
                        es: 'La información cultural que recibí mejoró mi experiencia durante la visita.',
                    },
                },
                {
                    id: 'history-made-meaningful',
                    type: 'likert',
                    label: {
                        en: 'Knowing the history of the places made my visit more meaningful.',
                        es: 'Conocer la historia de los lugares hizo que mi visita fuera más significativa.',
                    },
                },
                {
                    id: 'increased-interest',
                    type: 'likert',
                    label: {
                        en: 'The tourist interpretation increased my interest in Guatapé’s cultural attractions.',
                        es: 'La interpretación turística aumentó mi interés por los atractivos culturales de Guatapé.',
                    },
                },
                {
                    id: 'values-heritage-more',
                    type: 'likert',
                    label: {
                        en: 'After receiving information about the cultural heritage, I value it more.',
                        es: 'Después de recibir información sobre el patrimonio cultural, considero que lo valoro más.',
                    },
                },
                {
                    id: 'met-expectations',
                    type: 'likert',
                    label: {
                        en: 'The experience of getting to know the local culture met my expectations.',
                        es: 'La experiencia de conocer la cultura local cumplió mis expectativas.',
                    },
                },
                {
                    id: 'better-interpretation-helps',
                    type: 'likert',
                    label: {
                        en: 'Better tourist interpretation could enrich the experience of future visitors.',
                        es: 'Considero que una mejor interpretación turística podría enriquecer la experiencia de futuros visitantes.',
                    },
                },
            ],
        },
        {
            id: 'improvement-proposals',
            title: { en: 'Proposals for improvement', es: 'Propuestas de fortalecimiento' },
            questions: [
                {
                    id: 'preferred-resources',
                    type: 'multiple',
                    label: {
                        en: 'Which resources do you consider most suitable to improve the interpretation of Guatapé’s cultural attractions?',
                        es: '¿Qué recursos considera más adecuados para mejorar la interpretación de los atractivos culturales de Guatapé?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'interpretive-signage', label: { en: 'Interpretive signage', es: 'Señalización interpretativa' } },
                        { id: 'qr-codes', label: { en: 'QR codes', es: 'Códigos QR' } },
                        { id: 'mobile-apps', label: { en: 'Mobile apps', es: 'Aplicaciones móviles' } },
                        { id: 'audio-guides', label: { en: 'Audio guides', es: 'Audioguías' } },
                        { id: 'videos', label: { en: 'Informational videos', es: 'Videos informativos' } },
                        { id: 'maps', label: { en: 'Tourist maps', es: 'Mapas turísticos' } },
                        { id: 'brochures', label: { en: 'Brochures', es: 'Folletos' } },
                        { id: 'guided-tours', label: { en: 'Guided tours', es: 'Visitas guiadas' } },
                        { id: 'augmented-reality', label: { en: 'Augmented reality', es: 'Realidad aumentada' } },
                        { id: 'info-panels', label: { en: 'Information panels', es: 'Paneles informativos' } },
                    ],
                },
                {
                    id: 'desired-info',
                    type: 'multiple',
                    label: {
                        en: 'What kind of information would you like to find more often at the cultural attractions?',
                        es: '¿Qué tipo de información le gustaría encontrar con mayor frecuencia en los atractivos culturales?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'place-history', label: { en: 'History of the place', es: 'Historia del lugar' } },
                        { id: 'stories-legends', label: { en: 'Stories and legends', es: 'Historias y leyendas' } },
                        { id: 'zocalos-meaning', label: { en: 'Meaning of the zócalos', es: 'Significado de los zócalos' } },
                        { id: 'traditions', label: { en: 'Traditions and customs', es: 'Tradiciones y costumbres' } },
                        { id: 'architecture', label: { en: 'Architecture', es: 'Arquitectura' } },
                        { id: 'gastronomy', label: { en: 'Gastronomy', es: 'Gastronomía' } },
                        { id: 'historical-figures', label: { en: 'Historical figures', es: 'Personajes históricos' } },
                        { id: 'local-community', label: { en: 'The local community', es: 'Información sobre la comunidad local' } },
                        { id: 'heritage-conservation', label: { en: 'Heritage conservation', es: 'Conservación del patrimonio' } },
                    ],
                },
                {
                    id: 'main-improvement',
                    type: 'single',
                    label: {
                        en: 'What aspect of Guatapé’s tourist interpretation should be improved first?',
                        es: '¿Qué aspecto considera que debería mejorarse principalmente en la interpretación turística de Guatapé?',
                    },
                    allowOther: true,
                    options: [
                        { id: 'amount', label: { en: 'Amount of information available', es: 'Cantidad de información disponible' } },
                        { id: 'clarity', label: { en: 'Clarity of the information', es: 'Claridad de la información' } },
                        { id: 'signage', label: { en: 'Signage', es: 'Señalización' } },
                        { id: 'accessibility', label: { en: 'Accessibility of the information', es: 'Accesibilidad de la información' } },
                        { id: 'technology', label: { en: 'Use of technology', es: 'Uso de tecnología' } },
                        { id: 'historical-info', label: { en: 'Historical information', es: 'Información histórica' } },
                        { id: 'community', label: { en: 'Participation of the local community', es: 'Participación de la comunidad local' } },
                        { id: 'guide-training', label: { en: 'Training of tour guides', es: 'Capacitación de los guías' } },
                    ],
                },
                {
                    id: 'recommendation',
                    type: 'text',
                    required: false,
                    label: {
                        en: 'Based on your experience, what would you recommend to improve the tourist interpretation of Guatapé’s cultural attractions and, as a result, the visitor experience?',
                        es: 'Desde su experiencia, ¿qué recomendación daría para mejorar la interpretación turística de los atractivos culturales de Guatapé y, en consecuencia, mejorar la experiencia de los visitantes?',
                    },
                },
            ],
        },
    ],
}
