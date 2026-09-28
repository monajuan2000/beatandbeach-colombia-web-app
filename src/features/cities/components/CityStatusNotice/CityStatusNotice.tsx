import { useTranslation } from '@/i18n/context/LanguageContext'
import type { City } from '../../types'
import './CityStatusNotice.css'

type CityStatusNoticeProps = {
    city: City
    className?: string
}

/** Explains that a destination is still under review. Renders nothing for launching cities. */
export function CityStatusNotice({ city, className = '' }: CityStatusNoticeProps) {
    const { t } = useTranslation()

    if (city.status !== 'under-review') return null

    return (
        <p className={`city-status-notice ${className}`.trim()} role="note">
            <span className="city-status-notice-icon" aria-hidden="true">
                ⓘ
            </span>
            <span>{t.cities.status.reviewNotice(city.name)}</span>
        </p>
    )
}
