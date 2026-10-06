const configuredProvider = import.meta.env.VITE_ITINERARY_EMAIL_PROVIDER?.trim().toLowerCase()

export const ITINERARY_EMAIL_PROVIDER = configuredProvider === 'formsubmit' ? 'formsubmit' : 'emailjs'
export const ITINERARY_EMAIL_PROVIDER_NAME = ITINERARY_EMAIL_PROVIDER === 'formsubmit' ? 'FormSubmit' : 'EmailJS'