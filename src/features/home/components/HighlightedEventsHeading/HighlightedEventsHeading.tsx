import { useTranslation } from '@/i18n/context/LanguageContext'
import './HighlightedEventsHeading.css'

export function HighlightedEventsHeading() {
    const { t } = useTranslation()
    const copy = t.home.highlightedHeading

    return (
        <section className="highlighted-events-header" id="featured-events" aria-label={copy.ariaLabel}>
            <span className="eyebrow eyebrow-pill highlighted-events-eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
            <p>{copy.subtitle}</p>
        </section>
    )
}
