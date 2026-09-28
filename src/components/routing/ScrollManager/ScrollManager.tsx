import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type ScrollState = { scrollTo?: string } | null

/**
 * HashRouter owns the URL hash, so in-page anchors like `#events` would be read as routes.
 * Links pass `state={{ scrollTo: 'events' }}` instead and this component does the scrolling,
 * which also works when the link is clicked from another page.
 */
export function ScrollManager() {
    const location = useLocation()
    const target = (location.state as ScrollState)?.scrollTo

    useEffect(() => {
        if (!target) {
            window.scrollTo({ top: 0, behavior: 'instant' })
            return
        }

        const frame = requestAnimationFrame(() => {
            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })

        return () => cancelAnimationFrame(frame)
    }, [location.key, target])

    return null
}
