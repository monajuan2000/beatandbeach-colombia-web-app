import { useCountdown } from '@/hooks/useCountdown'
import './Countdown.css'

export type CountdownUnitLabels = {
    days: string
    hours: string
    minutes: string
    seconds: string
}

type CountdownProps = {
    /** ISO date the countdown runs to. */
    target: string
    label: string
    units: CountdownUnitLabels
    /** Shown instead of the clock once the target is reached. */
    endedLabel: string
    className?: string
}

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const

export function Countdown({ target, label, units, endedLabel, className = '' }: CountdownProps) {
    const parts = useCountdown(target)

    if (parts.isOver) {
        return <p className={`countdown countdown-ended ${className}`.trim()}>{endedLabel}</p>
    }

    return (
        <div className={`countdown ${className}`.trim()} role="timer" aria-label={label}>
            <span className="countdown-label">{label}</span>
            <div className="countdown-units">
                {UNITS.map((unit) => (
                    <span key={unit} className="countdown-unit">
                        <strong>{String(parts[unit]).padStart(2, '0')}</strong>
                        <small>{units[unit]}</small>
                    </span>
                ))}
            </div>
        </div>
    )
}
