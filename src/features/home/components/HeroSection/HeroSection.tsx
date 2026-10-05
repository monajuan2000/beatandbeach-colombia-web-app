import { Link } from 'react-router-dom'
import featuredDestinationImage from '@/assets/images/destinations/colombia-featured-destination.jpeg'
import { CityPill } from '@/features/cities/components/CityPill/CityPill'
import { FEATURED_CITY_ID } from '@/features/cities/config'
import { cities, citiesByRollout } from '@/features/cities/data/cities'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { revealDelay } from '@/utils/reveal'
import { NextEventLink } from '../NextEventLink/NextEventLink'
import './HeroSection.css'

export function HeroSection() {
    const { t } = useTranslation()
    const copy = t.home.hero
    const { ref, inView } = useInView<HTMLElement>(0)

    const stats = [
        { id: 'events', value: '120+', label: copy.stats.events },
        { id: 'cities', value: String(cities.length), label: copy.stats.cities },
        { id: 'rating', value: '4.9/5', label: copy.stats.rating, icon: '★' },
    ]

    return (
        <section ref={ref} className={`hero-section reveal-group ${inView ? 'is-revealed' : ''}`} id="discover">
            <div className="hero-copy">
                <span className="eyebrow eyebrow-pill reveal-item">{copy.eyebrow}</span>
                <h1 className="reveal-item" style={revealDelay(1)}>
                    {copy.title.lead}
                    <span className="hero-title-highlight">{copy.title.highlight}</span>
                    {copy.title.end}
                </h1>
                <p className="reveal-item" style={revealDelay(2)}>
                    {copy.description}
                </p>

                <div className="action-row reveal-item" style={revealDelay(3)}>
                    <Link to="/" state={{ scrollTo: 'events' }} className="primary-button">
                        {copy.exploreEvents} <span aria-hidden="true">→</span>
                    </Link>
                    <Link to="/" state={{ scrollTo: 'cities' }} className="inverse-button">
                        {copy.viewCities}
                    </Link>
                </div>

                <div className="reveal-item" style={revealDelay(4)}>
                    <NextEventLink />
                </div>

                <ul className="hero-stats reveal-item" style={revealDelay(5)} aria-label={copy.statsAriaLabel}>
                    {stats.map((stat) => (
                        <li key={stat.id}>
                            <strong>
                                {stat.icon ? (
                                    <span className="hero-stats-icon" aria-hidden="true">
                                        {stat.icon}
                                    </span>
                                ) : null}
                                {stat.value}
                            </strong>
                            <span>{stat.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hero-visual reveal-item" style={revealDelay(2)} aria-label={copy.visualAriaLabel}>
                <div className="feature-card destination-visual">
                    <div
                        className="destination-image"
                        style={{ backgroundImage: `url("${featuredDestinationImage}")` }}
                    />
                    <div className="destination-image-overlay" />
                    <div className="destination-copy">
                        <span className="card-tag">{t.common.featured}</span>
                        <h3>{copy.destinationTitle}</h3>
                        <p>{copy.destinationDescription}</p>
                    </div>
                </div>

                <div className="hero-destinations">
                    <span className="hero-destinations-label">{copy.chooseDestination}</span>
                    <nav className="city-pill-row" aria-label={copy.destinationsAriaLabel}>
                        {citiesByRollout.map((city) => (
                            <CityPill key={city.id} city={city} isHighlighted={city.id === FEATURED_CITY_ID} />
                        ))}
                    </nav>
                </div>
            </div>

            <Link to="/" state={{ scrollTo: 'featured-events' }} className="hero-scroll-cue">
                <span>{copy.scrollCue}</span>
                <span className="hero-scroll-cue-arrow" aria-hidden="true">
                    ↓
                </span>
            </Link>
        </section>
    )
}
