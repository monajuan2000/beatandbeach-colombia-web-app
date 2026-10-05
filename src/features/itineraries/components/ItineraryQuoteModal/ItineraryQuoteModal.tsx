import { useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { INSTAGRAM_PROFILE_URL, WHATSAPP_BUSINESS_PHONE } from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCalendarDate } from '@/utils/date'
import type { ItineraryPlan } from '../../types'
import { openWhatsAppQuoteChat } from '../../utils/openWhatsAppQuoteChat'
import {
    createQuoteDownloadFileName,
    createQuotePdfFile,
    downloadQuoteFile,
    type QuotePdfContent,
} from '../../utils/downloadQuotePdf'
import { buildQuotePdfContent } from '../../utils/buildQuotePdfContent'
import type { getPlanCostBreakdown } from '../../utils/planCosts'
import { ItineraryQuoteEmailForm } from './ItineraryQuoteEmailForm'
import { ItineraryQuotePreview } from './ItineraryQuotePreview'
import './ItineraryQuoteModal.css'

type ItineraryQuoteModalProps = {
    plan: ItineraryPlan
    breakdown: ReturnType<typeof getPlanCostBreakdown>
    isOpen: boolean
    onClose: () => void
}

export function ItineraryQuoteModal({ plan, breakdown, isOpen, onClose }: ItineraryQuoteModalProps) {
    const { t, localize, locale } = useTranslation()
    const copy = t.itineraries.costs.quoteModal
    const costCopy = t.itineraries.costs
    const quote = useMemo<QuotePdfContent>(() => buildQuotePdfContent({
        plan,
        locale,
        localize,
        categories: costCopy.categories,
        disclaimer: costCopy.disclaimer,
        labels: costCopy.quotePdf,
        breakdown,
    }), [breakdown, costCopy.categories, costCopy.disclaimer, costCopy.quotePdf, locale, localize, plan])

    const [preparedPdf, setPreparedPdf] = useState<{
        key: string
        file: File | null
        error: string
    } | null>(null)
    const [downloadActionError, setDownloadActionError] = useState('')
    const [confirmation, setConfirmation] = useState<{
        kind: 'download' | 'email'
        message: string
    } | null>(null)
    const [emailError, setEmailError] = useState('')
    const [shareMessage, setShareMessage] = useState('')
    const quoteKey = JSON.stringify(quote)
    const currentPdf = preparedPdf?.key === quoteKey ? preparedPdf : null
    const pdfFile = currentPdf?.file ?? null
    const isPreparing = isOpen && currentPdf === null
    const downloadError = downloadActionError || currentPdf?.error || ''

    useEffect(() => {
        if (!isOpen) return

        let isCurrent = true
        void createQuotePdfFile(quote, `beat-and-beach-${plan.id}-quote.pdf`)
            .then((file) => {
                if (isCurrent) setPreparedPdf({ key: quoteKey, file, error: '' })
            })
            .catch(() => {
                if (isCurrent) setPreparedPdf({ key: quoteKey, file: null, error: copy.downloadError })
            })

        return () => {
            isCurrent = false
        }
    }, [copy.downloadError, isOpen, plan.id, quote, quoteKey])

    const handleDownload = () => {
        if (!pdfFile) return

        const downloadDate = new Date()
        const fileName = createQuoteDownloadFileName(quote.planName, downloadDate)
        try {
            downloadQuoteFile(pdfFile, fileName)
            setDownloadActionError('')
            setConfirmation({
                kind: 'download',
                message: copy.downloadSuccess(
                    fileName,
                    quote.planName,
                    formatCalendarDate(downloadDate, locale),
                ),
            })
        } catch {
            setConfirmation(null)
            setDownloadActionError(copy.downloadError)
        }
    }

    const handleShare = () => {
        if (!pdfFile) return
        setShareMessage('')
        try {
            openWhatsAppQuoteChat(
                pdfFile,
                copy.whatsappMessage(quote.planName, INSTAGRAM_PROFILE_URL),
            )
            setShareMessage(copy.whatsappOpened)
        } catch {
            setShareMessage(copy.shareError)
        }
    }

    const handleClose = () => {
        setDownloadActionError('')
        setConfirmation(null)
        setEmailError('')
        setShareMessage('')
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            labelledBy={confirmation
                ? `itinerary-${confirmation.kind}-confirmation-title`
                : emailError
                    ? 'itinerary-email-error-title'
                    : 'itinerary-quote-title'}
            closeLabel={t.common.close}
            wide
        >
            {confirmation ? (
                <div className="modal-body itinerary-download-confirmation">
                    <span className="itinerary-download-confirmation-icon" aria-hidden="true">✓</span>
                    <h3 id={`itinerary-${confirmation.kind}-confirmation-title`}>
                        {confirmation.kind === 'download'
                            ? copy.downloadConfirmationTitle
                            : copy.emailConfirmationTitle}
                    </h3>
                    <p>{confirmation.message}</p>
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() => setConfirmation(null)}
                    >
                        {copy.acceptAndReturn}
                    </button>
                </div>
            ) : emailError ? (
                <div className="modal-body itinerary-download-confirmation itinerary-email-error-confirmation">
                    <span className="itinerary-download-confirmation-icon" aria-hidden="true">!</span>
                    <h3 id="itinerary-email-error-title">{copy.emailErrorTitle}</h3>
                    <p role="alert">{emailError}</p>
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() => setEmailError('')}
                    >
                        {copy.acceptAndReturn}
                    </button>
                </div>
            ) : (
                <div className="modal-body itinerary-quote-modal">
                    <span className="eyebrow">{copy.eyebrow}</span>
                    <h3 id="itinerary-quote-title">{copy.title}</h3>

                    <ItineraryQuotePreview quote={quote} planLabel={copy.planLabel} />

                    <div className="action-row modal-actions itinerary-quote-actions">
                        <div className="itinerary-quote-download">
                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleDownload}
                                disabled={!pdfFile || isPreparing}
                            >
                                {isPreparing ? copy.downloadingQuote : copy.downloadQuote}
                            </button>
                            {downloadError ? (
                                <p className="itinerary-quote-download-error" role="alert">{downloadError}</p>
                            ) : null}
                        </div>
                    </div>

                    <div className="itinerary-quote-share">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleShare}
                            disabled={!pdfFile || isPreparing}
                        >
                            {isPreparing ? copy.sharingQuote : copy.shareQuote}
                        </button>
                        <p>{copy.shareInstructions(WHATSAPP_BUSINESS_PHONE)}</p>
                        {shareMessage ? <p role="status" aria-live="polite">{shareMessage}</p> : null}
                    </div>

                    <ItineraryQuoteEmailForm
                        quote={quote}
                        onError={setEmailError}
                    />
                </div>
            )}
        </Modal>
    )
}
