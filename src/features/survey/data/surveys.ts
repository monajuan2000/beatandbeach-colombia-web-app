import type { Survey } from '../types'
import { guatapeCulturalSurvey } from './guatapeCulturalSurvey'

export const surveys: Survey[] = [guatapeCulturalSurvey]

export function getSurveyById(id: string | undefined) {
    return surveys.find((survey) => survey.id === id)
}

export function getSurveyForCity(cityId: string) {
    return surveys.find((survey) => survey.cityId === cityId)
}
