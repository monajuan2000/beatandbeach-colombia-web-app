import type { ReactNode } from 'react'
import { formatCardNumber } from '@/utils/reveal'
import './PageSection.css'

type PageSectionSurface = 'plain' | 'dark' | 'light'

type PageSectionProps = {
    /** Zero-based position on the page, shown as "01", "02"… in the divider. */
    index: number
    /** Short block name shown in the divider, e.g. "Destinations". */
    label: string
    /** `dark` and `light` frame the block in a band; `plain` leaves it open (e.g. the hero). */
    surface?: PageSectionSurface
    /** Hides the divider, e.g. for the first block right under the header. */
    hideDivider?: boolean
    children: ReactNode
}

const surfaceClass: Record<PageSectionSurface, string> = {
    plain: '',
    dark: 'surface-band surface-band-dark',
    light: 'surface-light surface-band',
}

/** Groups related sections into one clearly delimited page block with a numbered divider. */
export function PageSection({ index, label, surface = 'plain', hideDivider = false, children }: PageSectionProps) {
    return (
        <div className="page-section">
            {hideDivider ? null : (
                <div className="page-section-divider" aria-hidden="true">
                    <span className="page-section-marker">
                        <span className="page-section-number">{formatCardNumber(index)}</span>
                        {label}
                    </span>
                </div>
            )}
            <div className={`page-section-body ${surfaceClass[surface]}`.trim()}>{children}</div>
        </div>
    )
}
