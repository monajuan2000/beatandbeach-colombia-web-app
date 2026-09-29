import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCardNumber, revealDelay } from '@/utils/reveal'
import { experienceHighlights } from '../../data/highlights'
import './HighlightsSection.css'

export function HighlightsSection() {
    const { t, localize } = useTranslation()
    const copy = t.home.highlights
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="content-section" id="insights">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} variant="accent" />

            <div ref={ref} className={`highlights-grid reveal-group ${inView ? 'is-revealed' : ''}`}>
                {experienceHighlights.map((item, index) => (
                    <article key={item.id} className="highlight-card dark-card accent-card reveal-item" style={revealDelay(index)}>
                        <div className="highlight-card-top">
                            <div className="highlight-icon" aria-hidden="true">
                                {item.icon}
                            </div>
                            <span className="card-number" aria-hidden="true">
                                {formatCardNumber(index)}
                            </span>
                        </div>
                        <h3>{localize(item.title)}</h3>
                        <p>{localize(item.description)}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
