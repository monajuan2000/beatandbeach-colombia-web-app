import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Collapsible } from '@/components/ui/Collapsible/Collapsible'
import { FilterChips, type FilterOption } from '@/components/ui/FilterChips/FilterChips'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import type { City } from '@/features/cities/types'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import { getUnavailablePlanIds, isQuoteablePlan, ITINERARY_RULES } from '../../config'
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
    const unavailablePlanIds = getUnavailablePlanIds(city.id)
    const firstAvailablePlan =
        catalog?.plans.find((item) => !item.specialLabel && !unavailablePlanIds.includes(item.id)) ?? catalog?.plans[0]

    const location = useLocation()
    const navigate = useNavigate()
    const routeState = location.state as {
        openItineraries?: unknown
        itineraryRequestId?: unknown
        openQuotePlanId?: unknown
    } | null
    const routeOpenItineraries = routeState?.openItineraries === true
    const routeQuotePlanId = routeState?.openQuotePlanId
    const [dismissedQuoteLocationKey, setDismissedQuoteLocationKey] = useState<string>()
    // Opens on the first basic plan; under-review plans remain selectable but their actions are disabled.
    const [selectedPlanId, setSelectedPlanId] = useState(() =>
        typeof routeQuotePlanId === 'string' ? routeQuotePlanId : firstAvailablePlan?.id ?? '',
    )
    const [isOpen, setIsOpen] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const selectedPlanRef = useRef<HTMLParagraphElement>(null)
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.section
    const requestedQuotePlan = dismissedQuoteLocationKey !== location.key && typeof routeQuotePlanId === 'string'
        ? catalog?.plans.find((item) => item.id === routeQuotePlanId && isQuoteablePlan(city.id, item.id))
        : undefined
    const isSectionOpen = isOpen || routeOpenItineraries || Boolean(requestedQuotePlan)

    const activePlanId = requestedQuotePlan?.id ?? selectedPlanId
    const plan = catalog?.plans.find((item) => item.id === activePlanId) ?? firstAvailablePlan

    useEffect(() => {
        if (!isSectionOpen) return

        const timeoutId = window.setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 550)

        return () => window.clearTimeout(timeoutId)
    }, [isSectionOpen, routeOpenItineraries, routeState?.itineraryRequestId, requestedQuotePlan?.id])

    if (!catalog || !plan) return null

    // Special plans lead the selector in lime; basic plans stay visible even when their booking actions are paused.
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
        if (isSectionOpen && (sectionRef.current?.getBoundingClientRect().top ?? 0) < 0) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setIsOpen(!isSectionOpen)
        if (routeOpenItineraries || requestedQuotePlan) {
            navigate(location.pathname, { replace: true, state: null })
        }
    }

    return (
        <section
            ref={sectionRef}
            className={`city-itineraries surface-light surface-band ${isSectionOpen ? 'is-open' : ''}`.trim()}
            aria-label={copy.eyebrow}
        >
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title(city.name)} variant="accent">
                <div className="city-itineraries-overview">
                    <p className="city-itineraries-intro">{copy.intro(city.name)}</p>
                    <div className="city-itineraries-inclusions">
                        <span>{copy.inclusionsLabel}</span>
                        <ul>
                            {copy.inclusions.map((inclusion) => (
                                <li key={inclusion}>{inclusion}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="city-itineraries-toggle-row">
                    <button
                        type="button"
                        className="primary-button city-itineraries-toggle"
                        aria-expanded={isSectionOpen}
                        aria-controls={contentId}
                        onClick={toggle}
                    >
                        {isSectionOpen ? copy.hide : copy.show(catalog.plans.length)}
                        <span className="city-itineraries-chevron" aria-hidden="true" />
                    </button>
                    {isSectionOpen ? null : (
                        <span className="city-itineraries-teaser">{copy.fromPrice(formatCop(lowestTotal, locale))}</span>
                    )}
                </div>
            </SectionHeader>

            {city.id === ITINERARY_RULES.guatape.cityId && unavailablePlanIds.length > 0 ? (
                <aside className="city-itineraries-construction-note">
                    <span className="city-itineraries-construction-indicator" aria-hidden="true" />
                    <div>
                        <strong>{copy.availabilityLabel}</strong>
                        <p>{copy.comingSoon}</p>
                    </div>
                </aside>
            ) : null}

            <Collapsible id={contentId} isOpen={isSectionOpen}>
                <FilterChips
                    label={copy.durationAriaLabel}
                    options={planOptions}
                    value={plan.id}
                    onChange={(planId) => {
                        setSelectedPlanId(planId)
                        setIsOpen(true)
                        setDismissedQuoteLocationKey(location.key)
                        window.requestAnimationFrame(() => {
                            selectedPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        })
                    }}
                />

                <p ref={selectedPlanRef} className="city-itineraries-selected-plan" aria-live="polite">
                    <span className="city-itineraries-selected-plan-indicator" aria-hidden="true" />
                    <span>{copy.selectedPlan}: </span>
                    <strong>{localize(plan.name)}</strong>
                </p>

                <div className="city-itineraries-body">
                    <ItineraryTimeline plan={plan} catalog={catalog} />
                    <ItineraryCostSummary
                        plan={plan}
                        catalog={catalog}
                        cityId={city.id}
                        shouldOpenQuote={requestedQuotePlan?.id === plan.id}
                        onQuoteClosed={() => navigate(location.pathname, { replace: true, state: null })}
                    />
                </div>
            </Collapsible>
        </section>
    )
}
