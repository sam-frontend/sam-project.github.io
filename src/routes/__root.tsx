import { HeadContent, Scripts, createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import '../i18n'
import { Github, Twitter, Linkedin, Globe, Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatBot } from '../components/ChatBot'
import { PwaRegister } from '../components/PwaRegister'
import { PwaInstallPrompt } from '../components/PwaInstallPrompt'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0a0a0a' },
      { title: 'Sam Ugwu — Creative Developer' },
      { name: 'description', content: 'Creative developer crafting thoughtful digital experiences at the intersection of design and engineering.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
})

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/projects', labelKey: 'nav.projects' },
  { to: '/contact', labelKey: 'nav.contact' },
] as const

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ig', label: 'Igbo' },
  { value: 'ha', label: 'Hausa' },
  { value: 'yo', label: 'Yorùbá' },
] as const

function Nav() {
  const location = useRouterState({ select: s => s.location.pathname })
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const preferredTheme = storedTheme ?? (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    )
    setTheme(preferredTheme)
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark')
    document.documentElement.classList.toggle('light', preferredTheme === 'light')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 nav-blur"
      style={{ borderBottom: '1px solid var(--border)', background: 'rgba(10,10,10,0.85)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg tracking-tight" style={{ color: 'var(--fg)' }}>
          Sam<span style={{ color: '#ff5500' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, labelKey }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                location === to ? 'active' : ''
              }`}
              style={{ color: location === to ? '#ff5500' : 'var(--fg-muted)' }}
            >
              {t(labelKey)}
            </Link>
          ))}

          <label className="ml-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: 'var(--border-light)', color: 'var(--fg)' }}>
            <Globe size={14} />
            <span className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>
              {LANGUAGE_OPTIONS.find(option => option.value === i18n.language)?.label ?? 'English'}
            </span>
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold outline-none"
              style={{ color: 'var(--fg)' }}
              aria-label="Select language"
            >
              {LANGUAGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border p-2 text-xs transition-colors hover:bg-white/5"
            style={{ borderColor: 'var(--border-light)', color: 'var(--fg)' }}
            aria-label="Toggle light and dark mode"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border p-2 transition-colors hover:bg-white/5"
            style={{ borderColor: 'var(--border-light)', color: 'var(--fg)' }}
            aria-label="Toggle light and dark mode"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="inline-flex items-center justify-center rounded-full border p-2 transition-colors hover:bg-white/5"
            style={{ borderColor: 'var(--border-light)', color: 'var(--fg)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          <nav className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map(({ to, labelKey }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium tracking-wide transition-colors rounded"
                style={{
                  color: location === to ? '#ff5500' : 'var(--fg-muted)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
          <label
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: 'var(--border-light)', color: 'var(--fg)' }}
          >
            <Globe size={14} />
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold outline-none"
              style={{ color: 'var(--fg)' }}
              aria-label="Select language"
            >
              {LANGUAGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl mb-1">
            Sam<span style={{ color: '#ff5500' }}>.</span>
          </p>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Creative Developer · Lagos, NG
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/sam-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: 'var(--fg-muted)' }}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://twitter.com/sam_fulstack"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: 'var(--fg-muted)' }}
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sam~chris"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: 'var(--fg-muted)' }}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
          © 2025 Sam Ugwu. Developed with precision.
        </p>
      </div>
    </footer>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: '4rem' }}>
          {children}
        </main>
        <Footer />
        <ChatBot />
        <PwaRegister />
        <PwaInstallPrompt />
        <Scripts />
      </body>
    </html>
  )
}
