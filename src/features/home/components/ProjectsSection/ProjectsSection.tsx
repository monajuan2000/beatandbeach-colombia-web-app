import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { projects } from '../../data/projects'
import './ProjectsSection.css'

export function ProjectsSection() {
    const { t, localize } = useTranslation()
    const copy = t.home.projects

    return (
        <section className="projects-section" aria-label={copy.ariaLabel}>
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} className="projects-header" />

            <div className="projects-grid">
                {projects.map((project) => (
                    <article key={project.id} className={`project-card project-${project.accent}`}>
                        <div className="project-topline">
                            <span className="project-type">{localize(project.type)}</span>
                            <span className="project-status">{localize(project.status)}</span>
                        </div>
                        <h3>{localize(project.name)}</h3>
                        <p>{localize(project.description)}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
