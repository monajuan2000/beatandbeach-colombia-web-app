import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { getEventsByCity } from '@/features/events/data/events'
import { cities } from '../../data/cities'
import './CitiesGrid.css'

export function CitiesGrid() {
    return (
        <section className="content-section cities-section" id="cities">
            <SectionHeader
                eyebrow="Top destinations"
                title="Explore Colombia through four unforgettable cities."
            />

            <div className="cities-grid">
                {cities.map((city) => {
                    const eventCount = getEventsByCity(city.id).length

                    return (
                        <Link
                            key={city.id}
                            to={`/cities/${city.id}`}
                            className="city-card"
                            style={
                                city.image
                                    ? {
                                        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(8, 47, 73, 0.8)), url("${city.image}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }
                                    : undefined
                            }
                        >
                            <div className="city-card-overlay" />
                            <div className="city-card-content">
                                <Badge tone="sky">{city.region}</Badge>
                                <h3>{city.name}</h3>
                                <p>{city.description}</p>
                                <span className="city-card-cta">
                                    {eventCount} {eventCount === 1 ? 'event' : 'events'} · Explore →
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
