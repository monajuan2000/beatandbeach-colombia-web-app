import type { QuoteCustomerDetails } from './downloadQuotePdf'

export type QuoteCustomerValidation = Record<
    Exclude<keyof QuoteCustomerDetails, 'phoneCountryCode' | 'phoneCountryIso'>,
    boolean
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\d{7,15}$/
const FULL_NAME_PATTERN = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u

export function validateQuoteCustomerDetails(details: QuoteCustomerDetails): QuoteCustomerValidation {
    return {
        fullName: FULL_NAME_PATTERN.test(details.fullName.trim()),
        documentType: Boolean(details.documentType),
        documentNumber: details.documentNumber.trim().length > 0,
        email: EMAIL_PATTERN.test(details.email.trim()),
        phone: Boolean(details.phoneCountryIso && details.phoneCountryCode) && PHONE_PATTERN.test(details.phone),
    }
}
