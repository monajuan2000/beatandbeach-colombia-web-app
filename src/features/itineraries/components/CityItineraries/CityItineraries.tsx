import { useRef, useState } from 'react'
import { Collapsible } from '@/components/ui/Collapsible/Collapsible'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import type { City } from '@/features/cities/types'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import { getItinerariesForCity } from '../../data/itineraries'
import { getPlanCostBreakdown } from '../../utils/planCosts'
import { ItineraryCostSummary } from '../ItineraryCostSummary/ItineraryCostSummary'
import { ItineraryTimeline } from '../ItineraryTimeline/ItineraryTimeline'
import './CityItineraries.css'

/**
 * Basic day-by-day plans for a city, with a selector by trip length.
 * Starts collapsed so it does not crowd the page. Renders nothing if the city has no plans.
 */
export function CityItineraries({ city }: { city: City }) {
    const catalog = getItinerariesForCity(city.id)
    // Opens on the first basic plan; special plans are for specific groups.
    const [selectedPlanId, setSelectedPlanId] = useState(
        () => (catalog?.plans.find((item) => !item.specialLabel) ?? catalog?.plans[0])?.id,
    )
    const [isOpen, setIsOpen] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.section

    const plan = catalog?.plans.find((item) => item.id === selectedPlanId)
    if (!catalog || !plan) return null

    // Special plans lead the selector in lime; they are priced for a specific group, so the
    // public teaser only considers the basic ones.
    const basicPlans = catalog.plans.filter((item) => !item.specialLabel)
    const planOptions: FilterOption[] = [
        ...catalog.plans.flatMap((item) =>
            item.specialLabel ? [{ value: item.id, label: localize(item.specialLabel), tone: 'lime' as const }] : [],
        ),
        ...basicPlans.map((item) => ({ value: item.id, label: copy.duration(item.days.length) })),
    ]
    const lowestTotal = Math.min(...basicPlans.map((item) => getPlanCostBreakdown(item, catalog).total))
    const contentId = `${city.id}-itineraries-content`

    const toggle = () => {
        // Closing from deep inside the schedule would leave the reader far below the section.
        if (isOpen && (sectionRef.current?.getBoundingClientRect().top ?? 0) < 0) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setIsOpen(!isOpen)
    }

    return (
        <section
            ref={sectionRef}
            className={`city-itineraries surface-light surface-band ${isOpen ? 'is-open' : ''}`.trim()}
            aria-label={copy.eyebrow}
        >
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title(city.name)} variant="accent">
                <p className="city-itineraries-intro">{copy.intro}</p>
                <div className="city-itineraries-toggle-row">
                    <button
                        type="button"
                        className="primary-button city-itineraries-toggle"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={toggle}
                    >
                        {isOpen ? copy.hide : copy.show(catalog.plans.length)}
                        <span className="city-itineraries-chevron" aria-hidden="true" />
                    </button>
                    {isOpen ? null : (
                        <span className="city-itineraries-teaser">{copy.fromPrice(formatCop(lowestTotal, locale))}</span>
                    )}
                </div>
            </SectionHeader>

            <Collapsible id={contentId} isOpen={isOpen}>
                <FilterChips
                    label={copy.durationAriaLabel}
                    options={planOptions}
                    value={plan.id}
                    onChange={setSelectedPlanId}
                />

                <div className="city-itineraries-body">
                    <ItineraryTimeline plan={plan} catalog={catalog} />
                    <ItineraryCostSummary plan={plan} catalog={catalog} cityId={city.id} />
                </div>
            </Collapsible>
        </section>
    )
}
