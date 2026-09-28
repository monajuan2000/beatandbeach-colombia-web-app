import type { Language } from '@/i18n/config'
import type { Survey, SurveyAnswers, SurveyParticipant, SurveyQuestion, SurveySection } from '../types'

/** Option id used for the free-text "Other" choice. */
export const OTHER_OPTION_ID = 'other'

export type SurveyErrorKey = 'required' | 'other' | 'fullName' | 'profession' | 'consent'

/** Field ids for participant data; question fields use the question id. */
export const PARTICIPANT_FIELDS = ['fullName', 'profession', 'consent'] as const

export type NumberedQuestion = SurveyQuestion & { number: number }

export type NumberedSection = Omit<SurveySection, 'questions'> & { questions: NumberedQuestion[] }

/** Sections with questions numbered continuously across the whole survey (1, 2, 3…). */
export function numberSections(survey: Survey): NumberedSection[] {
    let number = 0
    return survey.sections.map((section) => ({
        ...section,
        questions: section.questions.map((question) => ({ ...question, number: ++number })),
    }))
}

export function fieldDomId(fieldId: string) {
    return `survey-field-${fieldId}`
}

export function formatQuestionNumber(number: number) {
    return String(number).padStart(2, '0')
}

function hasAnswer(question: SurveyQuestion, answers: SurveyAnswers) {
    const answer = answers[question.id]
    if (Array.isArray(answer)) return answer.length > 0
    return typeof answer === 'string' && answer.trim().length > 0
}

function picksOther(question: SurveyQuestion, answers: SurveyAnswers) {
    const answer = answers[question.id]
    return Array.isArray(answer) ? answer.includes(OTHER_OPTION_ID) : answer === OTHER_OPTION_ID
}

export function countAnswered(questions: SurveyQuestion[], answers: SurveyAnswers) {
    return questions.filter((question) => hasAnswer(question, answers)).length
}

export function validateSurvey(
    questions: SurveyQuestion[],
    answers: SurveyAnswers,
    otherTexts: Record<string, string>,
    participant: SurveyParticipant,
): Record<string, SurveyErrorKey> {
    const errors: Record<string, SurveyErrorKey> = {}

    if (!participant.fullName.trim()) errors.fullName = 'fullName'
    if (!participant.profession.trim()) errors.profession = 'profession'
    if (!participant.consent) errors.consent = 'consent'

    for (const question of questions) {
        const required = question.required ?? true

        if (required && !hasAnswer(question, answers)) {
            errors[question.id] = 'required'
        } else if (picksOther(question, answers) && !otherTexts[question.id]?.trim()) {
            errors[question.id] = 'other'
        }
    }

    return errors
}

const SPANISH_OTHER_LABEL = 'Otro'

function describeAnswer(
    survey: Survey,
    question: SurveyQuestion,
    answers: SurveyAnswers,
    otherTexts: Record<string, string>,
) {
    const answer = answers[question.id]

    if (question.type === 'text') return typeof answer === 'string' && answer.trim() ? answer.trim() : '—'

    if (question.type === 'likert') {
        const point = survey.likertScale.find((option) => option.id === answer)
        return point ? `${point.id} - ${point.label.es}` : '—'
    }

    const ids = Array.isArray(answer) ? answer : answer ? [answer] : []
    const labels = ids.map((id) => {
        if (id === OTHER_OPTION_ID) return `${SPANISH_OTHER_LABEL}: ${otherTexts[question.id]?.trim() ?? ''}`
        return question.options.find((option) => option.id === id)?.label.es ?? id
    })

    return labels.length > 0 ? labels.join(', ') : '—'
}

/**
 * Builds the email payload. Answers are always written in Spanish (the research language),
 * whatever language the visitor used, so every response reads the same.
 */
export function buildSubmission(
    survey: Survey,
    questions: NumberedQuestion[],
    answers: SurveyAnswers,
    otherTexts: Record<string, string>,
    participant: SurveyParticipant,
    language: Language,
): Record<string, string> {
    const payload: Record<string, string> = {
        _subject: survey.emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Nombre completo': participant.fullName.trim(),
        'Profesión u ocupación': participant.profession.trim(),
        'Autorización de datos': participant.consent ? 'Sí' : 'No',
        'Idioma del formulario': language === 'es' ? 'Español' : 'Inglés',
        'Fecha de envío': new Date().toLocaleString('es-CO'),
    }

    for (const question of questions) {
        const key = `P${formatQuestionNumber(question.number)}. ${question.label.es}`
        payload[key] = describeAnswer(survey, question, answers, otherTexts)
    }

    return payload
}
