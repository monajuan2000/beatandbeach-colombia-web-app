import { useState } from 'react'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { CityStatusBadge } from '@/features/cities/components/CityStatusBadge/CityStatusBadge'
import { citiesByRollout } from '@/features/cities/data/cities'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { events, getEventsByCity } from '../../data/events'
import type { EventItem } from '../../types'
import { EventCard } from '../EventCard/EventCard'
import { EventDetailsModal } from '../EventDetailsModal/EventDetailsModal'
import './EventsList.css'

const INITIAL_VISIBLE = 4
const ALL = 'all'

export function EventsList() {
    const { t } = useTranslation()
    const copy = t.events.list
    const [cityFilter, setCityFilter] = useState(ALL)
    const [showAll, setShowAll] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

    const cityFilters: FilterOption[] = [
        { value: ALL, label: t.common.all, count: events.length },
        ...citiesByRollout.map((city) => ({
            value: city.id,
            tone: city.status === 'launching' ? 'lime' as const : undefined,
            label: (
                <span className="events-list-city-filter-label">
                    {city.name}
                    {city.status === 'under-review' ? <CityStatusBadge status={city.status} /> : null}
                </span>
            ),
            count: getEventsByCity(city.id).length,
        })),
    ]
    const filteredEvents =
        cityFilter === ALL ? events : events.filter((event) => event.cityId === cityFilter)
    const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, INITIAL_VISIBLE)
    const hiddenCount = filteredEvents.length - visibleEvents.length

    return (
        <section className="content-section" id="events">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title}>
                <FilterChips
                    label={copy.filterAriaLabel}
                    options={cityFilters}
                    value={cityFilter}
                    onChange={(value) => {
                        setCityFilter(value)
                        setShowAll(false)
                    }}
                />
            </SectionHeader>

            <div className="events-panel">
                <div className="events-list">
                    {visibleEvents.map((event) => (
                        <EventCard key={event.id} event={event} onViewDetails={setSelectedEvent} />
                    ))}
                </div>

                {hiddenCount > 0 || showAll ? (
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setShowAll((current) => !current)}
                    >
                        {showAll ? copy.showFewer : copy.showAll(hiddenCount)}
                    </button>
                ) : null}
            </div>

            <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </section>
    )
}
