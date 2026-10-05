/**
 * Where survey responses are delivered.
 *
 * The site is static (GitHub Pages), so a form-to-email service forwards each response.
 * FormSubmit (https://formsubmit.co) needs no account: the first submission sends an
 * activation email to this address, and responses arrive once it is confirmed.
 * After activating, FormSubmit also emails a random alias; replace the address below
 * with that alias so the real email is not visible in the site's source code.
 */
export const SURVEY_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${BUSINESS_EMAIL}`
import { BUSINESS_EMAIL } from '@/config/externalLinks'
