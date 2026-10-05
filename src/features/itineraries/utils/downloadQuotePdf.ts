import brandLogoData from '@/assets/images/brand/beat-and-beach-logo.png?inline'

type QuotePdfStop = {
    time: string
    title: string
    description: string
    isTentative?: boolean
}

export type QuotePdfContent = {
    planName: string
    summary: string
    days: { title: string; stops: QuotePdfStop[] }[]
    costs: { label: string; value: string }[]
    total: string
    disclaimer: string
    labels: {
        tagline: string
        quoteLabel: string
        headline: string
        intro: string
        selectedPlan: string
        itinerary: string
        day: (day: number) => string
        tentative: string
        costSummary: string
        total: string
        closing: string
        brandName: string
        page: (current: number, total: number) => string
    }
}

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN = 10
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const COLORS = {
    navy: [13, 38, 59] as const,
    teal: [8, 132, 138] as const,
    mint: [157, 232, 223] as const,
    ink: [38, 59, 70] as const,
    muted: [82, 102, 111] as const,
    line: [223, 232, 230] as const,
    pale: [234, 245, 244] as const,
    white: [255, 255, 255] as const,
    page: [237, 243, 242] as const,
}

export async function createQuotePdfFile(quote: QuotePdfContent, fileName: string) {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true })
    let y = 10

    const setTextColor = (color: readonly number[]) => pdf.setTextColor(color[0], color[1], color[2])
    const setFillColor = (color: readonly number[]) => pdf.setFillColor(color[0], color[1], color[2])
    const setDrawColor = (color: readonly number[]) => pdf.setDrawColor(color[0], color[1], color[2])
    const linesFor = (text: string, width: number, size: number) => {
        pdf.setFontSize(size)
        return pdf.splitTextToSize(text, width) as string[]
    }

    const startPage = () => {
        pdf.addPage()
        drawPageBackground()
        y = 18
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        setTextColor(COLORS.teal)
        pdf.text(quote.labels.brandName.toLocaleUpperCase(), MARGIN, y)
        setDrawColor(COLORS.line)
        pdf.setLineWidth(0.3)
        pdf.line(MARGIN, y + 3, PAGE_WIDTH - MARGIN, y + 3)
        y += 10
    }

    const ensureSpace = (height: number) => {
        if (y + height > PAGE_HEIGHT - 17) startPage()
    }

    const addWrappedText = (
        text: string,
        x: number,
        width: number,
        size: number,
        color: readonly number[],
        style: 'normal' | 'bold' = 'normal',
        lineHeight = size * 0.42,
    ) => {
        const lines = linesFor(text, width, size)
        pdf.setFont('helvetica', style)
        pdf.setFontSize(size)
        setTextColor(color)
        pdf.text(lines, x, y)
        y += lines.length * lineHeight
        return lines
    }

    const drawPageBackground = () => {
        setFillColor(COLORS.page)
        pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
    }

    drawPageBackground()

    // Branded masthead matching the email template; the image is bundled into the app.
    setFillColor(COLORS.navy)
    pdf.roundedRect(MARGIN, MARGIN, CONTENT_WIDTH, 59, 2, 2, 'F')
    pdf.addImage(brandLogoData, 'PNG', 74.4, 10.5, 61.2, 48.3)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    setTextColor(COLORS.mint)
    pdf.text(quote.labels.tagline, PAGE_WIDTH / 2, 64, { align: 'center' })
    y = 78

    addWrappedText(quote.labels.quoteLabel, MARGIN, CONTENT_WIDTH, 8, COLORS.teal, 'bold', 4)
    y += 2
    addWrappedText(quote.labels.headline, MARGIN, CONTENT_WIDTH, 19, COLORS.navy, 'bold', 8)
    y += 2
    addWrappedText(
        quote.labels.intro,
        MARGIN,
        CONTENT_WIDTH,
        10,
        COLORS.muted,
        'normal',
        4.8,
    )
    y += 5

    const planNameLines = linesFor(quote.planName, CONTENT_WIDTH - 12, 14)
    const summaryLines = linesFor(quote.summary, CONTENT_WIDTH - 12, 9)
    const planCardHeight = 15 + planNameLines.length * 6 + summaryLines.length * 4.2
    ensureSpace(planCardHeight + 8)
    setFillColor(COLORS.white)
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, planCardHeight, 2, 2, 'F')
    setFillColor(COLORS.teal)
    pdf.roundedRect(MARGIN, y, 2, planCardHeight, 1, 1, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    setTextColor(COLORS.teal)
    pdf.text(quote.labels.selectedPlan, MARGIN + 7, y + 6)
    let planTextY = y + 14
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)
    setTextColor(COLORS.navy)
    pdf.text(planNameLines, MARGIN + 7, planTextY)
    planTextY += planNameLines.length * 6 + 2
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    setTextColor(COLORS.muted)
    pdf.text(summaryLines, MARGIN + 7, planTextY)
    y += planCardHeight + 8

    ensureSpace(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(13)
    setTextColor(COLORS.navy)
    pdf.text(quote.labels.itinerary, MARGIN, y)
    y += 7

    quote.days.forEach((day, dayIndex) => {
        ensureSpace(12)
        setFillColor(COLORS.pale)
        pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 8, 1, 1, 'F')
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        setTextColor(COLORS.navy)
        pdf.text(`${quote.labels.day(dayIndex + 1)} - ${day.title}`, MARGIN + 4, y + 5.3)
        y += 9

        day.stops.forEach((stop) => {
            const titleLines = linesFor(stop.title, CONTENT_WIDTH - 34, 9)
            const descriptionLines = stop.description ? linesFor(stop.description, CONTENT_WIDTH - 34, 7.5) : []
            const tentativeLines = stop.isTentative ? 1 : 0
            const rowHeight = Math.max(9, titleLines.length * 4 + descriptionLines.length * 3.5 + tentativeLines * 3 + 2)
            ensureSpace(rowHeight)

            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(8.5)
            setTextColor(COLORS.teal)
            pdf.text(stop.time, MARGIN + 1, y + 4)

            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(9)
            setTextColor(COLORS.ink)
            pdf.text(titleLines, MARGIN + 22, y + 4)
            let detailY = y + titleLines.length * 4 + 3

            if (descriptionLines.length) {
                pdf.setFont('helvetica', 'normal')
                pdf.setFontSize(7.5)
                setTextColor(COLORS.muted)
                pdf.text(descriptionLines, MARGIN + 22, detailY)
                detailY += descriptionLines.length * 3.5
            }

            if (stop.isTentative) {
                pdf.setFont('helvetica', 'bold')
                pdf.setFontSize(6.5)
                setTextColor(COLORS.teal)
                pdf.text(quote.labels.tentative, MARGIN + 22, detailY)
            }

            y += rowHeight
            setDrawColor(COLORS.line)
            pdf.setLineWidth(0.2)
            pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
            y += 1
        })
        y += 3
    })

    ensureSpace(18)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(13)
    setTextColor(COLORS.navy)
    pdf.text(quote.labels.costSummary, MARGIN, y)
    y += 7

    quote.costs.forEach((cost) => {
        ensureSpace(9)
        setFillColor(COLORS.white)
        pdf.rect(MARGIN, y, CONTENT_WIDTH, 8, 'F')
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        setTextColor(COLORS.muted)
        pdf.text(cost.label, MARGIN + 4, y + 5.3)
        pdf.setFont('helvetica', 'bold')
        setTextColor(COLORS.navy)
        pdf.text(cost.value, PAGE_WIDTH - MARGIN - 4, y + 5.3, { align: 'right' })
        setDrawColor(COLORS.line)
        pdf.line(MARGIN, y + 8, PAGE_WIDTH - MARGIN, y + 8)
        y += 8
    })

    ensureSpace(14)
    setFillColor(COLORS.navy)
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 12, 1.5, 1.5, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    setTextColor(COLORS.white)
    pdf.text(quote.labels.total, MARGIN + 4, y + 7.5)
    setTextColor(COLORS.mint)
    pdf.setFontSize(13)
    pdf.text(quote.total, PAGE_WIDTH - MARGIN - 4, y + 7.8, { align: 'right' })
    y += 17

    const disclaimerLines = linesFor(quote.disclaimer, CONTENT_WIDTH - 8, 7)
    const footerLines = linesFor(quote.labels.closing, CONTENT_WIDTH - 8, 8)
    const thanksHeight = 9 + disclaimerLines.length * 3.4 + footerLines.length * 4
    ensureSpace(thanksHeight)
    setFillColor(COLORS.white)
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, thanksHeight, 2, 2, 'F')
    let thanksY = y + 6
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    setTextColor(COLORS.muted)
    pdf.text(footerLines, PAGE_WIDTH / 2, thanksY, { align: 'center' })
    thanksY += footerLines.length * 4 + 2
    pdf.setFontSize(7)
    setTextColor(COLORS.muted)
    pdf.text(disclaimerLines, MARGIN + 4, thanksY)

    const pageCount = pdf.getNumberOfPages()
    for (let page = 1; page <= pageCount; page += 1) {
        pdf.setPage(page)
        setDrawColor(COLORS.line)
        pdf.setLineWidth(0.3)
        pdf.line(MARGIN, PAGE_HEIGHT - 12, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 12)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        setTextColor(COLORS.muted)
        pdf.text(quote.labels.brandName, MARGIN, PAGE_HEIGHT - 7)
        pdf.text(quote.labels.page(page, pageCount), PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 7, { align: 'right' })
    }

    const pdfBlob = pdf.output('blob')
    return new File([pdfBlob], fileName, { type: 'application/pdf' })
}

export function createQuoteDownloadFileName(planName: string, date: Date) {
    const planSlug = planName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    const dateParts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(date)
    const dateByPart = Object.fromEntries(dateParts.map(({ type, value }) => [type, value]))
    const dateStamp = `${dateByPart.year}-${dateByPart.month}-${dateByPart.day}`

    return `beat-and-beach-${planSlug}-${dateStamp}.pdf`
}

export function downloadQuoteFile(file: File, fileName = file.name) {
    const fileUrl = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
}
