import type { CityItineraries } from '../types'
import { guatapeItineraries } from './guatapeItineraries'

export const itineraries: CityItineraries[] = [guatapeItineraries]

export function getItinerariesForCity(cityId: string) {
    return itineraries.find((item) => item.cityId === cityId)
}
