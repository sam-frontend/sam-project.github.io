import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Code2, Palette, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const FEATURED_WORK = [
  {
    title: 'Rivasult',
    category: 'UI Engineering',
    year: '2024',
    tags: ['React', 'TypeScript', 'Figma'],
    href: '/projects',
  },
  {
    title: 'Wayapay',
    category: 'Full-Stack',
    year: '2024',
    tags: ['Next.js', 'Postgres', 'Recharts'],
    href: '/projects',
  },
  {
    title: 'Arkive Photo Portfolio',
    category: 'Creative Dev',
    year: '2023',
    tags: ['TanStack', 'Netlify', 'GSAP'],
    href: '/projects',
  },
]

const SKILLS = [
  { icon: Code2, label: 'Engineering', desc: 'React, TypeScript, Node.js' },
  { icon: Palette, label: 'Design Systems', desc: 'Figma, Tailwind, Design Tokens' },
  { icon: Zap, label: 'Performance', desc: 'Edge, CDN, Core Web Vitals' },
]

function Home() {
  const { t } = useTranslation()

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
        style={{ padding: '6rem 1.5rem 4rem' }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '50vw',
            height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(255,85,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="max-w-6xl mx-auto w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 fade-up" style={{ animationDelay: '0.05s' }}>
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: '#ff5500' }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--fg-muted)' }}
            >
              {t('eyebrow')}
            </span>
          </div>
          <div
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--fg-muted)', padding: '0 2rem' }}
          >
            React · TypeScript · Node.js · TanStack · Tailwind · Figma · PostgreSQL · Netlify · GSAP · Vite · Prisma · GraphQL · React · TypeScript · Node.js · TanStack · Tailwind
          </div>
          <h1
            className="font-display mt-4 mb-4"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              marginBottom: '2rem',
              animationDelay: '0.1s',
            }}
          >
            {t('hero.line1')}
            <br />
            <em style={{ color: '#ff5500', fontStyle: 'italic' }}>{t('hero.line2')}</em>
            <br />
            {t('hero.line3')}
          </h1>

          {/* Sub */}
          <p
            className="fade-up"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--fg-muted)',
              maxWidth: '480px',
              lineHeight: 1.7,
              marginBottom: '3rem',
              animationDelay: '0.2s',
            }}
          >
            {t('hero.sub')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded transition-all"
              style={{
                background: '#ff5500',
                color: '#fff',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#cc4400')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ff5500')}
            >
              {t('hero.ctaWork')} <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded border transition-all"
              style={{ borderColor: 'var(--border-light)', color: 'var(--fg-muted)' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--fg)'
                e.currentTarget.style.borderColor = 'var(--fg-muted)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--fg-muted)'
                e.currentTarget.style.borderColor = 'var(--border-light)'
              }}
            >
              {t('hero.ctaContact')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 fade-up"
            style={{ transform: 'translateX(-50%)', animationDelay: '0.5s' }}
          >
            <div
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--fg-muted)' }}
            >
              {t('hero.scroll')}
            </div>
          </div>
      </section>

      {/* Marquee divider */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          padding: '0.75rem 0',
          background: 'var(--bg-card)',
        }}
      >
        <div
          className="font-mono text-xs tracking-widest uppercase whitespace-nowrap"
          style={{ color: 'var(--fg-muted)', padding: '0 2rem' }}
        >
          React · TypeScript · Node.js · TanStack · Tailwind · Figma · PostgreSQL · Netlify · GSAP · Vite · Prisma · GraphQL · React · TypeScript · Node.js · TanStack · Tailwind
        </div>
      </div>

      {/* Skills strip */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {SKILLS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col gap-4 p-8"
                style={{ background: 'var(--bg)' }}
              >
                <div
                  className="w-10 h-10 rounded flex items-center justify-center"
                  style={{ background: 'rgba(255,85,0,0.1)', color: '#ff5500' }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3
                    className="font-display text-xl mb-1"
                    style={{ color: 'var(--fg)' }}
                  >
                    {label}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section style={{ padding: '0 1.5rem 6rem', background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--fg)' }}
            >
              {t('selectedWork')}
            </h2>
            <Link
              to="/projects"
              className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-colors"
              style={{ color: 'var(--fg-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ff5500')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              {t('allProjects')} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col" style={{ borderTop: '1px solid var(--border)' }}>
            {FEATURED_WORK.map((work, i) => (
              <Link
                key={work.title}
                to={work.href as '/projects'}
                className="group flex items-center justify-between py-7 transition-colors"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-8">
                  <span
                    className="font-mono text-xs w-6 text-right"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3
                      className="font-display text-2xl group-hover:text-[#ff5500] transition-colors mb-1"
                      style={{ color: 'var(--fg)' }}
                    >
                      {work.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{work.category}</span>
                      <span style={{ color: 'var(--border-light)' }}>·</span>
                      {work.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-xs"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{work.year}</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                    style={{ color: '#ff5500' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--fg)', lineHeight: 1.1 }}
            >
              {t('cta.title')}
              <br />
              <em style={{ color: '#ff5500' }}>{t('cta.subtitle')}</em>
            </h2>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 font-medium px-8 py-4 rounded transition-all"
            style={{ background: '#ff5500', color: '#fff', fontSize: '1rem' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#cc4400')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ff5500')}
          >
            {t('cta.start')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
