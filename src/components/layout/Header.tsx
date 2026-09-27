import logoImage from '../../assets/BEATANDBEACH_COLOMBIA_MAINLOGO.png'

export function Header() {
    return (
        <header className="site-header">
            <div className="brand-block" aria-label="Beat and Beach Colombia brand">
                <img
                    src={logoImage}
                    alt="Beat and Beach Colombia logo"
                    className="brand-logo"
                />
                <div className="brand-copy">
                    <p className="brand-name">Beat & Beach</p>
                    <span className="brand-subtitle">Colombia events</span>
                </div>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
                <a href="#discover">Discover</a>
                <a href="#cities">Cities</a>
                <a href="#events">Events</a>
                <a href="#insights">Insights</a>
            </nav>

            <button type="button" className="primary-button small-button">
                Plan my trip
            </button>
        </header>
    )
}
