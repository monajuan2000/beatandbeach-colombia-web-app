import { Badge } from '@/components/ui/Badge/Badge'
import { useTranslation } from '@/i18n/context/LanguageContext'
import type { CityStatus } from '../../types'

const toneByStatus = {
    launching: 'green',
    'under-review': 'amber',
} as const satisfies Record<CityStatus, string>

export function CityStatusBadge({ status }: { status: CityStatus }) {
    const { t } = useTranslation()

    return <Badge tone={toneByStatus[status]}>{t.cities.status.labels[status]}</Badge>
}
