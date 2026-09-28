import { useEffect, useRef, useState } from 'react'

/**
 * Reports once when the referenced element scrolls into view (then stops observing).
 * Browsers without IntersectionObserver are treated as "already in view" so content never stays hidden.
 */
export function useInView<T extends Element>(threshold = 0.2) {
    const ref = useRef<T>(null)
    const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

    useEffect(() => {
        const element = ref.current
        if (!element || inView) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold },
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [inView, threshold])

    return { ref, inView }
}
