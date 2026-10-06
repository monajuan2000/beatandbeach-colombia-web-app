import { useId, useState, type FormEvent } from 'react'
import { PUBLIC_SITE_ORIGIN } from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { getCallingCountries } from '@/features/trip/utils/callingCountries'
import { ITINERARY_EMAIL_PROVIDER_NAME } from '@/config/itineraryEmail'
import { EmailJsConfigurationError } from '../../services/sendQuoteEmailWithEmailJs'
import { sendItineraryQuoteEmail } from '../../services/sendItineraryQuoteEmail'
import { buildQuoteEmailBody } from '../../utils/buildQuoteEmailBody'
import type { QuoteCustomerDetails, QuotePdfContent } from '../../utils/downloadQuotePdf'

type ItineraryQuoteEmailFormProps = {
    quote: QuotePdfContent
    contactMessage: string
    customerDetails: QuoteCustomerDetails
    isCustomerDetailsComplete: boolean
    invalidFields: string[]
    onCustomerDetailsChange: (field: keyof QuoteCustomerDetails, value: string) => void
    onPhoneCountryChange: (countryIso: string, callingCode: string) => void
    onError: (message: string) => void
    onSuccess: (message: string) => void
}

export function ItineraryQuoteEmailForm({
    quote,
    contactMessage,
    customerDetails,
    isCustomerDetailsComplete,
    invalidFields,
    onCustomerDetailsChange,
    onPhoneCountryChange,
    onError,
    onSuccess,
}: ItineraryQuoteEmailFormProps) {
    const { t, locale } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const fullNameInputId = useId()
    const documentTypeInputId = useId()
    const documentNumberInputId = useId()
    const emailInputId = useId()
    const phoneInputId = useId()
    const validationMessageId = useId()
    const [isSending, setIsSending] = useState(false)
    const callingCountries = getCallingCountries(locale)

    const logoUrl = new URL(`${import.meta.env.BASE_URL}beat-and-beach-logo.png`, PUBLIC_SITE_ORIGIN).toString()
    const emailBody = buildQuoteEmailBody(quote, contactMessage, logoUrl)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSending) return

        setIsSending(true)
        try {
            await sendItineraryQuoteEmail({ quote, customerEmail: customerDetails.email.trim(), body: emailBody })
            onSuccess(copy.emailProviderSuccess(ITINERARY_EMAIL_PROVIDER_NAME))
        } catch (error) {
            console.error(`${ITINERARY_EMAIL_PROVIDER_NAME} rejected the itinerary quote:`, error)
            const errorMessage = error instanceof Error ? error.message : ''
            const message = error instanceof EmailJsConfigurationError
                ? copy.emailJsNotConfigured
                : /rate limit exceeded/i.test(errorMessage)
                    ? copy.emailProviderRateLimitError(ITINERARY_EMAIL_PROVIDER_NAME)
                    : copy.emailProviderError(ITINERARY_EMAIL_PROVIDER_NAME)
            onError(message)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <form className="itinerary-quote-email-form" onSubmit={handleSubmit}>
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
                        disabled={isSending}
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
                        disabled={isSending}
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
                        disabled={isSending}
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
                        disabled={isSending}
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
                            disabled={isSending}
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
                            disabled={isSending}
                        />
                    </div>
                </div>
            </div>
            {invalidFields.length > 0 ? (
                <p id={validationMessageId} className="itinerary-quote-validation-alert" role="alert">
                    {copy.customerValidationAlert(invalidFields)}
                </p>
            ) : null}
            <div className="itinerary-quote-email-row">
                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSending || !isCustomerDetailsComplete}
                >
                    {isSending ? copy.sendingQuote : copy.sendQuote}
                </button>
            </div>
        </form>
    )
}
