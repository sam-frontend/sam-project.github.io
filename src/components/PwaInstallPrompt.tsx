import { useEffect, useRef, useState } from 'react'

export function PwaInstallPrompt() {
  const promptEventRef = useRef<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [hasInstallEvent, setHasInstallEvent] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let promptTimer: number | null = null
    let fallbackTimer: number | null = null

    const beforeInstallPromptHandler = (event: Event) => {
      event.preventDefault()
      promptEventRef.current = event as BeforeInstallPromptEvent
      setHasInstallEvent(true)
      promptTimer = window.setTimeout(() => setVisible(true), 3000)
    }

    const appInstalledHandler = () => {
      setInstalled(true)
      setVisible(false)
      if (promptTimer) {
        window.clearTimeout(promptTimer)
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer)
      }
    }

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    window.addEventListener('appinstalled', appInstalledHandler)

    fallbackTimer = window.setTimeout(() => {
      if (!promptEventRef.current && !installed) {
        setShowFallback(true)
        setVisible(true)
      }
    }, 8000)

    return () => {
      if (promptTimer) {
        window.clearTimeout(promptTimer)
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer)
      }
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler)
      window.removeEventListener('appinstalled', appInstalledHandler)
    }
  }, [installed])

  const handleInstall = async () => {
    const promptEvent = promptEventRef.current
    if (!promptEvent) return

    await promptEvent.prompt()
    const choiceResult = await promptEvent.userChoice
    if (choiceResult.outcome === 'accepted') {
      setVisible(false)
    }
    promptEventRef.current = null
    setHasInstallEvent(false)
  }

  const handleDismiss = () => {
    setVisible(false)
  }

  if (!visible || installed) {
    return null
  }

  return (
    <div className="pwa-install-prompt">
      <div>
        <p className="pwa-install-title">Install this portfolio</p>
        <p className="pwa-install-copy">
          {hasInstallEvent
            ? 'Get faster access and an app-like experience on your device.'
            : 'If the automatic install prompt does not appear, use your browser menu and choose "Install app" or "Add to home screen."'}
        </p>
      </div>
      <div className="pwa-install-actions">
        {hasInstallEvent && (
          <button type="button" className="pwa-install-button primary" onClick={handleInstall}>
            Install
          </button>
        )}
        <button type="button" className="pwa-install-button secondary" onClick={handleDismiss}>
          {hasInstallEvent ? 'Dismiss' : 'Close'}
        </button>
      </div>
    </div>
  )
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}
