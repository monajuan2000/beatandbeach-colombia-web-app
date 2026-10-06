import { formatCop } from '@/utils/currency'
import type { LocalizedText } from '@/i18n/types'
import type { CostCategory, ItineraryPlan } from '../types'
import type { QuoteCustomerDetails, QuotePdfContent } from './downloadQuotePdf'
import type { getPlanCostBreakdown } from './planCosts'

type CostBreakdown = ReturnType<typeof getPlanCostBreakdown>

type BuildQuotePdfContentOptions = {
    plan: ItineraryPlan
    locale: string
    localize: (value: LocalizedText) => string
    categories: Record<CostCategory, string>
    disclaimer: string
    labels: QuotePdfContent['labels']
    breakdown: CostBreakdown
    customer: QuoteCustomerDetails
    tripDetails: QuotePdfContent['tripDetails']
}

export function buildQuotePdfContent({
    plan,
    locale,
    localize,
    categories,
    disclaimer,
    labels,
    breakdown,
    customer,
    tripDetails,
}: BuildQuotePdfContentOptions): QuotePdfContent {
    return {
        customer: {
            fullName: customer.fullName.trim(),
            documentType: labels.documentTypes[customer.documentType],
            documentNumber: customer.documentNumber.trim(),
            email: customer.email.trim(),
            phoneCountryCode: customer.phoneCountryCode,
            phone: customer.phone.trim(),
        },
        tripDetails,
        planName: localize(plan.name),
        summary: localize(plan.summary),
        days: plan.days.map((day) => ({
            title: localize(day.title),
            stops: day.stops.map((stop) => ({
                time: stop.time,
                title: localize(stop.title),
                description: localize(stop.description),
                isTentative: stop.isTentative,
            })),
        })),
        costs: breakdown.groups.map((group) => ({
            label: categories[group.category],
            value: formatCop(group.subtotal, locale),
            groupValue: formatCop(group.subtotal * tripDetails.travelers, locale),
        })),
        total: formatCop(breakdown.total, locale),
        groupTotal: formatCop(breakdown.total * tripDetails.travelers, locale),
        disclaimer,
        labels,
    }
}
