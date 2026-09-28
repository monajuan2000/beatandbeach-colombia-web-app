import type { Language } from './config'

/** Content text (data such as cities or events) provided in every supported language. */
export type LocalizedText = Record<Language, string>
