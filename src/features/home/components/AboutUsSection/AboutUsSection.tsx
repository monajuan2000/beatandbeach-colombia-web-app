import logoImage from '@/assets/images/brand/beat-and-beach-logo.png'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './AboutUsSection.css'

export function AboutUsSection() {
    const { t } = useTranslation()
    const copy = t.home.about

    return (
        <section className="content-section" id="about">
            <div className="about-visual">
                <img src={logoImage} alt={t.common.header.logoAlt} className="about-logo" />
            </div>

            <div className="about-copy">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h2>{copy.title}</h2>

                {copy.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}

                <div className="about-points">
                    {copy.points.map((point) => (
                        <div key={point.title} className="about-point">
                            <strong>{point.title}</strong>
                            <span>{point.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
