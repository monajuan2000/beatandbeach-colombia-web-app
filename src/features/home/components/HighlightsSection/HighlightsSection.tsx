import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { experienceHighlights } from '../../data/highlights'
import './HighlightsSection.css'

export function HighlightsSection() {
    return (
        <section className="content-section" id="insights">
            <SectionHeader
                eyebrow="Why choose us"
                title="Built for travelers who want more than a generic itinerary."
            />

            <div className="highlights-grid">
                {experienceHighlights.map((item) => (
                    <article key={item.id} className="highlight-card">
                        <div className="highlight-icon" aria-hidden="true">
                            {item.icon}
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
