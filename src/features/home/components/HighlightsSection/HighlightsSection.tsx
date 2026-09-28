import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { experienceHighlights } from '../../data/highlights'
import './HighlightsSection.css'

export function HighlightsSection() {
    const { t, localize } = useTranslation()
    const copy = t.home.highlights

    return (
        <section className="content-section" id="insights">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />

            <div className="highlights-grid">
                {experienceHighlights.map((item) => (
                    <article key={item.id} className="highlight-card">
                        <div className="highlight-icon" aria-hidden="true">
                            {item.icon}
                        </div>
                        <h3>{localize(item.title)}</h3>
                        <p>{localize(item.description)}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
