export type TripInterest = 'music' | 'culture' | 'nightlife' | 'adventure' | 'food' | 'beach'
export type TripDocumentType = 'nationalId' | 'foreignId' | 'passport'

export type SavedTour = {
    cityId: string
    planId: string
}

export type TripPlannerFormValues = {
    cityId: string
    arrivalDate: string
    departureDate: string
    travelers: number
    interests: TripInterest[]
    name: string
    documentType: TripDocumentType
    documentNumber: string
    email: string
    phoneCountryIso: string
    phoneCountryCode: string
    phone: string
}

export type TripQuoteDetails = Pick<
    TripPlannerFormValues,
    | 'cityId'
    | 'departureDate'
    | 'travelers'
    | 'interests'
    | 'name'
    | 'documentType'
    | 'documentNumber'
    | 'email'
    | 'phoneCountryIso'
    | 'phoneCountryCode'
    | 'phone'
> & {
    planId: string
}
