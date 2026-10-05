import type { QuotePdfContent } from './downloadQuotePdf'

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }
        return entities[character]
    })
}

export function buildQuoteEmailBody(quote: QuotePdfContent) {
    const daysText = quote.days.map((day, index) => [
        `${quote.labels.day(index + 1)} - ${day.title}`,
        ...day.stops.map((stop) => `  ${stop.time}  ${stop.title}${stop.description ? ` — ${stop.description}` : ''}${stop.isTentative ? ` (${quote.labels.tentative})` : ''}`),
    ].join('\n')).join('\n\n')
    const costsText = quote.costs.map((cost) => `${cost.label}: ${cost.value}`).join('\n')
    const text = [
        quote.labels.headline,
        quote.planName,
        quote.summary,
        '',
        quote.labels.itinerary,
        daysText,
        '',
        quote.labels.costSummary,
        costsText,
        `${quote.labels.total}: ${quote.total}`,
        '',
        quote.disclaimer,
        quote.labels.closing,
        quote.labels.brandName,
    ].join('\n')

    const daySections = quote.days.map((day, index) => `
        <h3 style="margin:20px 0 8px;color:#0d263b">${escapeHtml(quote.labels.day(index + 1))} · ${escapeHtml(day.title)}</h3>
        <table role="presentation" style="width:100%;border-collapse:collapse">
            ${day.stops.map((stop) => `
                <tr>
                    <td style="padding:8px 10px;border-bottom:1px solid #dfe8e6;color:#08848a;white-space:nowrap;vertical-align:top">${escapeHtml(stop.time)}</td>
                    <td style="padding:8px 10px;border-bottom:1px solid #dfe8e6;color:#263b46">
                        <strong>${escapeHtml(stop.title)}</strong>
                        ${stop.description ? `<div style="margin-top:4px;color:#52666f">${escapeHtml(stop.description)}</div>` : ''}
                        ${stop.isTentative ? `<div style="margin-top:4px;color:#08848a;font-size:12px">${escapeHtml(quote.labels.tentative)}</div>` : ''}
                    </td>
                </tr>`).join('')}
        </table>`).join('')

    const costRows = quote.costs.map((cost) => `
        <tr><td style="padding:8px 10px;border-bottom:1px solid #dfe8e6">${escapeHtml(cost.label)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #dfe8e6;text-align:right"><strong>${escapeHtml(cost.value)}</strong></td></tr>`).join('')
    const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#edf3f2;font-family:Arial,sans-serif;color:#263b46">
        <main style="max-width:680px;margin:0 auto;padding:28px;background:#fff;border-radius:16px">
            <p style="margin:0 0 8px;color:#08848a;font-weight:bold;letter-spacing:2px">${escapeHtml(quote.labels.brandName)}</p>
            <p style="margin:0 0 24px;color:#52666f">${escapeHtml(quote.labels.quoteLabel)}</p>
            <h1 style="margin:0 0 12px;color:#0d263b">${escapeHtml(quote.labels.headline)}</h1>
            <p style="color:#52666f;line-height:1.6">${escapeHtml(quote.labels.intro)}</p>
            <section style="margin:24px 0;padding:18px;background:#eaf5f4;border-radius:12px">
                <p style="margin:0 0 6px;color:#08848a;font-size:12px;font-weight:bold">${escapeHtml(quote.labels.selectedPlan)}</p>
                <h2 style="margin:0 0 8px;color:#0d263b">${escapeHtml(quote.planName)}</h2>
                <p style="margin:0;color:#52666f;line-height:1.5">${escapeHtml(quote.summary)}</p>
            </section>
            <h2 style="color:#0d263b">${escapeHtml(quote.labels.itinerary)}</h2>
            ${daySections}
            <h2 style="margin-top:28px;color:#0d263b">${escapeHtml(quote.labels.costSummary)}</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse">${costRows}
                <tr><td style="padding:12px 10px;font-weight:bold">${escapeHtml(quote.labels.total)}</td>
                <td style="padding:12px 10px;text-align:right;font-weight:bold;color:#08848a">${escapeHtml(quote.total)}</td></tr>
            </table>
            <p style="margin-top:24px;color:#52666f;font-size:13px;line-height:1.5">${escapeHtml(quote.disclaimer)}</p>
            <p style="margin-top:24px;line-height:1.5">${escapeHtml(quote.labels.closing)}<br><strong>${escapeHtml(quote.labels.brandName)}</strong></p>
        </main></body></html>`

    return { text, html }
}
