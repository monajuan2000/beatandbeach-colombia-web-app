import { useMemo, useState, type FocusEvent, type FormEvent } from 'react'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { Survey, SurveyAnswer, SurveyAnswers, SurveyParticipant } from '../../types'
import { submitSurvey } from '../../utils/submitSurvey'
import { hasSubmittedEmail, rememberSubmittedEmail } from '../../utils/submissionGuard'
import {
    buildSubmission,
    countAnswered,
    fieldDomId,
    isValidEmail,
    numberSections,
    PARTICIPANT_FIELDS,
    validateSurvey,
    type SurveyErrorKey,
} from '../../utils/surveyLogic'
import { SurveyNavActions } from '../SurveyNavActions/SurveyNavActions'
import { SurveyQuestionField } from '../SurveyQuestionField/SurveyQuestionField'
import './SurveyForm.css'

type SubmitStatus = 'idle' | 'sending' | 'error' | 'sent'

const emptyParticipant: SurveyParticipant = { fullName: '', email: '', profession: '', consent: false }

function focusField(fieldId: string) {
    const element = document.getElementById(fieldDomId(fieldId))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element.querySelector<HTMLElement>('input, textarea')?.focus({ preventScroll: true })
}

export function SurveyForm({ survey }: { survey: Survey }) {
    const { t, localize, language } = useTranslation()
    const copy = t.survey
    const sections = useMemo(() => numberSections(survey), [survey])
    const questions = useMemo(() => sections.flatMap((section) => section.questions), [sections])

    const [participant, setParticipant] = useState(emptyParticipant)
    const [answers, setAnswers] = useState<SurveyAnswers>({})
    const [otherTexts, setOtherTexts] = useState<Record<string, string>>({})
    const [errors, setErrors] = useState<Record<string, SurveyErrorKey>>({})
    const [honeypot, setHoneypot] = useState('')
    const [status, setStatus] = useState<SubmitStatus>('idle')

    const answeredCount = countAnswered(questions, answers)
    const errorCount = Object.keys(errors).length

    const clearError = (fieldId: string) => {
        setErrors((current) => {
            if (!(fieldId in current)) return current
            const next = { ...current }
            delete next[fieldId]
            return next
        })
    }

    const updateParticipant = <K extends keyof SurveyParticipant>(field: K, value: SurveyParticipant[K]) => {
        setParticipant((current) => ({ ...current, [field]: value }))
        clearError(field)
    }

    const updateAnswer = (questionId: string, value: SurveyAnswer) => {
        setAnswers((current) => ({ ...current, [questionId]: value }))
        clearError(questionId)
    }

    const updateOtherText = (questionId: string, text: string) => {
        setOtherTexts((current) => ({ ...current, [questionId]: text }))
        clearError(questionId)
    }

    // Warn right away instead of after the whole survey is filled in.
    const handleEmailBlur = async (event: FocusEvent<HTMLInputElement>) => {
        const input = event.currentTarget
        const email = input.value
        if (!isValidEmail(email) || !(await hasSubmittedEmail(survey.id, email))) return
        // Ignore the result if the email was edited while the check ran.
        if (input.value === email) setErrors((current) => ({ ...current, email: 'duplicateEmail' }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const nextErrors = validateSurvey(questions, answers, otherTexts, participant)
        setErrors(nextErrors)

        // Focus the first invalid field in page order: participant data first, then questions.
        const firstInvalid = [...PARTICIPANT_FIELDS, ...questions.map((question) => question.id)].find(
            (fieldId) => fieldId in nextErrors,
        )
        if (firstInvalid) {
            focusField(firstInvalid)
            return
        }

        // Mark as sending before the async duplicate check so a double click cannot submit twice.
        setStatus('sending')
        if (await hasSubmittedEmail(survey.id, participant.email)) {
            setStatus('idle')
            setErrors((current) => ({ ...current, email: 'duplicateEmail' }))
            focusField('email')
            return
        }

        try {
            await submitSurvey(buildSubmission(survey, questions, answers, otherTexts, participant, language), honeypot)
            await rememberSubmittedEmail(survey.id, participant.email)
            setStatus('sent')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    if (status === 'sent') {
        return (
            <section className="survey-success surface-light" aria-live="polite">
                <span className="card-tag">{copy.success.tag}</span>
                <h2>{copy.success.title(participant.fullName.trim().split(' ')[0])}</h2>
                <p>{copy.success.body}</p>
                <SurveyNavActions />
            </section>
        )
    }

    return (
        <form className="survey-form" onSubmit={handleSubmit} noValidate>
            {/* Spam trap: hidden from people and assistive tech; bots tend to fill it. */}
            <input
                type="text"
                name="_honey"
                className="survey-honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
            />

            <section className="survey-section surface-light">
                <header className="survey-section-header">
                    <h2>{copy.form.participantTitle}</h2>
                    <p>{copy.form.participantDescription}</p>
                </header>

                <div className="survey-participant-grid">
                    <div id={fieldDomId('fullName')} className="survey-field">
                        <label htmlFor="survey-full-name">{copy.form.fullName}</label>
                        <input
                            id="survey-full-name"
                            type="text"
                            className="survey-text-input"
                            autoComplete="name"
                            value={participant.fullName}
                            aria-invalid={Boolean(errors.fullName)}
                            onChange={(event) => updateParticipant('fullName', event.target.value)}
                        />
                        {errors.fullName ? <p className="survey-error">{copy.errors.fullName}</p> : null}
                    </div>

                    <div id={fieldDomId('email')} className="survey-field">
                        <label htmlFor="survey-email">{copy.form.email}</label>
                        <input
                            id="survey-email"
                            type="email"
                            className="survey-text-input"
                            autoComplete="email"
                            value={participant.email}
                            aria-invalid={Boolean(errors.email)}
                            onChange={(event) => updateParticipant('email', event.target.value)}
                            onBlur={handleEmailBlur}
                        />
                        {errors.email ? (
                            <p className="survey-error">
                                {errors.email === 'duplicateEmail' ? copy.errors.duplicateEmail : copy.errors.email}
                            </p>
                        ) : null}
                    </div>

                    <div id={fieldDomId('profession')} className="survey-field">
                        <label htmlFor="survey-profession">{copy.form.profession}</label>
                        <input
                            id="survey-profession"
                            type="text"
                            className="survey-text-input"
                            autoComplete="organization-title"
                            value={participant.profession}
                            aria-invalid={Boolean(errors.profession)}
                            onChange={(event) => updateParticipant('profession', event.target.value)}
                        />
                        {errors.profession ? <p className="survey-error">{copy.errors.profession}</p> : null}
                    </div>
                </div>

                <div id={fieldDomId('consent')} className="survey-consent">
                    <label>
                        <input
                            type="checkbox"
                            checked={participant.consent}
                            aria-invalid={Boolean(errors.consent)}
                            onChange={(event) => updateParticipant('consent', event.target.checked)}
                        />
                        <span>{copy.form.consent}</span>
                    </label>
                    {errors.consent ? <p className="survey-error">{copy.errors.consent}</p> : null}
                </div>
            </section>

            {sections.map((section, sectionIndex) => (
                <section key={section.id} className="survey-section surface-light">
                    <header className="survey-section-header">
                        <span className="eyebrow eyebrow-pill">{copy.form.sectionLabel(sectionIndex + 1)}</span>
                        <h2>{localize(section.title)}</h2>
                        {section.description ? <p>{localize(section.description)}</p> : null}
                    </header>

                    {section.questions.map((question) => (
                        <SurveyQuestionField
                            key={question.id}
                            question={question}
                            value={answers[question.id]}
                            otherText={otherTexts[question.id] ?? ''}
                            error={errors[question.id]}
                            likertScale={survey.likertScale}
                            onChange={(value) => updateAnswer(question.id, value)}
                            onOtherTextChange={(text) => updateOtherText(question.id, text)}
                        />
                    ))}
                </section>
            ))}

            <div className="survey-submit-bar">
                <div className="survey-progress">
                    <span>{copy.form.progress(answeredCount, questions.length)}</span>
                    <div
                        className="survey-progress-track"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={questions.length}
                        aria-valuenow={answeredCount}
                        aria-label={copy.form.progress(answeredCount, questions.length)}
                    >
                        <div
                            className="survey-progress-fill"
                            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                        />
                    </div>
                    {errorCount > 0 ? (
                        <p className="survey-submit-message is-error" role="alert">
                            {copy.errors.summary(errorCount)}
                        </p>
                    ) : null}
                    {status === 'error' ? (
                        <p className="survey-submit-message is-error" role="alert">
                            {copy.errors.submit}
                        </p>
                    ) : null}
                </div>
                <button type="submit" className="primary-button" disabled={status === 'sending'}>
                    {status === 'sending' ? copy.form.sending : copy.form.submit}
                </button>
            </div>
        </form>
    )
}
