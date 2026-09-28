import type { ReactNode } from 'react'
import './Chip.css'

type ChipProps = {
    isActive: boolean
    onClick: () => void
    count?: number
    children: ReactNode
}

/** Toggleable pill button. Group several inside an element with the `chip-group` class. */
export function Chip({ isActive, onClick, count, children }: ChipProps) {
    return (
        <button
            type="button"
            className={`chip ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            onClick={onClick}
        >
            {children}
            {count !== undefined ? <small>{count}</small> : null}
        </button>
    )
}
