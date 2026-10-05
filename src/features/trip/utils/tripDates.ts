import { TRIP_PLANNER_CONFIG } from '../config'

const DEFAULT_TRIP_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
}

const TOUR_OPTION_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
}

export function toDateInputValue(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function getTodayDateInputValue() {
    return toDateInputValue(new Date())
}

export function getAvailableTourDates(referenceDate = new Date()) {
    const startDate = new Date(referenceDate)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(startDate)
    const startDayOfMonth = endDate.getDate()
    endDate.setDate(1)
    endDate.setMonth(endDate.getMonth() + TRIP_PLANNER_CONFIG.scheduledTour.monthsAhead)
    const lastDayOfEndMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
    endDate.setDate(Math.min(startDayOfMonth, lastDayOfEndMonth))

    const scheduledWeekdays: readonly number[] = TRIP_PLANNER_CONFIG.scheduledTour.weekdays
    const dates: string[] = []
    const date = new Date(startDate)

    while (date <= endDate) {
        if (scheduledWeekdays.includes(date.getDay())) dates.push(toDateInputValue(date))
        date.setDate(date.getDate() + 1)
    }

    return dates
}

export function formatTripDate(
    date: string,
    locale: string,
    options: Intl.DateTimeFormatOptions = DEFAULT_TRIP_DATE_FORMAT,
) {
    return new Date(`${date}T12:00:00`).toLocaleDateString(locale, options)
}

export function formatTourOptionDate(date: string, locale: string) {
    return formatTripDate(date, locale, TOUR_OPTION_DATE_FORMAT)
}
