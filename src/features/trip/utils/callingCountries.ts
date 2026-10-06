import { all } from 'country-codes-list'

export function getCallingCountries(locale: string) {
    const countryNames = new Intl.DisplayNames([locale], { type: 'region' })

    return all()
        .filter((country) => country.countryCallingCode.length > 0)
        .map((country) => ({
            code: country.countryCode,
            callingCode: country.countryCallingCode,
            name: countryNames.of(country.countryCode) ?? country.countryNameEn,
            flag: country.flag,
        }))
        .sort((left, right) => left.name.localeCompare(right.name, locale))
}
