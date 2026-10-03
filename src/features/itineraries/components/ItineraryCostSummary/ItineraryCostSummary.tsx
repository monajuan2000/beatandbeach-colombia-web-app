import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTrip } from '@/features/trip/context/TripContext'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCop } from '@/utils/currency'
import type { CityItineraries, ItineraryPlan } from '../../types'
import { getPlanCostBreakdown } from '../../utils/planCosts'
import './ItineraryCostSummary.css'

const COPY_EMAIL = 'monajuan236@gmail.com'
const ITINERARY_SUBMIT_ENDPOINT = '/api/send-itinerary'

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
    const [quoteEmail, setQuoteEmail] = useState('')
    const [showQuoteEmailForm, setShowQuoteEmailForm] = useState(false)
    const [quoteEmailError, setQuoteEmailError] = useState('')
    const [isSendingQuote, setIsSendingQuote] = useState(false)
    const [sendQuoteMessage, setSendQuoteMessage] = useState('')
    const { groups, total } = getPlanCostBreakdown(plan, catalog)
    const money = (amount: number) => formatCop(amount, locale)
    const isGuatapePlan = cityId === 'guatape'
    const isPlanUnderReview = isGuatapePlan && ['guatape-2-days', 'guatape-3-days'].includes(plan.id)

    const buildQuoteEmailTemplate = (recipientEmail: string) => {
        const itineraryBody = [
            'Beat & Beach Colombia',
            '---------------------',
            `Plan turístico: ${localize(plan.name)}`,
            `Correo del cliente: ${recipientEmail}`,
            `Copia del equipo: ${COPY_EMAIL}`,
            '',
            'Itinerario:',
            ...plan.days.flatMap((day, dayIndex) => [
                `${t.itineraries.timeline.day(dayIndex + 1)} · ${localize(day.title)}`,
                ...day.stops.map((stop) => `- ${stop.time} · ${localize(stop.title)}`),
                '',
            ]),
            'Resumen de costos:',
            ...groups.map((group) => `- ${copy.categories[group.category]}: ${money(group.subtotal)}`),
            `Total estimado: ${money(total)}`,
            '',
            'Gracias por tu interés en esta experiencia de Beat & Beach Colombia.',
        ].join('\n')

        return {
            subject: `${localize(plan.name)} · Itinerario solicitado`,
            body: itineraryBody,
        }
    }

    const handleQuotePlan = () => {
        if (!isPlanUnderReview) {
            setQuoteEmail('')
            setShowQuoteEmailForm(false)
            setQuoteEmailError('')
            setIsSendingQuote(false)
            setSendQuoteMessage('')
            setIsQuoteModalOpen(true)
        }
    }

    const handleConfirmPlan = async () => {
        if (isPlanUnderReview) return

        if (!showQuoteEmailForm) {
            setShowQuoteEmailForm(true)
            setQuoteEmailError('')
            setSendQuoteMessage('')
            return
        }

        const normalizedEmail = quoteEmail.trim()
        if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
            setQuoteEmailError(copy.quoteModal.emailError)
            return
        }

        const { subject, body } = buildQuoteEmailTemplate(normalizedEmail)
        setIsSendingQuote(true)
        setQuoteEmailError('')
        setSendQuoteMessage('')

        try {
            const response = await fetch(ITINERARY_SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    to: normalizedEmail,
                    cc: COPY_EMAIL,
                    subject,
                    text: body,
                    html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${body
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')}</pre>`,
                }),
            })

            const result = (await response.json().catch(() => ({}))) as { message?: string }

            if (!response.ok) {
                throw new Error(result.message ?? `Itinerary submission failed with status ${response.status}`)
            }

            setQuoteEmail('')
            setShowQuoteEmailForm(false)
            setSendQuoteMessage(copy.quoteModal.sentSuccess)
            setIsQuoteModalOpen(false)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to send email.'
            setSendQuoteMessage(message)
            setShowQuoteEmailForm(true)
        } finally {
            setIsSendingQuote(false)
        }
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

                        <div className="action-row modal-actions itinerary-quote-actions">
                            {!showQuoteEmailForm ? (
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={handleConfirmPlan}
                                    disabled={isPlanUnderReview || isSendingQuote}
                                >
                                    {isSendingQuote ? copy.quoteModal.sending : copy.quoteModal.confirm}
                                </button>
                            ) : null}

                            {showQuoteEmailForm ? (
                                <div className="itinerary-quote-email-form">
                                    <label className="itinerary-quote-email-field">
                                        <span>{copy.quoteModal.emailLabel}</span>
                                        <input
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={quoteEmail}
                                            onChange={(event) => {
                                                setQuoteEmail(event.target.value)
                                                if (quoteEmailError) setQuoteEmailError('')
                                            }}
                                            placeholder={copy.quoteModal.emailPlaceholder}
                                        />
                                    </label>
                                    {quoteEmailError ? (
                                        <small className="itinerary-quote-email-error">{quoteEmailError}</small>
                                    ) : null}
                                    {sendQuoteMessage ? (
                                        <small className="itinerary-quote-email-status">{sendQuoteMessage}</small>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="primary-button"
                                        onClick={handleConfirmPlan}
                                        disabled={isSendingQuote}
                                    >
                                        {isSendingQuote ? copy.quoteModal.sending : copy.quoteModal.send}
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    )
}
