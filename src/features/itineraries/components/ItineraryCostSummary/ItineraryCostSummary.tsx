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

function escapeHtml(value: string) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

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
        const itineraryDays = plan.days.map((day, dayIndex) => ({
            title: `${t.itineraries.timeline.day(dayIndex + 1)} · ${localize(day.title)}`,
            stops: day.stops.map((stop) => ({ time: stop.time, title: localize(stop.title) })),
        }))
        const costRows = groups.map((group) => ({
            label: copy.categories[group.category],
            value: money(group.subtotal),
        }))
        const planName = localize(plan.name)
        const planSummary = localize(plan.summary)
        const itineraryText = itineraryDays
            .map((day) => [day.title, ...day.stops.map((stop) => `${stop.time} · ${stop.title}`)].join('\n'))
            .join('\n\n')
        const body = [
            'BEAT & BEACH COLOMBIA',
            'Tu próxima experiencia comienza aquí.',
            '',
            `Plan turístico: ${planName}`,
            planSummary,
            `Correo del cliente: ${recipientEmail}`,
            '',
            'ITINERARIO',
            itineraryText,
            '',
            'RESUMEN DE COSTOS POR PERSONA',
            ...costRows.map((row) => `${row.label}: ${row.value}`),
            `Total estimado por persona: ${money(total)}`,
            '',
            'Gracias por elegir Beat & Beach Colombia. Responde a este correo si tienes alguna pregunta.',
        ].join('\n')
        const itineraryHtml = itineraryDays
            .map(
                (day) => `
                    <tr>
                        <td colspan="2" style="padding:12px 14px;background:#eaf5f4;color:#12334a;font-size:15px;font-weight:bold;">
                            ${escapeHtml(day.title)}
                        </td>
                    </tr>
                    ${day.stops
                        .map(
                            (stop) => `
                                <tr>
                                    <td style="width:76px;padding:10px 14px;border-bottom:1px solid #e7edeb;color:#087f86;font-size:13px;font-weight:bold;vertical-align:top;">
                                        ${escapeHtml(stop.time)}
                                    </td>
                                    <td style="padding:10px 14px;border-bottom:1px solid #e7edeb;color:#263b46;font-size:14px;line-height:1.5;">
                                        ${escapeHtml(stop.title)}
                                    </td>
                                </tr>
                            `,
                        )
                        .join('')}
                `,
            )
            .join('')
        const costRowsHtml = costRows
            .map(
                (row) => `
                    <tr>
                        <td style="padding:10px 14px;border-bottom:1px solid #e7edeb;color:#40545d;font-size:14px;">${escapeHtml(row.label)}</td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e7edeb;color:#12334a;font-size:14px;font-weight:bold;text-align:right;white-space:nowrap;">${escapeHtml(row.value)}</td>
                    </tr>
                `,
            )
            .join('')
        const html = `
            <!doctype html>
            <html lang="es">
                <body style="margin:0;padding:0;background-color:#edf3f2;font-family:Arial,Helvetica,sans-serif;color:#263b46;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#edf3f2;">
                        <tr>
                            <td align="center" style="padding:28px 12px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background-color:#ffffff;border:1px solid #dfe8e6;">
                                    <tr>
                                        <td align="center" style="padding:24px 24px 18px;background-color:#0d263b;">
                                            <img src="https://raw.githubusercontent.com/monajuan2000/beatandbeach-colombia-web-app/main/src/assets/images/brand/beat-and-beach-logo.png" width="240" alt="Beat &amp; Beach Colombia" style="display:block;width:240px;max-width:100%;height:auto;border:0;" />
                                            <p style="margin:14px 0 0;color:#9de8df;font-size:11px;font-weight:bold;letter-spacing:1px;">MUSIC FESTIVAL TRAVEL CO.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:30px 30px 24px;">
                                            <p style="margin:0 0 10px;color:#07848a;font-size:11px;font-weight:bold;letter-spacing:1px;">TU COTIZACIÓN DE VIAJE</p>
                                            <h1 style="margin:0 0 12px;color:#12334a;font-size:26px;line-height:1.2;">Tu próxima experiencia comienza aquí</h1>
                                            <p style="margin:0;color:#5d7078;font-size:15px;line-height:1.6;">Preparamos esta propuesta para que disfrutes Colombia a tu ritmo. Aquí encontrarás el plan, sus actividades y el resumen de costos.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 30px 24px;">
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f8f7;border-left:4px solid #11a6a1;">
                                                <tr><td style="padding:16px 18px 4px;color:#07848a;font-size:11px;font-weight:bold;letter-spacing:1px;">PLAN SELECCIONADO</td></tr>
                                                <tr><td style="padding:0 18px 8px;color:#12334a;font-size:20px;font-weight:bold;line-height:1.35;">${escapeHtml(planName)}</td></tr>
                                                <tr><td style="padding:0 18px 16px;color:#52666f;font-size:14px;line-height:1.6;">${escapeHtml(planSummary)}</td></tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 30px 26px;">
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tr><td style="padding:0 0 12px;color:#12334a;font-size:18px;font-weight:bold;">Tu itinerario</td></tr>
                                                ${itineraryHtml}
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 30px 28px;">
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e2eae7;">
                                                <tr><th colspan="2" style="padding:14px;text-align:left;background-color:#f5f8f7;color:#12334a;font-size:16px;">Resumen de costos por persona</th></tr>
                                                ${costRowsHtml}
                                                <tr>
                                                    <td style="padding:15px 14px;background-color:#0d263b;color:#ffffff;font-size:14px;font-weight:bold;">Total estimado</td>
                                                    <td style="padding:15px 14px;background-color:#0d263b;color:#9de8df;font-size:18px;font-weight:bold;text-align:right;white-space:nowrap;">${escapeHtml(money(total))}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:22px 30px;background-color:#f5f8f7;color:#52666f;font-size:13px;line-height:1.6;text-align:center;">
                                            Gracias por elegir <strong style="color:#12334a;">Beat &amp; Beach Colombia</strong>.<br />Responde a este correo si tienes alguna pregunta sobre tu plan.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `

        return {
            subject: `${planName} | Tu experiencia con Beat & Beach Colombia`,
            body,
            html,
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

        const { subject, body, html } = buildQuoteEmailTemplate(normalizedEmail)
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
                    html,
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
