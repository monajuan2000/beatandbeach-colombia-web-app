import type { SurveyMessages } from './en'

export const surveyEs: SurveyMessages = {
    emailSubmission: {
        subject: 'Nueva respuesta · Interpretación turística de Guatapé',
        other: 'Otro',
        yes: 'Sí',
        no: 'No',
        languageValue: 'Español',
        fields: {
            fullName: 'Nombre del participante',
            email: 'Correo del participante',
            profession: 'Profesión u ocupación',
            consent: 'Autorización del tratamiento de datos',
            language: 'Idioma del formulario',
            submittedAt: 'Fecha de envío',
        },
    },
    callout: {
        eyebrow: 'Encuesta académica',
        duration: '8–10 min',
        cta: 'Responder la encuesta',
    },
    page: {
        eyebrow: 'Investigación académica',
        researchLabel: 'Investigación:',
    },
    form: {
        participantTitle: 'Datos del participante',
        participantDescription: 'Sus datos personales serán tratados de forma confidencial.',
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        profession: 'Profesión u ocupación',
        consent:
            'Autorizo el tratamiento de mis datos personales con fines exclusivamente académicos, de acuerdo con la Ley 1581 de 2012, y confirmo que soy mayor de edad o cuento con la autorización de mi acudiente.',
        sectionLabel: (number: number) => `Bloque ${number}`,
        required: 'Obligatoria',
        optional: 'Opcional',
        other: 'Otro',
        otherPlaceholder: '¿Cuál?',
        selectAll: 'Puede seleccionar varias opciones.',
        openPlaceholder: 'Escriba aquí su respuesta…',
        progress: (answered: number, total: number) => `${answered} de ${total} preguntas respondidas`,
        submit: 'Enviar mis respuestas',
        sending: 'Enviando…',
    },
    errors: {
        required: 'Por favor responda esta pregunta.',
        other: 'Por favor especifique su respuesta.',
        fullName: 'Por favor escriba su nombre completo.',
        email: 'Por favor escriba un correo electrónico válido.',
        duplicateEmail: 'Este correo ya envió esta encuesta desde este navegador.',
        profession: 'Por favor escriba su profesión u ocupación.',
        consent: 'Debe aceptar la política de datos para continuar.',
        summary: (count: number) =>
            `${count} ${count === 1 ? 'campo necesita' : 'campos necesitan'} su atención antes de enviar.`,
        submit: 'No pudimos enviar sus respuestas. Revise su conexión e intente de nuevo.',
    },
    success: {
        tag: 'Respuestas enviadas',
        title: (firstName: string) => `¡Gracias, ${firstName}!`,
        body: 'Sus respuestas se enviaron correctamente y ayudarán a fortalecer la interpretación cultural de Guatapé.',
    },
}
