import { INSTAGRAM_PROFILE_URL } from '@/config/externalLinks'
import { useTranslation } from '@/i18n/context/LanguageContext'
import './InstagramFollowLink.css'

export function InstagramFollowLink() {
    const { t } = useTranslation()
    const copy = t.home.about

    return (
        <a
            className="instagram-follow-link"
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={copy.instagramLinkLabel}
        >
            <span className="instagram-follow-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                </svg>
            </span>
            <span className="instagram-follow-copy">
                <strong>@beatand.beach</strong>
                <small>{copy.instagramCta}</small>
            </span>
            <span className="instagram-follow-arrow" aria-hidden="true">↗</span>
        </a>
    )
}
