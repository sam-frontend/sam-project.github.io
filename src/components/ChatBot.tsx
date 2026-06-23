import { useMemo, useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'

const DEFAULT_MESSAGES = [
  {
    role: 'assistant' as const,
    text: 'Hi! I’m Sam’s portfolio assistant. Ask me about work, design systems, or how to collaborate.',
  },
]

function getBotResponse(message: string) {
  const prompt = message.trim().toLowerCase()

  if (!prompt) {
    return 'Type a message and I’ll answer as if I were Sam.'
  }

  if (prompt.includes('project') || prompt.includes('work')) {
    return 'I ship polished web products and interfaces. My featured work includes portfolios, dashboard apps, and creative brand experiences.'
  }

  if (prompt.includes('design') || prompt.includes('ux') || prompt.includes('ui')) {
    return 'I combine visual systems with engineering. I care about typography, motion, accessibility, and building components that scale.'
  }

  if (prompt.includes('hire') || prompt.includes('available') || prompt.includes('work with')) {
    return 'I’m available for remote and freelance roles. The best way to reach me is via the contact page or email.'
  }

  if (prompt.includes('contact') || prompt.includes('email') || prompt.includes('reach')) {
    return 'You can use the contact form on the site, or email me directly at ugonnaugwueze@gmail.com.'
  }

  if (prompt.includes('stack') || prompt.includes('tech') || prompt.includes('react')) {
    return 'My stack includes React, TypeScript, Tailwind, TanStack Router, Netlify, and modern frontend tooling like Vite.'
  }

  if (prompt.includes('process') || prompt.includes('how') || prompt.includes('approach')) {
    return 'I start with goals, then move from concept to interaction, prototype, and a polished production implementation.'
  }

  return 'That sounds interesting! Ask me about the portfolio, services, or how to start a project together.'
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(DEFAULT_MESSAGES)
  const [isResponding, setIsResponding] = useState(false)

  const lastMessage = useMemo(
    () => messages[messages.length - 1],
    [messages],
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = { role: 'user' as const, text: trimmed }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsResponding(true)

    window.setTimeout(() => {
      const botMessage = { role: 'assistant' as const, text: getBotResponse(trimmed) }
      setMessages(prev => [...prev, botMessage])
      setIsResponding(false)
    }, 450)
  }

  return (
    <div className="chat-bot-root">
      <button
        type="button"
        className="chat-bot-toggle"
        onClick={() => setIsOpen(open => !open)}
        aria-label={isOpen ? 'Close chat panel' : 'Open chat panel'}
      >
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        <span>{isOpen ? 'Close Chat' : 'Chat with Sam'}</span>
      </button>

      {isOpen ? (
        <div className="chat-bot-panel">
          <div className="chat-bot-header">
            <div>
              <p className="chat-bot-title">Chat with Sam</p>
              <p className="chat-bot-subtitle">Ask about work, process, or how to collaborate.</p>
            </div>
            <button
              type="button"
              className="chat-bot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat panel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="chat-bot-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-bot-message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
              >
                <div className="chat-bot-bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {isResponding && (
              <div className="chat-bot-message assistant">
                <div className="chat-bot-bubble chat-bot-typing">Sam is typing…</div>
              </div>
            )}
          </div>

          <form className="chat-bot-form" onSubmit={handleSubmit}>
            <label htmlFor="chat-input" className="sr-only">Chat message</label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder="Ask me anything…"
              className="chat-bot-input"
            />
            <button type="submit" className="chat-bot-submit" disabled={!input.trim() || isResponding}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
