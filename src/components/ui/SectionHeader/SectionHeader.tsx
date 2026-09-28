import type { ReactNode } from 'react'
import './SectionHeader.css'

type SectionHeaderProps = {
    eyebrow: string
    title: string
    /** `accent` adds the eyebrow pill and animated gradient title (meant for light surfaces). */
    variant?: 'default' | 'accent'
    className?: string
    children?: ReactNode
}

export function SectionHeader({ eyebrow, title, variant = 'default', className = '', children }: SectionHeaderProps) {
    const isAccent = variant === 'accent'

    return (
        <div className={`section-header ${className}`.trim()}>
            <div>
                <span className={isAccent ? 'eyebrow eyebrow-pill' : 'eyebrow'}>{eyebrow}</span>
                <h2 className={isAccent ? 'accent-heading' : undefined}>{title}</h2>
                {children}
            </div>
        </div>
    )
}
