import { Link } from 'react-router-dom'
import medellinMainCard from '../../assets/MEDELLIN_MAINCARD1.jpeg'

const featuredCities = [
    {
        name: 'Medellín',
        region: 'Andean rhythm',
        description: 'A vibrant city full of innovation, nightlife, and contemporary culture.',
        path: '/medellin-events',
        image: medellinMainCard,
    },
    {
        name: 'Cali',
        region: 'Salsa and energy',
        description: 'A city of movement, music, and strong local identity with a deep cultural pulse.',
        path: '#',
        image: '',
    },
    {
        name: 'Cartagena',
        region: 'Historic coast',
        description: 'Colorful colonial streets, Caribbean breeze, and unforgettable sunsets.',
        path: '#',
        image: '',
    },
    {
        name: 'Guatapé',
        region: 'Lake & mountain views',
        description: 'A scenic getaway with lakes, colorful houses, and outdoor adventure.',
        path: '#',
        image: '',
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
                {featuredCities.map((city) => {
                    const cardContent = (
                        <>
                            <div className="city-card-overlay" />
                            <div className="city-card-content">
                                <span className="city-badge">{city.region}</span>
                                <h3>{city.name}</h3>
                                <p>{city.description}</p>
                            </div>
                        </>
                    )

                    const cardStyle = city.image
                        ? {
                            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(8, 47, 73, 0.8)), url("${city.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }
                        : undefined

                    if (city.path === '#') {
                        return (
                            <article key={city.name} className="city-card large-city-card" style={cardStyle}>
                                {cardContent}
                            </article>
                        )
                    }

                    return (
                        <Link
                            key={city.name}
                            to={city.path}
                            className="city-card large-city-card city-card-link"
                            style={cardStyle}
                        >
                            {cardContent}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
