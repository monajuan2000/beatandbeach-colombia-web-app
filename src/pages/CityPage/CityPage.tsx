import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { CityCoverImage } from '@/features/cities/components/CityCoverImage/CityCoverImage'
import { CityPill } from '@/features/cities/components/CityPill/CityPill'
import { CityStatusBadge } from '@/features/cities/components/CityStatusBadge/CityStatusBadge'
import { CityStatusNotice } from '@/features/cities/components/CityStatusNotice/CityStatusNotice'
import { citiesByRollout, getCityById } from '@/features/cities/data/cities'
import type { City } from '@/features/cities/types'
import { EventCard } from '@/features/events/components/EventCard/EventCard'
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal/EventDetailsModal'
import { getEventsByCity } from '@/features/events/data/events'
import type { EventItem } from '@/features/events/types'
import { SurveyCallout } from '@/features/survey/components/SurveyCallout/SurveyCallout'
import { getSurveyForCity } from '@/features/survey/data/surveys'
import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
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
    const { t, localize } = useTranslation()
    const copy = t.cities.page
    const [categoryFilter, setCategoryFilter] = useState(ALL)
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

    const cityEvents = getEventsByCity(city.id)
    const categories = [...new Set(cityEvents.map((event) => event.category))]
    const categoryFilters: FilterOption[] = [
        { value: ALL, label: t.common.all, count: cityEvents.length },
        ...categories.map((category) => ({
            value: category,
            label: t.events.categories[category],
            count: cityEvents.filter((event) => event.category === category).length,
        })),
    ]
    const visibleEvents =
        categoryFilter === ALL ? cityEvents : cityEvents.filter((event) => event.category === categoryFilter)
    const otherCities = citiesByRollout.filter((item) => item.id !== city.id)
    const survey = getSurveyForCity(city.id)

    return (
        <div className="city-page">
            <SiteHeader />

            <header className={`city-page-banner city-page-banner-${city.status}`}>
                <div className="city-page-banner-copy">
                    <div className="city-page-banner-meta">
                        <span className="eyebrow">{copy.eyebrow}</span>
                        <CityStatusBadge status={city.status} />
                    </div>
                    <h1>{copy.title(city.name)}</h1>
                    <p>{localize(city.description)}</p>
                    <CityStatusNotice city={city} variant="highlight" className="city-page-notice" />
                </div>
                <div className="city-page-actions">
                    <button type="button" className="primary-button" onClick={() => openPlanner(city.id)}>
                        {copy.planTrip(city.name)}
                    </button>
                    <Link to="/" className="inverse-button city-page-back">
                        {t.common.backToHome}
                    </Link>
                </div>
            </header>

            {survey ? <SurveyCallout survey={survey} /> : null}

            <CityCoverImage city={city} />

            <section className="city-page-intro">
                <div className="city-page-highlight surface-light">
                    <span className="card-tag">{t.common.featured}</span>
                    <h2>{copy.whyStandsOut(city.name)}</h2>
                    <p>{localize(city.intro)}</p>
                </div>

                <div className="city-page-stats surface-light">
                    {city.stats.map((stat) => (
                        <div key={stat.label.en}>
                            <strong>{stat.value}</strong>
                            <span>{localize(stat.label)}</span>
                        </div>
                    ))}
                </div>
            </section>

            {city.status === 'under-review' ? (
                <SectionHeader
                    eyebrow={copy.previewEyebrow}
                    title={copy.previewTitle(city.name)}
                    className="city-page-events-header"
                >
                    <p>{copy.previewText}</p>
                </SectionHeader>
            ) : null}

            {/* Only worth filtering when some category actually groups several events. */}
            {categories.length > 1 && categories.length < cityEvents.length ? (
                <div className="city-page-toolbar">
                    <FilterChips
                        label={copy.filterAriaLabel(city.name)}
                        options={categoryFilters}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                    />
                </div>
            ) : null}

            <section className="city-page-events" aria-label={copy.eventsAriaLabel(city.name)}>
                {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="city" onViewDetails={setSelectedEvent} />
                ))}
            </section>

            <section className="city-page-more" aria-label={copy.otherDestinationsAriaLabel}>
                <span className="eyebrow">{copy.keepExploring}</span>
                <nav className="city-pill-row">
                    {otherCities.map((item) => (
                        <CityPill key={item.id} city={item} />
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
