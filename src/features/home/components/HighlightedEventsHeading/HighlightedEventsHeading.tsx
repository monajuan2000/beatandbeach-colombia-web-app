import { useTranslation } from '@/i18n/context/LanguageContext'
import './HighlightedEventsHeading.css'

export function HighlightedEventsHeading() {
    const { t } = useTranslation()
    const copy = t.home.highlightedHeading

    return (
        <section className="highlighted-events-header" aria-label={copy.ariaLabel}>
            <h2>{copy.title}</h2>
        </section>
    )
}
