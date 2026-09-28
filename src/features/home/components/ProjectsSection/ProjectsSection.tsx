import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { projects } from '../../data/projects'
import './ProjectsSection.css'

export function ProjectsSection() {
    return (
        <section className="projects-section" aria-label="Current projects">
            <SectionHeader
                eyebrow="Current projects"
                title="Projects I’m building right now."
                className="projects-header"
            />

            <div className="projects-grid">
                {projects.map((project) => (
                    <article key={project.id} className={`project-card project-${project.accent}`}>
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
