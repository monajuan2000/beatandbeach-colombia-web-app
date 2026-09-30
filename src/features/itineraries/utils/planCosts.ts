import type { CityItineraries, CostCategory, ItineraryPlan, PriceItem } from '../types'

/** Order in which categories are listed in the breakdown. */
const CATEGORY_ORDER: CostCategory[] = ['transport', 'insurance', 'meals', 'lodging', 'attractions']

export type CostLine = {
    item: PriceItem
    quantity: number
    subtotal: number
}

export type CostGroup = {
    category: CostCategory
    lines: CostLine[]
    subtotal: number
}

export type PlanCostBreakdown = {
    groups: CostGroup[]
    total: number
}

export function findPriceItem(catalog: CityItineraries, priceId: string | undefined) {
    return priceId ? catalog.prices.find((item) => item.id === priceId) : undefined
}

/**
 * Per-person cost of a plan, derived from the priced stops of its schedule plus the
 * daily items (such as insurance), so the breakdown always matches the itinerary shown.
 */
export function getPlanCostBreakdown(plan: ItineraryPlan, catalog: CityItineraries): PlanCostBreakdown {
    const quantities = new Map<string, number>()
    const add = (priceId: string, quantity: number) =>
        quantities.set(priceId, (quantities.get(priceId) ?? 0) + quantity)

    for (const day of plan.days) {
        for (const stop of day.stops) {
            if (stop.priceId) add(stop.priceId, 1)
        }
    }
    for (const priceId of catalog.dailyPriceIds) add(priceId, plan.days.length)

    const lines: CostLine[] = catalog.prices
        .filter((item) => quantities.has(item.id))
        .map((item) => {
            const quantity = quantities.get(item.id) ?? 0
            return { item, quantity, subtotal: item.unitPrice * quantity }
        })

    const groups = CATEGORY_ORDER.map((category) => {
        const categoryLines = lines.filter((line) => line.item.category === category)
        return {
            category,
            lines: categoryLines,
            subtotal: categoryLines.reduce((sum, line) => sum + line.subtotal, 0),
        }
    }).filter((group) => group.lines.length > 0)

    return { groups, total: groups.reduce((sum, group) => sum + group.subtotal, 0) }
}
