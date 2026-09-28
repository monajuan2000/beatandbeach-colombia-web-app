import wondersBannerImage from '@/assets/images/destinations/colombia-wonders-banner.jpeg'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './ColombiaWondersShowcase.css'

export function ColombiaWondersShowcase() {
    const { t } = useTranslation()
    const copy = t.home.wonders

    return (
        <section className="wonders-showcase" aria-label={copy.ariaLabel}>
            <div
                className="wonders-showcase-visual"
                style={{ backgroundImage: `url("${wondersBannerImage}")` }}
            />
            <div className="wonders-showcase-copy">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h2>{copy.title}</h2>
                <p>{copy.description}</p>
            </div>
        </section>
    )
}
