import { featuredEvents } from '../../data/events'

export function EventsList() {
    return (
        <section className="content-section" id="events">
            <div className="section-header">
                <div>
                    <span className="eyebrow">Featured events</span>
                    <h2>Curated experiences you can join right away.</h2>
                </div>
            </div>

            <div className="events-list">
                {featuredEvents.map((event) => (
                    <article key={event.id} className={`event-card ${event.featured ? 'featured' : ''}`}>
                        <div className="event-card-top">
                            <span className="event-category">{event.category}</span>
                            {event.featured ? <span className="event-featured">Featured</span> : null}
                        </div>
                        <h3>{event.title}</h3>
                        <p className="event-location">{event.city} · {event.location}</p>
                        <p className="event-summary">{event.summary}</p>
                        <div className="event-meta">
                            <span>{event.date}</span>
                            <span>{event.price}</span>
                        </div>
                        <div className="event-footer">
                            <small>{event.audience}</small>
                            <button type="button" className="text-button">
                                View details
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
