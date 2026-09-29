import logoImage from '@/assets/images/brand/beat-and-beach-logo.png'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCardNumber, revealDelay } from '@/utils/reveal'
import './AboutUsSection.css'

export function AboutUsSection() {
    const { t } = useTranslation()
    const copy = t.home.about
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="content-section" id="about">
            <div className="about-visual">
                <img src={logoImage} alt={t.common.header.logoAlt} className="about-logo" />
            </div>

            <div className="about-copy">
                <span className="eyebrow eyebrow-pill">{copy.eyebrow}</span>
                <h2 className="accent-heading accent-heading-start">{copy.title}</h2>

                {copy.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}

                <div ref={ref} className={`about-points reveal-group ${inView ? 'is-revealed' : ''}`}>
                    {copy.points.map((point, index) => (
                        <div
                            key={point.title}
                            className="about-point dark-card accent-card reveal-item"
                            style={revealDelay(index)}
                        >
                            <span className="card-number about-point-number" aria-hidden="true">
                                {formatCardNumber(index)}
                            </span>
                            <strong>{point.title}</strong>
                            <span className="about-point-text">{point.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
