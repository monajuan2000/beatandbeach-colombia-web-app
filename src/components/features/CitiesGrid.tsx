const featuredCities = [
    {
        name: 'Medellín',
        region: 'Andean rhythm',
        description: 'A vibrant city full of innovation, nightlife, and contemporary culture.',
    },
    {
        name: 'Cali',
        region: 'Salsa and energy',
        description: 'A city of movement, music, and strong local identity with a deep cultural pulse.',
    },
    {
        name: 'Cartagena',
        region: 'Historic coast',
        description: 'Colorful colonial streets, Caribbean breeze, and unforgettable sunsets.',
    },
    {
        name: 'Guatapé',
        region: 'Lake & mountain views',
        description: 'A scenic getaway with lakes, colorful houses, and outdoor adventure.',
    },
]

export function CitiesGrid() {
    return (
        <section className="content-section" id="cities">
            <div className="section-header">
                <div>
                    <span className="eyebrow">Top destinations</span>
                    <h2>Explore Colombia through four unforgettable cities.</h2>
                </div>
            </div>

            <div className="cities-grid large-city-grid">
                {featuredCities.map((city) => (
                    <article key={city.name} className="city-card large-city-card">
                        <div className="city-card-overlay" />
                        <div className="city-card-content">
                            <span className="city-badge">{city.region}</span>
                            <h3>{city.name}</h3>
                            <p>{city.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
