import { Link } from 'react-router-dom'
import { getEventById } from '@/features/events/data/events'
import { useCountdown } from '@/hooks/useCountdown'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { SPOTLIGHT_EVENT_ID } from '../../data/spotlight'
import './NextEventLink.css'

/** Compact "Next up: EDC · in 11 days" link that scrolls to the spotlight. */
export function NextEventLink() {
    const { t, localize } = useTranslation()
    const copy = t.home.hero.nextEvent
    const event = getEventById(SPOTLIGHT_EVENT_ID)

    if (!event?.startsAt) return null

    return (
        <Link to="/" state={{ scrollTo: 'spotlight' }} className="next-event-link">
            <span className="next-event-link-label">{copy.label}</span>
            <span className="next-event-link-title">{localize(event.title)}</span>
            <NextEventDays startsAt={event.startsAt} />
            <span className="next-event-link-arrow" aria-hidden="true">
                →
            </span>
        </Link>
    )
}

function NextEventDays({ startsAt }: { startsAt: string }) {
    const { t } = useTranslation()
    const { days, isOver } = useCountdown(startsAt)

    if (isOver) return null

    return <span className="next-event-link-days">{t.home.hero.nextEvent.startsIn(days)}</span>
}
