import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import type { CityItineraries, ItineraryPlan } from '../../types'
import { getPlanCostBreakdown } from '../../utils/planCosts'
import './ItineraryCostSummary.css'

type ItineraryCostSummaryProps = {
    plan: ItineraryPlan
    catalog: CityItineraries
    cityId: string
}

/** Per-person price of a plan, grouped by category, with a shortcut to the trip planner. */
export function ItineraryCostSummary({ plan, catalog, cityId }: ItineraryCostSummaryProps) {
    const { openPlanner } = useTrip()
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.costs
    const { groups, total } = getPlanCostBreakdown(plan, catalog)
    const money = (amount: number) => formatCop(amount, locale)

    return (
        <aside className="itinerary-cost-summary dark-card" aria-label={copy.eyebrow}>
            <span className="eyebrow">{copy.eyebrow}</span>

            {groups.map((group) => (
                <section key={group.category} className="itinerary-cost-group">
                    <header>
                        <h4>{copy.categories[group.category]}</h4>
                        <span>{money(group.subtotal)}</span>
                    </header>
                    <ul>
                        {group.lines.map((line) => (
                            <li key={line.item.id}>
                                <span>{localize(line.item.label)}</span>
                                <small>{copy.quantity(line.quantity, money(line.item.unitPrice))}</small>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            <div className="itinerary-cost-total">
                <span>{copy.total}</span>
                <strong>{money(total)}</strong>
            </div>

            <button type="button" className="primary-button" onClick={() => openPlanner(cityId)}>
                {t.common.header.planTrip}
            </button>

            <p className="itinerary-cost-disclaimer">{copy.disclaimer}</p>
        </aside>
    )
}
