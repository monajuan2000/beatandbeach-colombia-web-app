import { useState } from 'react'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { cities } from '@/features/cities/data/cities'
import { events } from '../../data/events'
import type { EventItem } from '../../types'
import { EventCard } from '../EventCard/EventCard'
import { EventDetailsModal } from '../EventDetailsModal/EventDetailsModal'
import './EventsList.css'

const INITIAL_VISIBLE = 4
const ALL = 'all'

const cityFilters: FilterOption[] = [
    { value: ALL, label: 'All', count: events.length },
    ...cities.map((city) => ({
        value: city.id,
        label: city.name,
        count: events.filter((event) => event.cityId === city.id).length,
    })),
]

export function EventsList() {
    const [cityFilter, setCityFilter] = useState(ALL)
    const [showAll, setShowAll] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

    const filteredEvents =
        cityFilter === ALL ? events : events.filter((event) => event.cityId === cityFilter)
    const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, INITIAL_VISIBLE)
    const hiddenCount = filteredEvents.length - visibleEvents.length

    return (
        <section className="content-section" id="events">
            <SectionHeader eyebrow="Featured events" title="Curated experiences you can join right away.">
                <FilterChips
                    label="Filter events by city"
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
                        {showAll ? 'Show fewer events' : `Show all events (${hiddenCount} more)`}
                    </button>
                ) : null}
            </div>

            <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </section>
    )
}
