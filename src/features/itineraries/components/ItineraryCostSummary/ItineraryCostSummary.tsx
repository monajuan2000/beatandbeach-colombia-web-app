import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
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
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
    const { groups, total } = getPlanCostBreakdown(plan, catalog)
    const money = (amount: number) => formatCop(amount, locale)
    const isGuatapePlan = cityId === 'guatape'
    const isPlanUnderReview = isGuatapePlan && ['guatape-2-days', 'guatape-3-days'].includes(plan.id)

    const handleQuotePlan = () => {
        if (!isPlanUnderReview) setIsQuoteModalOpen(true)
    }

    const handleConfirmPlan = () => {
        if (!isPlanUnderReview) setIsQuoteModalOpen(false)
    }

    return (
        <>
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

                <button
                    type="button"
                    className="primary-button"
                    onClick={() => !isPlanUnderReview && openPlanner(cityId)}
                    disabled={isPlanUnderReview}
                >
                    {t.common.header.planTrip}
                </button>

                {isGuatapePlan ? (
                    <div className="itinerary-cost-actions">
                        <button
                            type="button"
                            className="primary-button"
                            onClick={handleQuotePlan}
                            disabled={isPlanUnderReview}
                        >
                            {copy.quotePlan}
                        </button>
                    </div>
                ) : null}

                {isPlanUnderReview ? <p className="itinerary-cost-review-note">{copy.reviewMessage}</p> : null}

                <p className="itinerary-cost-disclaimer">{copy.disclaimer}</p>
            </aside>

            {isGuatapePlan ? (
                <Modal
                    isOpen={isQuoteModalOpen}
                    onClose={() => setIsQuoteModalOpen(false)}
                    labelledBy="itinerary-quote-title"
                    closeLabel={t.common.close}
                    wide
                >
                    <div className="modal-body itinerary-quote-modal">
                        <span className="eyebrow">{copy.quoteModal.eyebrow}</span>
                        <h3 id="itinerary-quote-title">{copy.quoteModal.title}</h3>

                        <div className="itinerary-quote-summary">
                            <span>{copy.quoteModal.planLabel}</span>
                            <strong>{localize(plan.name)}</strong>
                            <p>{localize(plan.summary)}</p>
                        </div>

                        <section className="itinerary-quote-section">
                            <h4>{copy.quoteModal.itinerary}</h4>
                            <div className="itinerary-quote-list">
                                {plan.days.map((day, dayIndex) => (
                                    <div key={`${plan.id}-day-${dayIndex}`} className="itinerary-quote-day">
                                        <strong>
                                            {t.itineraries.timeline.day(dayIndex + 1)} · {localize(day.title)}
                                        </strong>
                                        <ul>
                                            {day.stops.map((stop) => (
                                                <li key={`${dayIndex}-${stop.title.en ?? stop.title.es}`}>
                                                    <span>{stop.time}</span>
                                                    <span>{localize(stop.title)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="itinerary-quote-section">
                            <h4>{copy.quoteModal.costSummary}</h4>
                            <div className="itinerary-quote-cost-list">
                                {groups.map((group) => (
                                    <div key={group.category} className="itinerary-quote-cost-item">
                                        <span>{copy.categories[group.category]}</span>
                                        <strong>{money(group.subtotal)}</strong>
                                    </div>
                                ))}
                            </div>
                            <div className="itinerary-quote-total">
                                <span>{copy.total}</span>
                                <strong>{money(total)}</strong>
                            </div>
                        </section>

                        <div className="action-row modal-actions">
                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleConfirmPlan}
                                disabled={isPlanUnderReview}
                            >
                                {copy.quoteModal.confirm}
                            </button>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    )
}
