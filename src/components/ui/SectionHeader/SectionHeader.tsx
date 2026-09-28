import type { ReactNode } from 'react'
import './SectionHeader.css'

type SectionHeaderProps = {
    eyebrow: string
    title: string
    className?: string
    children?: ReactNode
}

export function SectionHeader({ eyebrow, title, className = '', children }: SectionHeaderProps) {
    return (
        <div className={`section-header ${className}`.trim()}>
            <div>
                <span className="eyebrow">{eyebrow}</span>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    )
}
