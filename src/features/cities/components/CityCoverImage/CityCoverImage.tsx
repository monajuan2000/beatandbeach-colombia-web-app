import { useTranslation } from '@/i18n/context/LanguageContext'
import type { City } from '../../types'
import './CityCoverImage.css'

/** Clean, text-free cover photo for a city page. Renders nothing for cities without an image yet. */
export function CityCoverImage({ city }: { city: City }) {
    const { t } = useTranslation()

    if (!city.image) return null

    return (
        <figure className="city-cover">
            <img src={city.image} alt={t.cities.page.coverAlt(city.name)} />
        </figure>
    )
}
