import type { CityItineraries } from '../types'
import { guatapeItineraries } from './guatapeItineraries'
import { medellinItineraries } from './medellinItineraries'

export const itineraries: CityItineraries[] = [guatapeItineraries, medellinItineraries]

export function getItinerariesForCity(cityId: string) {
    return itineraries.find((item) => item.cityId === cityId)
}
