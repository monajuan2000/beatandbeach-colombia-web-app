import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    labelledBy: string
    children: ReactNode
    wide?: boolean
}

export function Modal({ isOpen, onClose, labelledBy, children, wide = false }: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null)
    // Parents pass inline callbacks; keep the latest one without re-running the open/close effect.
    const onCloseRef = useRef(onClose)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        if (!isOpen) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const previousOverflow = document.body.style.overflow

        document.body.style.overflow = 'hidden'
        panelRef.current?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onCloseRef.current()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
            previouslyFocused?.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div
            className="modal-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <div
                ref={panelRef}
                className={`modal-panel ${wide ? 'modal-panel-wide' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                tabIndex={-1}
            >
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.body,
    )
}
