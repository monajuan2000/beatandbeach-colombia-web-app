export function Hero() {
    return (
        <section className="hero-section" id="discover">
            <div className="hero-copy">
                <span className="eyebrow">Live unforgettable experiences</span>
                <h1>Discover the best events across Colombia’s most iconic destinations.</h1>
                <p>
                    Explore the energy of Medellín, the charm of Cartagena, and the scenic beauty of
                    Guatapé through curated experiences designed for travelers and locals alike.
                </p>

                <div className="hero-actions">
                    <button type="button" className="primary-button">
                        Explore events
                    </button>
                    <button type="button" className="secondary-button">
                        View cities
                    </button>
                </div>

                <ul className="hero-stats" aria-label="Key event statistics">
                    <li>
                        <strong>120+</strong>
                        <span>Events</span>
                    </li>
                    <li>
                        <strong>3</strong>
                        <span>Cities</span>
                    </li>
                    <li>
                        <strong>4.9/5</strong>
                        <span>Traveler rating</span>
                    </li>
                </ul>
            </div>

            <div className="hero-visual" aria-label="Featured destinations summary">
                <div className="feature-card destination-visual">
                    <div className="destination-image-overlay" />
                    <div className="destination-copy">
                        <span className="card-tag">Featured</span>
                        <h3>Colombia</h3>
                        <p>Urban energy, Caribbean charm, and mountain escapes.</p>
                    </div>
                </div>

                <div className="city-pill-row" aria-label="Featured destination list">
                    <span>Medellín</span>
                    <span>Cartagena</span>
                    <span>Guatapé</span>
                </div>
            </div>
        </section>
    )
}
