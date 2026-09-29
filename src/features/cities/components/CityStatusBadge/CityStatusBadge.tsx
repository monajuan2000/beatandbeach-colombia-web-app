import { Badge } from '@/components/ui/Badge/Badge'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { CityStatus } from '../../types'
import './CityStatusBadge.css'

const toneByStatus = {
    launching: 'green',
    'under-review': 'amber',
} as const satisfies Record<CityStatus, string>

export function CityStatusBadge({ status }: { status: CityStatus }) {
    const { t } = useTranslation()

    return (
        <Badge tone={toneByStatus[status]} className={`city-status-badge-${status}`}>
            {t.cities.status.labels[status]}
        </Badge>
    )
}
