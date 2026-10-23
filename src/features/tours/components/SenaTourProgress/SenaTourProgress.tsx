import { useTranslation } from '@/i18n/context/LanguageContext'
import type { CSSProperties } from 'react'
import './SenaTourProgress.css'

const CURRENT_STAGE_INDEX = 2
const CURRENT_STAGE_PROGRESS = 50

export function SenaTourProgress() {
    const { t } = useTranslation()
    const copy = t.tours.progress

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
                    <span>
                        {copy.currentStageLabel}: {copy.stages[CURRENT_STAGE_INDEX]}
                    </span>
                    <strong>{copy.currentStageProgress(CURRENT_STAGE_PROGRESS)}</strong>
                </span>
            </div>
            <ol
                className="sena-tour-stages"
                style={{ '--current-stage-progress': `${CURRENT_STAGE_PROGRESS}%` } as CSSProperties}
            >
                {copy.stages.map((stage, index) => (
                    <li
                        key={stage}
                        className={[
                            'sena-tour-stage',
                            index < CURRENT_STAGE_INDEX && 'is-complete',
                            index === CURRENT_STAGE_INDEX && 'is-current',
                        ].filter(Boolean).join(' ')}
                        aria-current={index === CURRENT_STAGE_INDEX ? 'step' : undefined}
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
