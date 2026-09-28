import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { Survey } from '../../types'
import './SurveyCallout.css'

/** Prominent invitation to a survey, shown on the city page it belongs to. */
export function SurveyCallout({ survey }: { survey: Survey }) {
    const { t, localize } = useTranslation()
    const copy = t.survey.callout

    return (
        <section className="survey-callout surface-light accent-card" aria-labelledby="survey-callout-title">
            <div className="survey-callout-icon" aria-hidden="true">
                ✎
            </div>
            <div className="survey-callout-copy">
                <div className="survey-callout-meta">
                    <span className="eyebrow eyebrow-pill">{copy.eyebrow}</span>
                    <span className="survey-callout-duration">⏱ {copy.duration}</span>
                </div>
                <h2 id="survey-callout-title">{localize(survey.callout.title)}</h2>
                <p>{localize(survey.callout.description)}</p>
            </div>
            <Link to={`/surveys/${survey.id}`} className="primary-button survey-callout-cta">
                {copy.cta} →
            </Link>
        </section>
    )
}
