import { SURVEY_SUBMIT_ENDPOINT } from '@/features/survey/config'
import { PUBLIC_SITE_ORIGIN } from '@/config/externalLinks'
import { MAX_QUOTE_PDF_SIZE_BYTES } from '../config'
import type { QuotePdfContent } from '../utils/downloadQuotePdf'

const FORM_SUBMIT_ENDPOINT = SURVEY_SUBMIT_ENDPOINT.replace('/ajax/', '/')
type SendQuoteEmailOptions = {
    quote: QuotePdfContent
    customerEmail: string
    pdfFile: File
    message: string
    customerEmailFieldLabel: string
    messageFieldLabel: string
}

/** Sends the quote PDF with FormSubmit's native multipart form upload. */
export async function sendQuoteEmailWithFormSubmit({
    quote,
    customerEmail,
    pdfFile,
    message,
    customerEmailFieldLabel,
    messageFieldLabel,
}: SendQuoteEmailOptions) {
    const email = customerEmail.trim()
    if (pdfFile.size > MAX_QUOTE_PDF_SIZE_BYTES) {
        throw new Error('The quote PDF exceeds FormSubmit’s 10 MB attachment limit.')
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const frame = document.createElement('iframe')
    frame.name = `formsubmit-quote-${token}`
    frame.title = 'Form submission response'
    frame.style.display = 'none'
    frame.src = 'about:blank'

    const callbackUrl = new URL(
        `${import.meta.env.BASE_URL}formsubmit-quote-success.html`,
        PUBLIC_SITE_ORIGIN,
    )
    callbackUrl.searchParams.set('token', token)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = FORM_SUBMIT_ENDPOINT
    form.enctype = 'multipart/form-data'
    form.target = frame.name
    form.style.display = 'none'

    const addField = (name: string, value: string) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.append(input)
    }

    addField('_subject', `${quote.labels.quoteLabel} · ${quote.planName}`)
    addField('_replyto', email)
    addField('_cc', email)
    addField('_captcha', 'false')
    addField('_template', 'table')
    addField('_url', new URL(import.meta.env.BASE_URL, PUBLIC_SITE_ORIGIN).href)
    addField('_next', callbackUrl.href)
    addField(customerEmailFieldLabel, email)
    addField(messageFieldLabel, message)

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.name = 'attachment'
    const transfer = new DataTransfer()
    transfer.items.add(pdfFile)
    fileInput.files = transfer.files
    form.append(fileInput)

    await new Promise<void>((resolve, reject) => {
        let isSettled = false
        let frameLoadCount = 0

        const cleanup = () => {
            window.removeEventListener('message', handleMessage)
            frame.removeEventListener('load', handleFrameLoad)
            window.clearTimeout(timeoutId)
            form.remove()
            frame.remove()
        }

        const fail = (error: Error) => {
            if (isSettled) return
            isSettled = true
            cleanup()
            reject(error)
        }

        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== PUBLIC_SITE_ORIGIN || event.source !== frame.contentWindow) return
            const data = event.data as { type?: string; token?: string }
            if (data?.type !== 'formsubmit-quote-complete' || data.token !== token || isSettled) return
            isSettled = true
            cleanup()
            resolve()
        }

        const handleFrameLoad = () => {
            frameLoadCount += 1
            if (frameLoadCount !== 1) return
            document.body.append(form)
            try {
                form.submit()
            } catch (error) {
                fail(error instanceof Error ? error : new Error('Could not submit the quote form.'))
            }
        }

        window.addEventListener('message', handleMessage)
        frame.addEventListener('load', handleFrameLoad)
        const timeoutId = window.setTimeout(() => {
            fail(new Error('FormSubmit did not confirm the quote submission.'))
        }, 25_000)
        document.body.append(frame)
    })
}
