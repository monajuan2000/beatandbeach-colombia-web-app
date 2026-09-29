import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { useTranslation } from '@/i18n/context/LanguageContext'
import { formatCardNumber, revealDelay } from '@/utils/reveal'
import { projects } from '../../data/projects'
import './ProjectsSection.css'

export function ProjectsSection() {
    const { t, localize } = useTranslation()
    const copy = t.home.projects
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="projects-section" aria-label={copy.ariaLabel}>
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} variant="accent" className="projects-header" />

            <div ref={ref} className={`projects-grid reveal-group ${inView ? 'is-revealed' : ''}`}>
                {projects.map((project, index) => (
                    <article
                        key={project.id}
                        className={`project-card project-${project.accent} dark-card accent-card reveal-item`}
                        style={revealDelay(index)}
                    >
                        <div className="project-topline">
                            <span className="project-type">{localize(project.type)}</span>
                            <span className={`project-status project-status-${project.stage}`}>
                                {localize(project.status)}
                            </span>
                        </div>
                        <span className="card-number project-number" aria-hidden="true">
                            {formatCardNumber(index)}
                        </span>
                        <h3>{localize(project.name)}</h3>
                        <p>{localize(project.description)}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
