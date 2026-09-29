import wondersBannerImage from '@/assets/images/destinations/colombia-wonders-banner.jpeg'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './ColombiaWondersShowcase.css'

export function ColombiaWondersShowcase() {
    const { t } = useTranslation()
    const copy = t.home.wonders
    const { ref, inView } = useInView<HTMLElement>()

    return (
        <section
            ref={ref}
            className={`wonders-showcase reveal-group ${inView ? 'is-revealed' : ''}`}
            aria-label={copy.ariaLabel}
        >
            <div className="wonders-showcase-visual">
                <div className="wonders-showcase-image" style={{ backgroundImage: `url("${wondersBannerImage}")` }} />
            </div>
            <div className="wonders-showcase-copy reveal-item">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h2>{copy.title}</h2>
                <p>{copy.description}</p>
                <div className="meta-pill-row wonders-showcase-regions" role="list" aria-label={copy.regionsAriaLabel}>
                    {copy.regions.map((region) => (
                        <span key={region} role="listitem">
                            {region}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
