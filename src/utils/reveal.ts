import type { CSSProperties } from 'react'

const REVEAL_STAGGER_MS = 110

/** Inline style that staggers a `.reveal-item` inside a `.reveal-group` by its position. */
export function revealDelay(index: number): CSSProperties {
    return { '--reveal-delay': `${index * REVEAL_STAGGER_MS}ms` } as CSSProperties
}

/** Two-digit card number: 1 → "01". */
export function formatCardNumber(index: number) {
    return String(index + 1).padStart(2, '0')
}
