import type { CSSProperties } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { experienceHighlights } from '../../data/highlights'
import './HighlightsSection.css'

const REVEAL_STAGGER_MS = 110

export function HighlightsSection() {
    const { t, localize } = useTranslation()
    const copy = t.home.highlights
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="content-section" id="insights">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} className="highlights-header" />

            <div ref={ref} className={`highlights-grid ${inView ? 'is-revealed' : ''}`}>
                {experienceHighlights.map((item, index) => (
                    <article
                        key={item.id}
                        className="highlight-card"
                        style={{ '--reveal-delay': `${index * REVEAL_STAGGER_MS}ms` } as CSSProperties}
                    >
                        <div className="highlight-card-top">
                            <div className="highlight-icon" aria-hidden="true">
                                {item.icon}
                            </div>
                            <span className="highlight-number" aria-hidden="true">
                                {String(index + 1).padStart(2, '0')}
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
