import { Link } from 'react-router-dom'
import featuredDestinationImage from '@/assets/images/destinations/colombia-featured-destination.jpeg'
import { cities } from '@/features/cities/data/cities'
import './HeroSection.css'

export function HeroSection() {
    return (
        <section className="hero-section" id="discover">
            <div className="hero-copy">
                <span className="eyebrow">Live unforgettable experiences</span>
                <h1>Discover the best events across Colombia’s most iconic destinations.</h1>
                <p>
                    Explore the energy of Medellín, the charm of Cartagena, and the scenic beauty of
                    Guatapé through curated experiences designed for travelers and locals alike.
                </p>

                <div className="action-row">
                    <Link to="/" state={{ scrollTo: 'events' }} className="primary-button">
                        Explore events
                    </Link>
                    <Link to="/" state={{ scrollTo: 'cities' }} className="secondary-button">
                        View cities
                    </Link>
                </div>

                <ul className="hero-stats" aria-label="Key event statistics">
                    <li>
                        <strong>120+</strong>
                        <span>Events</span>
                    </li>
                    <li>
                        <strong>{cities.length}</strong>
                        <span>Cities</span>
                    </li>
                    <li>
                        <strong>4.9/5</strong>
                        <span>Traveler rating</span>
                    </li>
                </ul>
            </div>

            <div className="hero-visual" aria-label="Featured destinations summary">
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
                        <span className="card-tag">Featured</span>
                        <h3>Colombia</h3>
                        <p>Urban energy, Caribbean charm, and mountain escapes.</p>
                    </div>
                </div>

                <nav className="pill-row" aria-label="Featured destination list">
                    {cities.map((city) => (
                        <Link key={city.id} to={`/cities/${city.id}`}>
                            {city.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    )
}
