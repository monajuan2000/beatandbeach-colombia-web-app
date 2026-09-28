import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { cities, getCityById } from '@/features/cities/data/cities'
import type { City } from '@/features/cities/types'
import { EventCard } from '@/features/events/components/EventCard/EventCard'
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal/EventDetailsModal'
import { getEventsByCity } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { useTrip } from '@/features/trip/context/TripContext'
import './CityPage.css'

const ALL = 'all'

export function CityPage() {
    const { cityId } = useParams()
    const city = getCityById(cityId)

    if (!city) return <Navigate to="/" replace />

    // Keyed by city so filters and the open modal reset when moving between cities.
    return <CityPageContent key={city.id} city={city} />
}

function CityPageContent({ city }: { city: City }) {
    const { openPlanner } = useTrip()
    const [categoryFilter, setCategoryFilter] = useState(ALL)
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

    const cityEvents = getEventsByCity(city.id)
    const categories = [...new Set(cityEvents.map((event) => event.category))]
    const categoryFilters: FilterOption[] = [
        { value: ALL, label: 'All', count: cityEvents.length },
        ...categories.map((category) => ({
            value: category,
            label: category,
            count: cityEvents.filter((event) => event.category === category).length,
        })),
    ]
    const visibleEvents =
        categoryFilter === ALL ? cityEvents : cityEvents.filter((event) => event.category === categoryFilter)
    const otherCities = cities.filter((item) => item.id !== city.id)

    return (
        <div className="city-page">
            <SiteHeader />

            <header className="city-page-banner">
                <div>
                    <span className="eyebrow">City experience</span>
                    <h1>{city.name} events</h1>
                    <p>{city.description}</p>
                </div>
                <div className="city-page-actions">
                    <button type="button" className="primary-button" onClick={() => openPlanner(city.id)}>
                        Plan a trip to {city.name}
                    </button>
                    <Link to="/" className="secondary-button city-page-back">
                        Back to home
                    </Link>
                </div>
            </header>

            <section className="city-page-intro">
                <div className="city-page-highlight">
                    <span className="card-tag">Featured</span>
                    <h2>Why {city.name} stands out</h2>
                    <p>{city.intro}</p>
                </div>

                <div className="city-page-stats">
                    {city.stats.map((stat) => (
                        <div key={stat.label}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Only worth filtering when some category actually groups several events. */}
            {categories.length > 1 && categories.length < cityEvents.length ? (
                <div className="city-page-toolbar">
                    <FilterChips
                        label={`Filter ${city.name} events by category`}
                        options={categoryFilters}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                    />
                </div>
            ) : null}

            <section className="city-page-events" aria-label={`${city.name} events list`}>
                {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="city" onViewDetails={setSelectedEvent} />
                ))}
            </section>

            <section className="city-page-more" aria-label="Other destinations">
                <span className="eyebrow">Keep exploring</span>
                <nav className="pill-row">
                    {otherCities.map((item) => (
                        <Link key={item.id} to={`/cities/${item.id}`}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </section>

            <EventDetailsModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                showCityLink={false}
            />
        </div>
    )
}
