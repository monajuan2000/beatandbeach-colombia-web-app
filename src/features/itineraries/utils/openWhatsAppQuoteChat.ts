import { WHATSAPP_BUSINESS_PHONE } from '@/config/externalLinks'
import { downloadQuoteFile } from './downloadQuotePdf'

/** Opens the business chat and downloads the PDF so the visitor can attach it. */
export function openWhatsAppQuoteChat(file: File, message: string) {
    const chatUrl = new URL(`https://wa.me/${WHATSAPP_BUSINESS_PHONE}`)
    chatUrl.searchParams.set('text', message)

    const link = document.createElement('a')
    link.href = chatUrl.toString()
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()

    downloadQuoteFile(file)
}
