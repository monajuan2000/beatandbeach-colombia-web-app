import wondersBannerImage from '@/assets/images/destinations/colombia-wonders-banner.jpeg'
import './ColombiaWondersShowcase.css'

export function ColombiaWondersShowcase() {
    return (
        <section className="wonders-showcase" aria-label="Colombia highlights banner">
            <div
                className="wonders-showcase-visual"
                style={{ backgroundImage: `url("${wondersBannerImage}")` }}
            />
            <div className="wonders-showcase-copy">
                <span className="eyebrow">A country of contrasts</span>
                <h2>Wonders of Colombia</h2>
                <p>
                    From the Caribbean coast to the Andes and the Pacific, Colombia offers a rich mix of
                    culture, color, and unforgettable landscapes in every region.
                </p>
            </div>
        </section>
    )
}
