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

export function buildQuoteEmailBody(quote: QuotePdfContent, contactMessage = '', logoUrl = '') {
    const divider = '----------------------------------------'
    const daysText = quote.days.map((day, index) => [
        `${quote.labels.day(index + 1)} - ${day.title}`,
        day.stops.map((stop) => `  ${stop.time}  ${stop.title}${stop.description ? ` — ${stop.description}` : ''}${stop.isTentative ? ` (${quote.labels.tentative})` : ''}`).join(`\n  ${divider}\n`),
    ].join('\n')).join('\n\n')
    const costsText = quote.costs.map((cost) =>
        `${cost.label} — ${quote.labels.perPerson}: ${cost.value}; ${quote.labels.groupAmount}: ${cost.groupValue}`,
    ).join('\n')
    const tripDetailsRows = [
        `${quote.labels.destination}: ${quote.tripDetails.destination}`,
        `${quote.labels.availableTourDate}: ${quote.tripDetails.availableTourDate}`,
        `${quote.labels.departureDate}: ${quote.tripDetails.departureDate}`,
        `${quote.labels.travelers}: ${quote.tripDetails.travelers}`,
        `${quote.labels.interests}: ${quote.tripDetails.interests.join(', ') || quote.labels.noneSelected}`,
    ]
    const tripDetailsText = [quote.labels.tripDetails, ...tripDetailsRows].join('\n')
    const text = [
        quote.labels.brandName,
        quote.labels.tagline,
        quote.labels.quoteLabel,
        quote.labels.headline,
        divider,
        quote.labels.intro,
        divider,
        quote.labels.customerDetails,
        `${quote.labels.customerName}: ${quote.customer.fullName}`,
        `${quote.labels.customerDocumentType}: ${quote.customer.documentType}`,
        `${quote.labels.customerDocumentNumber}: ${quote.customer.documentNumber}`,
        `${quote.labels.customerEmail}: ${quote.customer.email}`,
        `${quote.labels.customerPhone}: +${quote.customer.phoneCountryCode} ${quote.customer.phone}`,
        divider,
        quote.labels.selectedPlan,
        quote.planName,
        quote.summary,
        '',
        tripDetailsText,
        '',
        quote.labels.itinerary,
        daysText,
        '',
        quote.labels.costSummary,
        costsText,
        divider,
        `${quote.labels.total}: ${quote.total}`,
        `${quote.labels.groupTotal(quote.tripDetails.travelers)}: ${quote.groupTotal}`,
        '',
        quote.labels.closing,
        quote.disclaimer,
        quote.labels.brandName,
        ...(contactMessage ? ['', contactMessage] : []),
    ].join('\n')

    const daySections = quote.days.map((day, index) => `
        <table role="presentation" width="100%" style="width:100%;margin:0 0 12px;border-collapse:collapse;background:#fff">
            <tr><td colspan="2" style="padding:8px 10px;background:#eaf5f4;color:#0d263b;font-weight:bold;font-size:14px">${escapeHtml(quote.labels.day(index + 1))} · ${escapeHtml(day.title)}</td></tr>
            ${day.stops.map((stop) => `
                <tr>
                    <td width="66" style="width:66px;padding:8px 10px;color:#08848a;white-space:nowrap;vertical-align:top;font-size:13px">${escapeHtml(stop.time)}</td>
                    <td style="padding:8px 10px;color:#263b46;font-size:14px">
                        <strong>${escapeHtml(stop.title)}</strong>
                        ${stop.description ? `<div style="margin-top:4px;color:#52666f;font-size:12px;line-height:1.5">${escapeHtml(stop.description)}</div>` : ''}
                        ${stop.isTentative ? `<div style="margin-top:4px;color:#08848a;font-size:11px">${escapeHtml(quote.labels.tentative)}</div>` : ''}
                    </td>
                </tr>
                <tr><td colspan="2" style="padding:0 10px"><div style="height:1px;background:#dfe8e6;line-height:1px;font-size:1px">&nbsp;</div></td></tr>`).join('')}
        </table>`).join('')

    const costRows = quote.costs.map((cost) => `
        <tr><td style="padding:8px 10px;border-bottom:1px solid #dfe8e6;color:#52666f;font-size:14px">${escapeHtml(cost.label)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #dfe8e6;text-align:right;color:#0d263b;font-size:12px">
            ${escapeHtml(quote.labels.perPerson)}: <strong>${escapeHtml(cost.value)}</strong><br>
            ${escapeHtml(quote.labels.groupAmount)}: <strong>${escapeHtml(cost.groupValue)}</strong>
        </td></tr>`).join('')
    const tripDetailsHtml = `<table role="presentation" width="100%" style="width:100%;margin:0 0 20px;border-collapse:collapse;background:#fff">
        <tr><td style="padding:12px 16px;border-left:3px solid #08848a">
            <p style="margin:0 0 8px;color:#08848a;font-size:11px;font-weight:bold">${escapeHtml(quote.labels.tripDetails)}</p>
            ${tripDetailsRows.map((row) => `<p style="margin:0 0 4px;color:#263b46;font-size:13px">${escapeHtml(row)}</p>`).join('')}
        </td></tr>
    </table>`
    const contactSection = contactMessage
        ? `<table role="presentation" width="100%" style="width:100%;margin-top:16px;border-collapse:collapse;background:#fff"><tr><td style="padding:16px;color:#52666f;font-size:13px;line-height:1.6">${escapeHtml(contactMessage).replace(/\n/g, '<br>')}</td></tr></table>`
        : ''
    const logo = logoUrl
        ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(quote.labels.brandName)}" width="180" style="display:block;width:180px;max-width:100%;height:auto;margin:0 auto 8px">`
        : `<p style="margin:0 0 8px;color:#fff;font-size:22px;font-weight:bold">${escapeHtml(quote.labels.brandName)}</p>`
    const html = `<table role="presentation" width="100%" style="width:100%;margin:0;border-collapse:collapse;background:#edf3f2;font-family:Arial,sans-serif;color:#263b46">
        <tr><td align="center" style="padding:20px 10px">
            <table role="presentation" width="100%" style="width:100%;max-width:680px;border-collapse:collapse">
                <tr><td align="center" style="padding:18px 20px 16px;background:#0d263b;border-radius:8px 8px 0 0">
                    ${logo}
                    <p style="margin:0;color:#9de8df;font-size:11px;font-weight:bold;letter-spacing:1px">${escapeHtml(quote.labels.tagline)}</p>
                </td></tr>
                <tr><td style="padding:22px 24px;background:#edf3f2">
                    <p style="margin:0 0 8px;color:#08848a;font-size:12px;font-weight:bold">${escapeHtml(quote.labels.quoteLabel)}</p>
                    <h1 style="margin:0 0 12px;color:#0d263b;font-size:26px;line-height:1.25">${escapeHtml(quote.labels.headline)}</h1>
                    <hr style="margin:16px 0;border:0;border-top:1px solid #dfe8e6">
                    <p style="margin:0;color:#52666f;font-size:14px;line-height:1.6">${escapeHtml(quote.labels.intro)}</p>
                    <hr style="margin:16px 0 20px;border:0;border-top:1px solid #dfe8e6">
                    <table role="presentation" width="100%" style="width:100%;margin:0 0 16px;border-collapse:collapse;background:#fff">
                        <tr><td style="padding:12px 16px;border-left:3px solid #08848a">
                            <p style="margin:0 0 8px;color:#08848a;font-size:11px;font-weight:bold">${escapeHtml(quote.labels.customerDetails)}</p>
                            <p style="margin:0 0 4px;color:#263b46;font-size:13px"><strong>${escapeHtml(quote.labels.customerName)}:</strong> ${escapeHtml(quote.customer.fullName)}</p>
                            <p style="margin:0 0 4px;color:#263b46;font-size:13px"><strong>${escapeHtml(quote.labels.customerDocumentType)}:</strong> ${escapeHtml(quote.customer.documentType)}</p>
                            <p style="margin:0 0 4px;color:#263b46;font-size:13px"><strong>${escapeHtml(quote.labels.customerDocumentNumber)}:</strong> ${escapeHtml(quote.customer.documentNumber)}</p>
                            <p style="margin:0 0 4px;color:#263b46;font-size:13px"><strong>${escapeHtml(quote.labels.customerEmail)}:</strong> ${escapeHtml(quote.customer.email)}</p>
                            <p style="margin:0;color:#263b46;font-size:13px"><strong>${escapeHtml(quote.labels.customerPhone)}:</strong> +${escapeHtml(quote.customer.phoneCountryCode)} ${escapeHtml(quote.customer.phone)}</p>
                        </td></tr>
                    </table>
                    <table role="presentation" width="100%" style="width:100%;margin:0 0 20px;border-collapse:collapse;background:#fff">
                        <tr><td style="padding:14px 16px;border-left:3px solid #08848a">
                            <p style="margin:0 0 6px;color:#08848a;font-size:11px;font-weight:bold">${escapeHtml(quote.labels.selectedPlan)}</p>
                            <h2 style="margin:0 0 8px;color:#0d263b;font-size:19px">${escapeHtml(quote.planName)}</h2>
                            <p style="margin:0;color:#52666f;font-size:13px;line-height:1.5">${escapeHtml(quote.summary)}</p>
                        </td></tr>
                    </table>
                    ${tripDetailsHtml}
                    <h2 style="margin:0 0 10px;color:#0d263b;font-size:18px">${escapeHtml(quote.labels.itinerary)}</h2>
                    ${daySections}
                    <h2 style="margin:22px 0 10px;color:#0d263b;font-size:18px">${escapeHtml(quote.labels.costSummary)}</h2>
                    <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;background:#fff">${costRows}</table>
                    <table role="presentation" width="100%" style="width:100%;margin-top:8px;border-collapse:collapse;background:#0d263b;border-radius:6px">
                        <tr><td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:bold">${escapeHtml(quote.labels.total)}</td>
                        <td style="padding:8px 12px;text-align:right;color:#9de8df;font-size:15px;font-weight:bold">${escapeHtml(quote.total)}</td></tr>
                        <tr><td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:bold">${escapeHtml(quote.labels.groupTotal(quote.tripDetails.travelers))}</td>
                        <td style="padding:8px 12px;text-align:right;color:#9de8df;font-size:15px;font-weight:bold">${escapeHtml(quote.groupTotal)}</td></tr>
                    </table>
                    <table role="presentation" width="100%" style="width:100%;margin-top:16px;border-collapse:collapse;background:#fff">
                        <tr><td align="center" style="padding:14px 16px 6px;color:#52666f;font-size:13px;line-height:1.5">${escapeHtml(quote.labels.closing)}</td></tr>
                        <tr><td style="padding:4px 16px 14px;color:#52666f;font-size:12px;line-height:1.5">${escapeHtml(quote.disclaimer)}</td></tr>
                    </table>
                    ${contactSection}
                </td></tr>
                <tr><td style="padding:10px 4px;border-top:1px solid #dfe8e6;color:#52666f;font-size:11px">${escapeHtml(quote.labels.brandName)}</td></tr>
            </table>
        </td></tr>
    </table>`

    return { text, html }
}
