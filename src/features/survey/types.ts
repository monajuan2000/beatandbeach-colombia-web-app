import type { LocalizedText } from '@/i18n/types'

export type SurveyOption = {
    id: string
    label: LocalizedText
}

type QuestionBase = {
    id: string
    label: LocalizedText
    /** Defaults to true. */
    required?: boolean
}

export type SingleChoiceQuestion = QuestionBase & {
    type: 'single'
    options: SurveyOption[]
    /** Adds an "Other" option with a free-text field. */
    allowOther?: boolean
}

export type MultipleChoiceQuestion = QuestionBase & {
    type: 'multiple'
    options: SurveyOption[]
    allowOther?: boolean
}

/** Statement rated on the survey's 1–5 Likert scale. */
export type LikertQuestion = QuestionBase & {
    type: 'likert'
}

export type OpenQuestion = QuestionBase & {
    type: 'text'
}

export type SurveyQuestion = SingleChoiceQuestion | MultipleChoiceQuestion | LikertQuestion | OpenQuestion

export type SurveySection = {
    id: string
    title: LocalizedText
    description?: LocalizedText
    questions: SurveyQuestion[]
}

export type Survey = {
    id: string
    /** City page that promotes this survey. */
    cityId: string
    title: LocalizedText
    researchTitle: LocalizedText
    intro: LocalizedText[]
    /** Short pitch shown on the city page callout. */
    callout: {
        title: LocalizedText
        description: LocalizedText
    }
    /** Subject of the email that delivers each response. */
    emailSubject: string
    likertScale: SurveyOption[]
    sections: SurveySection[]
}

/** Value of a choice or Likert answer is the option id; multiple choice keeps a list of ids. */
export type SurveyAnswer = string | string[]

export type SurveyAnswers = Record<string, SurveyAnswer>

export type SurveyParticipant = {
    fullName: string
    email: string
    profession: string
    consent: boolean
}
