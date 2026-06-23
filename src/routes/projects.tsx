import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { allProjects } from 'content-collections'
import { ArrowUpRight, Github } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

// Extra visual metadata per project (mapped by title keywords)
const PROJECT_ACCENTS: Record<string, { color: string; num: string }> = {
  default: { color: '#ff5500', num: '01' },
}

function Projects() {
  const { t } = useTranslation()
  const projects = allProjects

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: '#ff5500' }}
          >
            {t('projects.eyebrow')}
          </span>
          <h1
            className="font-display mt-4 mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--fg)', lineHeight: 0.95 }}
          >
            {t('projects.title')}
          </h1>
          <p className="text-base" style={{ color: 'var(--fg-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            A curated selection of work across product design, creative development,
            and full-stack engineering.
          </p>
        </div>
      </section>

      {/* Project list */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="max-w-6xl mx-auto">
          {/* Featured projects (first 2) */}
          {projects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mt-0" style={{ background: 'var(--border)' }}>
              {projects.slice(0, 2).map((project, i) => (
                <ProjectCard key={project._meta.path} project={project} index={i} featured />
              ))}
            </div>
          )}

          {/* Remaining projects */}
          {projects.length > 2 && (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px mt-px"
              style={{ background: 'var(--border)' }}
            >
              {projects.slice(2).map((project, i) => (
                <ProjectCard key={project._meta.path} project={project} index={i + 2} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="py-24 text-center">
              <p style={{ color: 'var(--fg-muted)' }}>No projects yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof allProjects)[0]
  index: number
  featured?: boolean
}) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="group flex flex-col p-8 transition-colors"
      style={{
        background: 'var(--bg)',
        minHeight: featured ? '360px' : '280px',
        position: 'relative',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
    >
      {/* Number */}
      <div
        className="font-mono text-xs mb-6"
        style={{ color: 'rgba(255,85,0,0.5)' }}
      >
        {num}
      </div>

      {/* Title */}
      <h2
        className="font-display mb-3 group-hover:text-[#ff5500] transition-colors"
        style={{
          fontSize: featured ? 'clamp(1.5rem, 2.5vw, 2rem)' : '1.4rem',
          color: 'var(--fg)',
          lineHeight: 1.15,
        }}
      >
        {project.title}
      </h2>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: 'var(--fg-muted)' }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5 mb-5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded"
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--fg-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors"
            style={{ color: 'var(--fg-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
          >
            <Github size={13} /> Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors"
            style={{ color: '#ff5500' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Live Demo <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  )
}
