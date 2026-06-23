import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/about')({
  component: About,
})

const SKILLS = {
  Frontend: ['HTML','CSS','React', 'TypeScript', 'TanStack Router', 'Tailwind CSS', 'GSAP', 'React-native-expo'],
  Backend: ['Node.js','expressjs', 'PostgreSQL', 'Prisma', 'GraphQL', 'Redis', 'REST APIs'],
  Tooling: ['Vite', 'Netlify', 'Docker', 'GitHub Actions', 'Figma', 'Storybook'],
}

const TIMELINE = [
  {
    year: '2024',
    role: 'Frontend Engineer/QA',
    company: 'Wayapay',
    desc: 'Led the design system rebuild, reducing component duplication by 60% and shipping a token-driven theming system used across 4 product lines.',
  },
  {
    year: '2023',
    role: 'Front-End Engineer',
    company: 'Rivasult',
    desc: 'Built the analytics platform from scratch — real-time dashboards, custom charting, and a data pipeline processing 2M events/day.',
  },
  {
    year: '2020',
    role: 'Frontend Developer',
    company: 'Studio North',
    desc: 'Creative agency work: marketing sites, interactive campaigns, and e-commerce builds for clients ranging from startups to Fortune 500s.',
  },
]

function About() {
  const { t } = useTranslation()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: '#ff5500' }}
            >
              {t('about.eyebrow')}
            </span>
            <h1
              className="font-display mt-4 mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95, color: 'var(--fg)' }}
            >
              {t('about.titleLine1')}
              <br />
              {t('about.titleLine2')}
              <br />
              <em style={{ color: '#ff5500' }}>{t('about.titleLine3')}</em>
            </h1>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-muted)', maxWidth: '480px' }}>
              I'm Sam Ugwu — a Lagos-based creative developer with 3+ years
              crafting digital products that balance technical rigor with visual clarity.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)', maxWidth: '480px' }}>
              My background bridges both worlds: I studied computer science but grew up
              drawing and designing. That dual fluency shapes everything I build — I
              care deeply about both the pixels and the performance.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-2xl opacity-20"
              style={{ background: 'radial-gradient(ellipse, #ff5500, transparent)' }}
            />
            <div className="relative" style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img
                src="/.netlify/images?url=/portfolio.jpg&w=800&h=1000&fit=cover&q=85&fm=webp"
                alt="Sam Ugonna — Creative Developer"
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl"
                style={{
                  background: 'rgba(10,10,10,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div className="font-display text-lg" style={{ color: 'var(--fg)' }}>Sam Ugwu</div>
                <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                  Creative Developer · Lagos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '3+', label: 'Years experience' },
            { value: '12', label: 'Long-term clients' },
            { value: '3', label: 'Open-source libs' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display"
                style={{ fontSize: '3rem', color: '#ff5500', lineHeight: 1 }}
              >
                {value}
              </div>
              <div className="font-mono text-xs mt-2 tracking-wider uppercase" style={{ color: 'var(--fg-muted)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display mb-12"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--fg)' }}
          >
            Skills & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <div
                  className="font-mono text-xs tracking-widest uppercase mb-5"
                  style={{ color: '#ff5500' }}
                >
                  {category}
                </div>
                <ul className="space-y-2">
                  {items.map(skill => (
                    <li key={skill} className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#ff5500', opacity: 0.6 }}
                      />
                      <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display mb-12"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--fg)' }}
          >
            Experience
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[3.5rem] top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'var(--border)' }}
            />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 py-8"
                  style={{ borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  {/* Year */}
                  <div className="flex items-start gap-4 md:flex-col md:items-center md:w-28 flex-shrink-0">
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: '#ff5500' }}
                    >
                      {item.year}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full mt-1 hidden md:block"
                      style={{ background: '#ff5500', boxShadow: '0 0 8px rgba(255,85,0,0.5)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3
                        className="font-display text-xl"
                        style={{ color: 'var(--fg)' }}
                      >
                        {item.role}
                      </h3>
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        @ {item.company}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
