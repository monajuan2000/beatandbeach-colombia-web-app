import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatTourOptionDate } from '../../utils/tripDates'
import './ScheduledTourDateSelect.css'

type ScheduledTourDateSelectProps = {
    label: string
    dates: string[]
    value: string
    disabled?: boolean
    onChange: (date: string) => void
}

export function ScheduledTourDateSelect({ label, dates, value, disabled = false, onChange }: ScheduledTourDateSelectProps) {
    const { locale } = useTranslation()

    return (
        <label className="trip-scheduled-date-field">
            <span>{label}</span>
            <select
                required
                value={value}
                disabled={disabled || dates.length === 0}
                onChange={(event) => onChange(event.target.value)}
            >
                {dates.length === 0 ? <option value="">—</option> : null}
                {dates.map((date) => (
                    <option key={date} value={date}>
                        {formatTourOptionDate(date, locale)}
                    </option>
                ))}
            </select>
        </label>
    )
}
