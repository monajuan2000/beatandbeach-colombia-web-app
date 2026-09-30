import { useState, type ReactNode, type TransitionEvent } from 'react'
import './Collapsible.css'

type CollapsibleProps = {
    /** Referenced by the toggle's `aria-controls`. */
    id: string
    isOpen: boolean
    children: ReactNode
}

/**
 * Region that slides open and closed; the toggle button lives with the caller.
 * Closed content is `inert`, so it cannot be focused or read while hidden.
 */
export function Collapsible({ id, isOpen, children }: CollapsibleProps) {
    // Content clips while it slides; once fully open it may overflow again (keeps `position: sticky` working).
    const [settledOpen, setSettledOpen] = useState(false)

    const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && event.propertyName === 'grid-template-rows') {
            setSettledOpen(isOpen)
        }
    }

    const stateClass = isOpen ? (settledOpen ? 'is-open is-settled' : 'is-open') : ''

    return (
        <div id={id} className={`collapsible ${stateClass}`.trim()} inert={!isOpen} onTransitionEnd={handleTransitionEnd}>
            <div className="collapsible-content">{children}</div>
        </div>
    )
}
