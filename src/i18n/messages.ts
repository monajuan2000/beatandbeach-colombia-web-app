import { citiesEn } from '@/features/cities/i18n/en'
import { citiesEs } from '@/features/cities/i18n/es'
import { eventsEn } from '@/features/events/i18n/en'
import { eventsEs } from '@/features/events/i18n/es'
import { homeEn } from '@/features/home/i18n/en'
import { homeEs } from '@/features/home/i18n/es'
import { surveyEn } from '@/features/survey/i18n/en'
import { surveyEs } from '@/features/survey/i18n/es'
import { tripEn } from '@/features/trip/i18n/en'
import { tripEs } from '@/features/trip/i18n/es'
import type { Language } from './config'
import { commonEn } from './locales/en'
import { commonEs } from './locales/es'

/*
 * Each feature owns its UI copy in `features/<feature>/i18n/{en,es}.ts`.
 * This file only assembles them into one dictionary per language.
 * English is the source of truth: every other language must match its shape.
 */
const en = {
    common: commonEn,
    home: homeEn,
    cities: citiesEn,
    events: eventsEn,
    trip: tripEn,
    survey: surveyEn,
}

export type Messages = typeof en

const es: Messages = {
    common: commonEs,
    home: homeEs,
    cities: citiesEs,
    events: eventsEs,
    trip: tripEs,
    survey: surveyEs,
}

export const messages: Record<Language, Messages> = { en, es }
