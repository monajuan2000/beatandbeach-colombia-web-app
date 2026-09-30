import type { ReactNode } from 'react'
import './Chip.css'

/** `lime` highlights a standout option (e.g. a special plan) among neutral chips. */
export type ChipTone = 'default' | 'lime'

type ChipProps = {
    isActive: boolean
    onClick: () => void
    count?: number
    tone?: ChipTone
    children: ReactNode
}

/** Toggleable pill button. Group several inside an element with the `chip-group` class. */
export function Chip({ isActive, onClick, count, tone = 'default', children }: ChipProps) {
    return (
        <button
            type="button"
            className={`chip chip-${tone} ${isActive ? 'is-active' : ''}`.trim()}
            aria-pressed={isActive}
            onClick={onClick}
        >
            {children}
            {count !== undefined ? <small>{count}</small> : null}
        </button>
    )
}
