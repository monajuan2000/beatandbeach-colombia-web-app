import logoImage from '../../assets/BEATANDBEACH_COLOMBIA_MAINLOGO.png'

export function AboutUsSection() {
    return (
        <section className="content-section about-section" id="about">
            <div className="about-visual">
                <img
                    src={logoImage}
                    alt="Beat and Beach Colombia logo"
                    className="about-logo"
                />
            </div>

            <div className="about-copy">
                <span className="eyebrow">About us</span>
                <h2>We turn Colombia into an unforgettable travel story.</h2>

                <p>
                    Beat & Beach Colombia is a tourism brand created to connect travelers with the
                    rhythm, culture, and beauty of the country’s most iconic destinations. We design
                    experiences that blend local identity, premium hospitality, and authentic moments in
                    Medellín, Cartagena, and Guatapé.
                </p>

                <p>
                    Our mission is simple: help visitors discover the soul of Colombia through carefully
                    curated events, cultural experiences, coastal energy, and scenic escapes that feel both
                    exciting and deeply local.
                </p>

                <div className="about-points">
                    <div className="about-point">
                        <strong>Curated journeys</strong>
                        <span>Thoughtful experiences built around each destination.</span>
                    </div>
                    <div className="about-point">
                        <strong>Local identity</strong>
                        <span>Authentic moments shaped by regional culture and community.</span>
                    </div>
                    <div className="about-point">
                        <strong>Memorable events</strong>
                        <span>Music, culture, nightlife, and adventure in one itinerary.</span>
                    </div>
                    <div className="about-point">
                        <strong>Premium service</strong>
                        <span>Professional guidance for travelers who want quality and ease.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
