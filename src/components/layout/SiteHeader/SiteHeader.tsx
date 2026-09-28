import { Link } from 'react-router-dom'
import logoImage from '@/assets/images/brand/beat-and-beach-logo.png'
import { useTrip } from '@/features/trip/context/TripContext'
import './SiteHeader.css'

const navItems = [
    { label: 'Discover', section: 'discover' },
    { label: 'Cities', section: 'cities' },
    { label: 'Events', section: 'events' },
    { label: 'Insights', section: 'insights' },
]

export function SiteHeader() {
    const { savedEventIds, openPlanner } = useTrip()

    return (
        <header className="site-header">
            <Link to="/" className="brand-block" aria-label="Beat and Beach Colombia, go to home">
                <img
                    src={logoImage}
                    alt="Beat and Beach Colombia logo"
                    className="brand-logo"
                />
                <div className="brand-copy">
                    <p className="brand-name">Beat & Beach</p>
                    <span className="brand-subtitle">Colombia events</span>
                </div>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                    <Link key={item.section} to="/" state={{ scrollTo: item.section }}>
                        {item.label}
                    </Link>
                ))}
            </nav>

            <button type="button" className="primary-button small-button" onClick={() => openPlanner()}>
                Plan my trip
                {savedEventIds.length > 0 ? (
                    <span className="trip-count" aria-label={`${savedEventIds.length} saved events`}>
                        {savedEventIds.length}
                    </span>
                ) : null}
            </button>
        </header>
    )
}
