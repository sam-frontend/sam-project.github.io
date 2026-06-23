import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Send, CheckCircle } from 'lucide-react'
import { PushNotification } from '../components/PushNotification'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@sam-frontend',
    href: 'https://github.com/sam-frontend',
    desc: 'Open-source work & side projects',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    handle: '@sam_fulstack',
    href: 'https://twitter.com/sam_fullstack',
    desc: 'Thoughts on design & engineering',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'Sam',
    href: 'https://linkedin.com/in/sam~chris',
    desc: 'Professional network & resume',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'sam',
    href: 'mailto:ugonnaugwueze@gmail.com',
    desc: 'For project inquiries & collabs',
  },
]

function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const endpoint = import.meta.env.DEV
        ? '/api/contact'
        : '/contact.html'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          formData as unknown as Record<string, string>,
        ).toString(),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || result.message || response.statusText)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Contact submission failed:', err)
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#ff5500' }}>
            {t('contact.eyebrow')}
          </span>
          <h1
            className="font-display mt-4 mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--fg)', lineHeight: 0.95 }}
          >
            {t('contact.heroTitleLine1')}
            <br />
            <em style={{ color: '#ff5500' }}>{t('contact.heroTitleLine2')}</em>
          </h1>
          <p className="text-base" style={{ color: 'var(--fg-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            Open to remote projects, full-time roles, and interesting collaborations.
            Response time is usually within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4rem 1.5rem 6rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Social Links */}
          <div>
            <h2
              className="font-display text-2xl mb-8"
              style={{ color: 'var(--fg)' }}
            >
              Find me online
            </h2>
            <div className="space-y-2">
              {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 rounded-lg transition-colors"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,85,0,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: 'var(--bg-surface)', color: 'var(--fg-muted)' }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#ff5500' }}
                      />
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{handle}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)', opacity: 0.7 }}>{desc}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability note */}
            <div
              className="mt-8 p-5 rounded-lg"
              style={{ background: 'rgba(255,85,0,0.06)', border: '1px solid rgba(255,85,0,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: '#4ade80' }}
                />
                <span className="font-mono text-xs tracking-wider uppercase" style={{ color: '#ff5500' }}>
                  Currently available
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                I'm taking on any projects. If you have
                something interesting, I'd love to hear about it.
              </p>
            </div>

            <div className="mt-8">
              <PushNotification />
            </div>
          </div>

          {/* Form */}
          <div>
            <h2
              className="font-display text-2xl mb-8"
              style={{ color: 'var(--fg)' }}
            >
              Send a message
            </h2>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-5 p-12 rounded-xl text-center"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-card)', minHeight: '400px' }}
              >
                <CheckCircle size={40} style={{ color: '#4ade80' }} />
                <div>
                  <h3
                    className="font-display text-2xl mb-2"
                    style={{ color: 'var(--fg)' }}
                  >
                    Message received!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    Thanks for reaching out. I'll be in touch within 2 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                  style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name" id="name" name="name" type="text" placeholder="Your name" required />
                  <Field label="Email" id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>

                <Field label="Subject" id="subject" name="subject" type="text" placeholder="Project inquiry, collaboration..." />

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs tracking-wider uppercase mb-2"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    Message <span style={{ color: '#ff5500' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className="w-full px-4 py-3 text-sm rounded-lg transition-colors resize-none outline-none"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--fg)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded font-medium text-sm transition-all"
                  style={{
                    background: loading ? 'var(--bg-surface)' : '#ff5500',
                    color: loading ? 'var(--fg-muted)' : '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#cc4400' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#ff5500' }}
                >
                  {loading ? (
                    <>Sending…</>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
                {error ? (
                  <div
                    className="mt-4 rounded-lg px-4 py-3 text-sm"
                    style={{ background: 'rgba(255,85,0,0.12)', color: '#ff5500', border: '1px solid rgba(255,85,0,0.3)' }}
                  >
                    {error}
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({
  label,
  id,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  id: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-xs tracking-wider uppercase mb-2"
        style={{ color: 'var(--fg-muted)' }}
      >
        {label} {required && <span style={{ color: '#ff5500' }}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm rounded-lg transition-colors outline-none"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--fg)',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}
