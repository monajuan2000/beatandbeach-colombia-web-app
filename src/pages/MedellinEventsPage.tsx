import { Link } from 'react-router-dom'
import edcColombiaImage from '../assets/EDC_COLOMBIA2026.jpeg'

const medellinEvents = [
    {
        title: 'EDC Colombia 2026',
        type: 'Electronic music',
        date: '10-11 Oct 2026',
        venue: 'Medellín',
        summary:
            'The city’s biggest electronic celebration with immersive stages, iconic DJs, and a full weekend of music, lights, and atmosphere.',
        image: edcColombiaImage,
    },
    {
        title: 'Medellín Music Week',
        type: 'Concert series',
        date: '18 Sep 2026',
        venue: 'El Poblado',
        summary:
            'A week of concerts, indie showcases, and urban culture experiences that bring together local and global artists.',
    },
    {
        title: 'Festival de las Flores',
        type: 'Cultural fair',
        date: '2 Oct 2026',
        venue: 'Centro Histórico',
        summary:
            'One of the city’s most iconic celebrations, combining music, flowers, local gastronomy, and community traditions.',
    },
    {
        title: 'Arena Medellín Live',
        type: 'Live concert',
        date: '7 Nov 2026',
        venue: 'Arena Medellín',
        summary:
            'A major venue for concerts, pop, rock, and global talent, designed for a high-energy night experience.',
    },
    {
        title: 'Salsa & Rhythm Nights',
        type: 'Dance experience',
        date: 'Every Friday',
        venue: 'Various clubs',
        summary:
            'A rotating selection of salsa, electronic fusion, and live sets in Medellín’s nightlife scene.',
    },
    {
        title: 'Innovation & Design Fair',
        type: 'Expo / convention',
        date: '21 Nov 2026',
        venue: 'Ruta N',
        summary:
            'An entrepreneurship and innovation event with talks, culture spaces, networking, and brand showcases.',
    },
]

export function MedellinEventsPage() {
    return (
        <div className="city-page-shell">
            <header className="city-page-banner">
                <div>
                    <span className="eyebrow">City experience</span>
                    <h1>Medellín events</h1>
                    <p>
                        Discover the energy of Medellín through its best festivals, nightlife, live concerts,
                        and cultural experiences.
                    </p>
                </div>
                <Link to="/" className="secondary-button city-page-back">
                    Back to home
                </Link>
            </header>

            <section className="city-page-intro">
                <div className="city-page-highlight">
                    <span className="card-tag">Featured</span>
                    <h2>Why Medellín stands out</h2>
                    <p>
                        Medellín merges innovation, culture, and nightlife in a way that makes every week feel
                        like a celebration. From electronic music gatherings to big-city festivals, there is
                        always something happening.
                    </p>
                </div>

                <div className="city-page-stats">
                    <div>
                        <strong>25+</strong>
                        <span>major events per month</span>
                    </div>
                    <div>
                        <strong>3</strong>
                        <span>top nightlife districts</span>
                    </div>
                    <div>
                        <strong>1</strong>
                        <span>city full of energy</span>
                    </div>
                </div>
            </section>

            <section className="city-events-grid" aria-label="Medellín events list">
                {medellinEvents.map((event) => (
                    <article
                        key={event.title}
                        className="city-event-card"
                        style={
                            event.image
                                ? {
                                    backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.92)), url("${event.image}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }
                                : undefined
                        }
                    >
                        <div className="city-event-topline">
                            <span className="event-category">{event.type}</span>
                            <span className="event-date">{event.date}</span>
                        </div>

                        <h3>{event.title}</h3>
                        <p className="city-event-location">{event.venue}</p>
                        <p className="city-event-summary">{event.summary}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}
