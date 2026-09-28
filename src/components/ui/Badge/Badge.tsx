import type { ReactNode } from 'react'
import './Badge.css'

type BadgeTone = 'sky' | 'blue' | 'green' | 'amber'

type BadgeProps = {
    tone: BadgeTone
    children: ReactNode
}

export function Badge({ tone, children }: BadgeProps) {
    return <span className={`badge badge-${tone}`}>{children}</span>
}
