import { useTranslation } from '@/i18n/context/LanguageContext'
import type { City } from '../../types'
import './CityStatusNotice.css'

type CityStatusNoticeProps = {
    city: City
    className?: string
    /** `highlight` adds an "Available very soon" title and a pulsing icon, for city cards and banners. */
    variant?: 'default' | 'highlight'
    /** Overrides the default review message. */
    detail?: string
}

/** Explains that a destination is still under review. Renders nothing for launching cities. */
export function CityStatusNotice({ city, className = '', variant = 'default', detail }: CityStatusNoticeProps) {
    const { t } = useTranslation()

    if (city.status !== 'under-review') return null

    const message = detail ?? t.cities.status.reviewNotice(city.name)

    if (variant === 'highlight') {
        return (
            <div className={`city-status-notice-highlight ${className}`.trim()} role="note">
                <span className="city-status-notice-highlight-icon" aria-hidden="true">
                    ⏳
                </span>
                <span className="city-status-notice-highlight-text">
                    <strong>{t.cities.status.soonTitle}</strong>
                    <span>{message}</span>
                </span>
            </div>
        )
    }

    return (
        <p className={`city-status-notice ${className}`.trim()} role="note">
            <span className="city-status-notice-icon" aria-hidden="true">
                ⓘ
            </span>
            <span>{message}</span>
        </p>
    )
}
