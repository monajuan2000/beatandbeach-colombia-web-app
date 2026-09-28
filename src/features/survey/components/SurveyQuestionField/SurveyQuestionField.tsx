import { useTranslation } from '@/i18n/context/LanguageContext'
import type { SurveyAnswer, SurveyOption } from '../../types'
import {
    fieldDomId,
    formatQuestionNumber,
    OTHER_OPTION_ID,
    type NumberedQuestion,
    type SurveyErrorKey,
} from '../../utils/surveyLogic'
import './SurveyQuestionField.css'

type SurveyQuestionFieldProps = {
    question: NumberedQuestion
    value: SurveyAnswer | undefined
    otherText: string
    error?: SurveyErrorKey
    likertScale: SurveyOption[]
    onChange: (value: SurveyAnswer) => void
    onOtherTextChange: (text: string) => void
}

export function SurveyQuestionField({
    question,
    value,
    otherText,
    error,
    likertScale,
    onChange,
    onOtherTextChange,
}: SurveyQuestionFieldProps) {
    const { t, localize } = useTranslation()
    const copy = t.survey.form
    const domId = fieldDomId(question.id)
    const errorId = `${domId}-error`
    const legendId = `${domId}-legend`
    const required = question.required ?? true

    const renderChoices = () => {
        if (question.type !== 'single' && question.type !== 'multiple') return null

        const isMultiple = question.type === 'multiple'
        const selected = Array.isArray(value) ? value : value ? [value] : []
        const options = question.options.map((option) => ({ id: option.id, text: localize(option.label) }))
        if (question.allowOther) options.push({ id: OTHER_OPTION_ID, text: copy.other })

        const toggle = (optionId: string) => {
            if (!isMultiple) return onChange(optionId)
            onChange(selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId])
        }

        return (
            <>
                {isMultiple ? <p className="survey-question-hint">{copy.selectAll}</p> : null}
                <div className="survey-options">
                    {options.map((option) => (
                        <label key={option.id} className="survey-option">
                            <input
                                type={isMultiple ? 'checkbox' : 'radio'}
                                name={question.id}
                                value={option.id}
                                checked={selected.includes(option.id)}
                                onChange={() => toggle(option.id)}
                            />
                            <span>{option.text}</span>
                        </label>
                    ))}
                </div>
                {selected.includes(OTHER_OPTION_ID) ? (
                    <input
                        type="text"
                        className="survey-text-input survey-other-input"
                        value={otherText}
                        placeholder={copy.otherPlaceholder}
                        aria-label={`${copy.other}: ${copy.otherPlaceholder}`}
                        onChange={(event) => onOtherTextChange(event.target.value)}
                    />
                ) : null}
            </>
        )
    }

    return (
        <fieldset
            id={domId}
            className={`survey-question ${error ? 'has-error' : ''}`}
            aria-describedby={error ? errorId : undefined}
        >
            <legend id={legendId} className="survey-question-legend">
                <span className="survey-question-number" aria-hidden="true">
                    {formatQuestionNumber(question.number)}
                </span>
                <span className="survey-question-text">
                    {localize(question.label)}
                    {required ? null : <small className="survey-question-optional">{copy.optional}</small>}
                </span>
            </legend>

            {renderChoices()}

            {question.type === 'likert' ? (
                <div className="survey-likert">
                    {likertScale.map((point) => (
                        <label key={point.id} className="survey-likert-point">
                            <input
                                type="radio"
                                name={question.id}
                                value={point.id}
                                checked={value === point.id}
                                onChange={() => onChange(point.id)}
                            />
                            <span className="survey-likert-value">{point.id}</span>
                            <span className="survey-likert-label">{localize(point.label)}</span>
                        </label>
                    ))}
                </div>
            ) : null}

            {question.type === 'text' ? (
                <textarea
                    className="survey-text-input survey-textarea"
                    rows={4}
                    value={typeof value === 'string' ? value : ''}
                    placeholder={copy.openPlaceholder}
                    aria-labelledby={legendId}
                    onChange={(event) => onChange(event.target.value)}
                />
            ) : null}

            {error ? (
                <p id={errorId} className="survey-error">
                    {error === 'other' ? t.survey.errors.other : t.survey.errors.required}
                </p>
            ) : null}
        </fieldset>
    )
}
