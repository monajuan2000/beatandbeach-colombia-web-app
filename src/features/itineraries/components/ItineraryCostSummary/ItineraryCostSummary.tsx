import { useMemo, useState } from 'react'
import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import { ITINERARY_RULES, isPlanUnderReview, isQuoteablePlan } from '../../config'
import type { CityItineraries, ItineraryPlan } from '../../types'
import { getPlanCostBreakdown } from '../../utils/planCosts'
import { ItineraryQuoteModal } from '../ItineraryQuoteModal/ItineraryQuoteModal'
import './ItineraryCostSummary.css'

type ItineraryCostSummaryProps = {
    plan: ItineraryPlan
    catalog: CityItineraries
    cityId: string
}

/** Shows a plan's cost breakdown and opens quote actions when the plan supports them. */
export function ItineraryCostSummary({ plan, catalog, cityId }: ItineraryCostSummaryProps) {
    const { openPlanner } = useTrip()
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.costs
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
    const breakdown = useMemo(() => getPlanCostBreakdown(plan, catalog), [catalog, plan])
    const isQuoteCity = cityId === ITINERARY_RULES.guatape.cityId
    const canQuotePlan = isQuoteablePlan(cityId, plan.id)
    const planUnderReview = isPlanUnderReview(cityId, plan.id)

    return (
        <>
            <aside className="itinerary-cost-summary dark-card" aria-label={copy.eyebrow}>
                <span className="eyebrow">{copy.eyebrow}</span>

                {breakdown.groups.map((group) => (
                    <section key={group.category} className="itinerary-cost-group">
                        <header>
                            <h4>{copy.categories[group.category]}</h4>
                            <span>{formatCop(group.subtotal, locale)}</span>
                        </header>
                        <ul>
                            {group.lines.map((line) => (
                                <li key={line.item.id}>
                                    <span>{localize(line.item.label)}</span>
                                    <small>{copy.quantity(line.quantity, formatCop(line.item.unitPrice, locale))}</small>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <div className="itinerary-cost-total">
                    <span>{copy.total}</span>
                    <strong>{formatCop(breakdown.total, locale)}</strong>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={() => openPlanner(cityId)}
                    disabled={planUnderReview}
                >
                    {t.common.header.planTrip}
                </button>

                {isQuoteCity ? (
                    <div className="itinerary-cost-actions">
                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => setIsQuoteModalOpen(true)}
                            disabled={!canQuotePlan}
                        >
                            {copy.quotePlan}
                        </button>
                    </div>
                ) : null}

                {planUnderReview ? <p className="itinerary-cost-review-note">{copy.reviewMessage}</p> : null}
                <p className="itinerary-cost-disclaimer">{copy.disclaimer}</p>
            </aside>

            {isQuoteCity ? (
                <ItineraryQuoteModal
                    plan={plan}
                    breakdown={breakdown}
                    isOpen={isQuoteModalOpen}
                    onClose={() => setIsQuoteModalOpen(false)}
                />
            ) : null}
        </>
    )
}
