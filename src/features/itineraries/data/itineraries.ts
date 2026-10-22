import type { CityItineraries } from '../types'
import { guatapeItineraries } from './guatapeItineraries'
import { santaElenaItineraries } from './santaElenaItineraries'

export const itineraries: CityItineraries[] = [guatapeItineraries, santaElenaItineraries]

export function getItinerariesForCity(cityId: string) {
    return itineraries.find((item) => item.cityId === cityId)
}
