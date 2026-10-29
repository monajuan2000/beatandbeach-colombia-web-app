import { useMemo, useState } from 'react'
import { Collapsible } from '@/components/ui/Collapsible/Collapsible'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { getCityById } from '@/features/cities/data/cities'
import { isQuoteablePlan } from '@/features/itineraries/config'
import { itineraries } from '@/features/itineraries/data/itineraries'
import { useTranslation } from '@/i18n/context/LanguageContext'

type TripPlannerItineraryCatalogProps = {
    onOpenItinerary: (cityId: string, planId: string) => void
}

export function TripPlannerItineraryCatalog({ onOpenItinerary }: TripPlannerItineraryCatalogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { t, localize } = useTranslation()
    const copy = t.trip

    const plannerItineraries = useMemo(
        () => itineraries.flatMap((catalog) => {
            const city = getCityById(catalog.cityId)
            if (!city) return []

            return catalog.plans.map((plan) => ({
                cityId: catalog.cityId,
                cityName: city.name,
                planId: plan.id,
                title: localize(plan.name),
                duration: plan.specialLabel
                    ? localize(plan.specialLabel)
                    : plan.durationLabel
                        ? localize(plan.durationLabel)
                        : copy.itineraryDuration(plan.days.length),
                summary: localize(plan.summary),
                isQuoteable: isQuoteablePlan(catalog.cityId, plan.id),
            }))
        }),
        [copy, localize],
    )
    const destinationCount = useMemo(
        () => new Set(plannerItineraries.map((itinerary) => itinerary.cityId)).size,
        [plannerItineraries],
    )

    return (
        <section className="planner-itineraries" aria-label={copy.title}>
            <div className="planner-cover">
                <SectionHeader
                    eyebrow={copy.eyebrow}
                    title={copy.title}
                    titleId="trip-planner-title"
                    className="planner-cover-header"
                >
                    <p className="planner-intro">{copy.intro}</p>
                </SectionHeader>
                <div className="planner-cover-summary" aria-label={copy.plannerSummary}>
                    <span>
                        <strong>{destinationCount}</strong>
                        {copy.destinationCount(destinationCount)}
                    </span>
                    <span>
                        <strong>{plannerItineraries.length}</strong>
                        {copy.itineraryCount(plannerItineraries.length)}
                    </span>
                </div>
                <button
                    type="button"
                    className="primary-button planner-itineraries-toggle"
                    aria-expanded={isOpen}
                    aria-controls="planner-itinerary-catalog"
                    onClick={() => setIsOpen((current) => !current)}
                >
                    {isOpen ? copy.hideItineraries : copy.showItineraries(plannerItineraries.length)}
                    <span
                        className={`planner-itineraries-chevron ${isOpen ? 'is-open' : ''}`}
                        aria-hidden="true"
                    />
                </button>
            </div>
            <Collapsible id="planner-itinerary-catalog" isOpen={isOpen}>
                <div className="planner-itineraries-content">
                    <p className="planner-itineraries-intro">{copy.itineraryCatalogIntro}</p>
                    <div className="planner-itinerary-grid">
                        {plannerItineraries.map((itinerary) => (
                            <article className="planner-itinerary-card" key={itinerary.planId}>
                                <div className="planner-itinerary-meta">
                                    <span className="planner-itinerary-city">
                                        {itinerary.cityName} · {itinerary.duration}
                                    </span>
                                    <span
                                        className={`planner-itinerary-status ${itinerary.isQuoteable ? 'is-available' : 'is-coming-soon'}`}
                                    >
                                        {itinerary.isQuoteable ? copy.itineraryAvailable : copy.itineraryComingSoon}
                                    </span>
                                </div>
                                <h4>{itinerary.title}</h4>
                                <p>{itinerary.summary}</p>
                                <button
                                    type="button"
                                    className={itinerary.isQuoteable ? 'primary-button' : 'secondary-button'}
                                    onClick={() => onOpenItinerary(itinerary.cityId, itinerary.planId)}
                                >
                                    {itinerary.isQuoteable ? copy.quoteItinerary : copy.viewItinerary}
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </Collapsible>
        </section>
    )
}
