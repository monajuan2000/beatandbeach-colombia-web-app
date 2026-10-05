export type TripInterest = 'music' | 'culture' | 'nightlife' | 'adventure' | 'food' | 'beach'

export type SavedTour = {
    cityId: string
    planId: string
}

export type TripSummary = {
    city: string
    travelers: number
    arrivalDate: string
    departureDate: string
    savedCount: number
}

export type TripPlannerFormValues = {
    cityId: string
    arrivalDate: string
    departureDate: string
    travelers: number
    interests: TripInterest[]
    name: string
    email: string
}
