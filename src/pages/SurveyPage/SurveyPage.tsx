import { Navigate, useParams } from 'react-router-dom'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SurveyForm } from '@/features/survey/components/SurveyForm/SurveyForm'
import { SurveyNavActions } from '@/features/survey/components/SurveyNavActions/SurveyNavActions'
import { getSurveyById } from '@/features/survey/data/surveys'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './SurveyPage.css'

export function SurveyPage() {
    const { surveyId } = useParams()
    const survey = getSurveyById(surveyId)
    const { t, localize } = useTranslation()

    if (!survey) return <Navigate to="/" replace />

    return (
        <div className="survey-page">
            <SiteHeader />

            <header className="survey-hero">
                <span className="eyebrow">{t.survey.page.eyebrow}</span>
                <h1>{localize(survey.title)}</h1>
                <p className="survey-hero-research">
                    <strong>{t.survey.page.researchLabel}</strong> “{localize(survey.researchTitle)}”
                </p>
                {survey.intro.map((paragraph) => (
                    <p key={paragraph.en}>{localize(paragraph)}</p>
                ))}
                <SurveyNavActions />
            </header>

            {/* Keyed by survey so switching surveys starts from a clean form. */}
            <SurveyForm key={survey.id} survey={survey} />

            <SiteFooter />
        </div>
    )
}
