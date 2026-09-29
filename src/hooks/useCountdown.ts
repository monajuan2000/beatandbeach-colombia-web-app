import { useEffect, useState } from 'react'

export type CountdownParts = {
    days: number
    hours: number
    minutes: number
    seconds: number
    isOver: boolean
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function partsUntil(target: number): CountdownParts {
    const remaining = Math.max(0, target - Date.now())

    return {
        days: Math.floor(remaining / DAY),
        hours: Math.floor((remaining % DAY) / HOUR),
        minutes: Math.floor((remaining % HOUR) / MINUTE),
        seconds: Math.floor((remaining % MINUTE) / SECOND),
        isOver: remaining === 0,
    }
}

/** Time left until an ISO date, refreshed every second and stopped once it is reached. */
export function useCountdown(targetIso: string) {
    const target = new Date(targetIso).getTime()
    const [parts, setParts] = useState(() => partsUntil(target))

    useEffect(() => {
        const timer = window.setInterval(() => {
            const next = partsUntil(target)
            setParts(next)
            if (next.isOver) window.clearInterval(timer)
        }, SECOND)

        return () => window.clearInterval(timer)
    }, [target])

    return parts
}
