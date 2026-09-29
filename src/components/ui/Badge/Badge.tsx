import type { ReactNode } from 'react'
import './Badge.css'

type BadgeTone = 'sky' | 'blue' | 'green' | 'amber'

type BadgeProps = {
    tone: BadgeTone
    children: ReactNode
    className?: string
}

export function Badge({ tone, children, className = '' }: BadgeProps) {
    return <span className={`badge badge-${tone} ${className}`.trim()}>{children}</span>
}
