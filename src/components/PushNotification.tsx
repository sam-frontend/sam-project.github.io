import { useEffect, useState } from 'react'

export function PushNotification() {
  const [supported, setSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    setSupported('Notification' in window)
    setPermission(window.Notification?.permission ?? 'default')
  }, [])

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js')
        console.log('Service worker registered')
      } catch (error) {
        console.error('Service worker registration failed', error)
      }
    }
  }

  const handleEnableNotifications = async () => {
    if (!supported) {
      setStatus('Browser notifications are not supported in this browser.')
      return
    }

    if (permission === 'denied') {
      setStatus('Notifications are blocked. Please update your browser settings to allow them.')
      return
    }

    try {
      const result = await window.Notification.requestPermission()
      setPermission(result)
      if (result === 'granted') {
        setStatus('Notifications enabled! Try sending a test notification.')
        registerServiceWorker()
      } else if (result === 'denied') {
        setStatus('Notifications were denied. You can enable them from your browser settings.')
      } else {
        setStatus('Notification permission request dismissed.')
      }
    } catch (error) {
      setStatus('Unable to request notification permission.')
    }
  }

  const handleTestNotification = async () => {
    if (permission !== 'granted') {
      setStatus('Please enable notifications first.')
      return
    }

    try {
      const notification = new window.Notification('Sam Portfolio', {
        body: 'Thanks for enabling notifications! Stay tuned for updates and project news.',
        icon: '/favicon.ico',
      })
      notification.onclick = () => window.focus()
      setStatus('Test notification sent.')
    } catch (error) {
      setStatus('Unable to send the notification from this browser.')
    }
  }

  return (
    <div
      className="push-notification-card"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <p className="font-display" style={{ fontSize: '1.45rem', margin: 0, color: 'var(--fg)' }}>
            Browser Notifications
          </p>
          <p style={{ margin: '0.45rem 0 0', color: 'var(--fg-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Opt in for quick portfolio updates and a more interactive experience.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={handleEnableNotifications}
          className="font-mono text-sm rounded-full transition-all"
          style={{ padding: '0.9rem 1.2rem', border: '1px solid rgba(255,85,0,0.25)', background: '#ff5500', color: '#fff' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#cc4400')}
          onMouseLeave={e => (e.currentTarget.style.background = '#ff5500')}
        >
          Enable Notifications
        </button>
        <button
          type="button"
          onClick={handleTestNotification}
          className="font-mono text-sm rounded-full transition-all"
          style={{ padding: '0.9rem 1.2rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff5500')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          Send Test Notification
        </button>
      </div>

      <p className="text-sm" style={{ margin: 0, color: 'var(--fg-muted)', minHeight: '1.2rem' }}>
        {status || (permission === 'granted' ? 'Notifications are enabled.' : 'Notifications are currently disabled.')}
      </p>
    </div>
  )
}
