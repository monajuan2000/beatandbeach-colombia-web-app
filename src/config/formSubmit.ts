import { BUSINESS_EMAIL } from './externalLinks'

const FORM_SUBMIT_ORIGIN = 'https://formsubmit.co'

/** JSON endpoint used by submissions without file attachments. */
export const FORM_SUBMIT_AJAX_ENDPOINT = `${FORM_SUBMIT_ORIGIN}/ajax/${BUSINESS_EMAIL}`
