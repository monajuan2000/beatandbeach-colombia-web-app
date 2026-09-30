import { Chip, type ChipTone } from '../Chip/Chip'

export type FilterOption = {
    value: string
    label: string
    count?: number
    tone?: ChipTone
}

type FilterChipsProps = {
    label: string
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
}

/** Single-select filter built from chips. */
export function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
    return (
        <div className="chip-group" role="group" aria-label={label}>
            {options.map((option) => (
                <Chip
                    key={option.value}
                    isActive={option.value === value}
                    count={option.count}
                    tone={option.tone}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </Chip>
            ))}
        </div>
    )
}
