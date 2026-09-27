import { experienceHighlights } from '../../data/highlights'

export function HighlightsSection() {
    return (
        <section className="content-section" id="insights">
            <div className="section-header">
                <div>
                    <span className="eyebrow">Why choose us</span>
                    <h2>Built for travelers who want more than a generic itinerary.</h2>
                </div>
            </div>

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
