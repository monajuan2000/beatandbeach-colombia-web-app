const projects = [
    {
        name: 'Beat & Beach Colombia',
        type: 'Tourism platform',
        description: 'A digital experience showcasing events, destinations, and travel storytelling across Colombia.',
        status: 'Active',
        accent: 'green',
    },
    {
        name: 'Travel Experience App',
        type: 'Product concept',
        description: 'A future app for booking experiences, city guides, and curated itinerary planning.',
        status: 'In progress',
        accent: 'blue',
    },
    {
        name: 'Brand Portfolio',
        type: 'Creative showcase',
        description: 'A visual identity system for tourism, culture, and lifestyle brands in Latin America.',
        status: 'Planning',
        accent: 'purple',
    },
]

export function ProjectsSection() {
    return (
        <section className="projects-section" aria-label="Current projects">
            <div className="section-header projects-header">
                <div>
                    <span className="eyebrow">Current projects</span>
                    <h2>Projects I’m building right now.</h2>
                </div>
            </div>

            <div className="projects-grid">
                {projects.map((project) => (
                    <article key={project.name} className={`project-card project-${project.accent}`}>
                        <div className="project-topline">
                            <span className="project-type">{project.type}</span>
                            <span className="project-status">{project.status}</span>
                        </div>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
