import { useId } from 'react'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { getCallingCountries } from '@/features/trip/utils/callingCountries'
import type { QuoteCustomerDetails } from '../../utils/downloadQuotePdf'

type ItineraryQuoteEmailFormProps = {
    customerDetails: QuoteCustomerDetails
    invalidFields: string[]
    onCustomerDetailsChange: (field: keyof QuoteCustomerDetails, value: string) => void
    onPhoneCountryChange: (countryIso: string, callingCode: string) => void
}

export function ItineraryQuoteEmailForm({
    customerDetails,
    invalidFields,
    onCustomerDetailsChange,
    onPhoneCountryChange,
}: ItineraryQuoteEmailFormProps) {
    const { t, locale } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const fullNameInputId = useId()
    const documentTypeInputId = useId()
    const documentNumberInputId = useId()
    const emailInputId = useId()
    const phoneInputId = useId()
    const validationMessageId = useId()
    const callingCountries = getCallingCountries(locale)

    return (
        <section className="itinerary-quote-email-form">
            <div className="itinerary-quote-section-heading">
                <h4>{copy.customerDetailsTitle}</h4>
                <span aria-hidden="true">*</span>
            </div>
            <div className="itinerary-quote-customer-fields">
                <label htmlFor={fullNameInputId}>
                    <span>{copy.fullNameLabel}</span>
                    <input
                        id={fullNameInputId}
                        type="text"
                        autoComplete="name"
                        pattern="[\p{L}\p{M}]+([ '\u2019\-][\p{L}\p{M}]+)*"
                        required
                        value={customerDetails.fullName}
                        aria-invalid={invalidFields.includes(copy.fullNameLabel)}
                        onChange={(event) => onCustomerDetailsChange(
                            'fullName',
                            event.target.value.replace(/[^\p{L}\p{M} '\u2019-]/gu, ''),
                        )}
                    />
                </label>
                <label htmlFor={documentTypeInputId}>
                    <span>{copy.documentTypeLabel}</span>
                    <select
                        id={documentTypeInputId}
                        required
                        value={customerDetails.documentType}
                        aria-invalid={invalidFields.includes(copy.documentTypeLabel)}
                        onChange={(event) => onCustomerDetailsChange('documentType', event.target.value)}
                    >
                        <option value="nationalId">{copy.documentTypes.nationalId}</option>
                        <option value="foreignId">{copy.documentTypes.foreignId}</option>
                        <option value="passport">{copy.documentTypes.passport}</option>
                    </select>
                </label>
                <label htmlFor={documentNumberInputId}>
                    <span>{copy.documentNumberLabel}</span>
                    <input
                        id={documentNumberInputId}
                        type="text"
                        autoComplete="off"
                        required
                        value={customerDetails.documentNumber}
                        aria-invalid={invalidFields.includes(copy.documentNumberLabel)}
                        onChange={(event) => onCustomerDetailsChange('documentNumber', event.target.value)}
                    />
                </label>
                <label htmlFor={emailInputId}>
                    <span>{copy.emailLabel}</span>
                    <input
                        id={emailInputId}
                        type="email"
                        autoComplete="email"
                        required
                        value={customerDetails.email}
                        aria-invalid={invalidFields.includes(copy.emailLabel)}
                        onChange={(event) => onCustomerDetailsChange('email', event.target.value)}
                    />
                </label>
                <div className="itinerary-quote-phone-field">
                    <label htmlFor={phoneInputId}>{copy.phoneLabel}</label>
                    <div className="itinerary-quote-phone-input">
                        <select
                            aria-label={copy.phoneCountryLabel}
                            value={customerDetails.phoneCountryIso}
                            onChange={(event) => {
                                const country = callingCountries.find((item) => item.code === event.target.value)
                                if (country) onPhoneCountryChange(country.code, country.callingCode)
                            }}
                        >
                            {callingCountries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name} (+{country.callingCode})
                                </option>
                            ))}
                        </select>
                        <input
                            id={phoneInputId}
                            type="text"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            pattern="[0-9]{7,15}"
                            minLength={7}
                            maxLength={15}
                            required
                            value={customerDetails.phone}
                            aria-invalid={invalidFields.includes(copy.phoneLabel)}
                            aria-describedby={invalidFields.length > 0 ? validationMessageId : undefined}
                            onChange={(event) => onCustomerDetailsChange(
                                'phone',
                                event.target.value.replace(/\D/g, ''),
                            )}
                        />
                    </div>
                </div>
            </div>
            {invalidFields.length > 0 ? (
                <p id={validationMessageId} className="itinerary-quote-validation-alert" role="alert">
                    {copy.customerValidationAlert(invalidFields)}
                </p>
            ) : null}
        </section>
    )
}
