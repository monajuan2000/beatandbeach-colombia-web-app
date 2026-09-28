import { Link } from 'react-router-dom'
import featuredDestinationImage from '@/assets/images/destinations/colombia-featured-destination.jpeg'
import { CityPill } from '@/features/cities/components/CityPill/CityPill'
import { cities, citiesByRollout } from '@/features/cities/data/cities'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './HeroSection.css'

export function HeroSection() {
    const { t } = useTranslation()
    const copy = t.home.hero

    return (
        <section className="hero-section" id="discover">
            <div className="hero-copy">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h1>{copy.title}</h1>
                <p>{copy.description}</p>

                <div className="action-row">
                    <Link to="/" state={{ scrollTo: 'events' }} className="primary-button">
                        {copy.exploreEvents}
                    </Link>
                    <Link to="/" state={{ scrollTo: 'cities' }} className="inverse-button">
                        {copy.viewCities}
                    </Link>
                </div>

                <ul className="hero-stats" aria-label={copy.statsAriaLabel}>
                    <li>
                        <strong>120+</strong>
                        <span>{copy.stats.events}</span>
                    </li>
                    <li>
                        <strong>{cities.length}</strong>
                        <span>{copy.stats.cities}</span>
                    </li>
                    <li>
                        <strong>4.9/5</strong>
                        <span>{copy.stats.rating}</span>
                    </li>
                </ul>
            </div>

            <div className="hero-visual" aria-label={copy.visualAriaLabel}>
                <div
                    className="feature-card destination-visual"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(12, 74, 110, 0.72), rgba(15, 23, 42, 0.58)), url("${featuredDestinationImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                >
                    <div className="destination-image-overlay" />
                    <div className="destination-copy">
                        <span className="card-tag">{t.common.featured}</span>
                        <h3>{copy.destinationTitle}</h3>
                        <p>{copy.destinationDescription}</p>
                    </div>
                </div>

                <nav className="city-pill-row" aria-label={copy.destinationsAriaLabel}>
                    {citiesByRollout.map((city) => (
                        <CityPill key={city.id} city={city} />
                    ))}
                </nav>
            </div>
        </section>
    )
}
