import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { citiesByRollout } from '../../data/cities'
import { CityCard } from '../CityCard/CityCard'
import './CitiesGrid.css'

export function CitiesGrid() {
    const { t } = useTranslation()
    const copy = t.cities.grid

    return (
        <section className="content-section cities-section" id="cities">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />

            <div className="cities-grid">
                {citiesByRollout.map((city) => (
                    <CityCard key={city.id} city={city} />
                ))}
            </div>
        </section>
    )
}
