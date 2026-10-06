import { useTranslation } from '@/i18n/context/LanguageContext'
import './SenaTourProgress.css'

export function SenaTourProgress() {
    const { t } = useTranslation()
    const copy = t.home.senaTour

    return (
        <section className="sena-tour-progress" aria-label={copy.ariaLabel}>
            <div className="sena-tour-progress-header">
                <div>
                    <span className="sena-tour-progress-eyebrow">{copy.eyebrow}</span>
                    <h3>{copy.title}</h3>
                </div>
                <span className="sena-tour-confirmed">
                    <span className="sena-tour-confirmed-dot" aria-hidden="true" />
                    {copy.confirmed}
                </span>
            </div>

            <p className="sena-tour-date">
                <span aria-hidden="true">📅</span>
                <span>{copy.date}</span>
            </p>

            <div className="sena-tour-stage-heading">
                <span>{copy.stagesLabel}</span>
                <span className="sena-tour-current-stage">
                    {copy.currentStageLabel}: {copy.stages[0]}
                </span>
            </div>
            <ol className="sena-tour-stages">
                {copy.stages.map((stage, index) => (
                    <li
                        key={stage}
                        className={`sena-tour-stage${index === 0 ? ' is-current' : ''}`}
                        aria-current={index === 0 ? 'step' : undefined}
                    >
                        <span className="sena-tour-stage-marker" aria-hidden="true">
                            {index + 1}
                        </span>
                        <span className="sena-tour-stage-name">{stage}</span>
                    </li>
                ))}
            </ol>
        </section>
    )
}
