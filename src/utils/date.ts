const COLOMBIA_TIME_ZONE = 'America/Bogota'

export function formatCalendarDate(date: Date, locale: string) {
    return new Intl.DateTimeFormat(locale, {
        timeZone: COLOMBIA_TIME_ZONE,
        dateStyle: 'long',
    }).format(date)
}

/** Compact calendar parts for a date range, e.g. { days: '10–11', month: 'OCT', year: '2026' }. */
export function formatDayRange(startIso: string, endIso: string | undefined, locale: string) {
    const start = new Date(startIso)
    const end = endIso ? new Date(endIso) : start
    const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat(locale, { timeZone: COLOMBIA_TIME_ZONE, ...options }).format(date)

    const startDay = format(start, { day: 'numeric' })
    const endDay = format(end, { day: 'numeric' })

    return {
        days: startDay === endDay ? startDay : `${startDay}–${endDay}`,
        month: format(start, { month: 'short' }).replace('.', '').toUpperCase(),
        year: format(start, { year: 'numeric' }),
    }
}
