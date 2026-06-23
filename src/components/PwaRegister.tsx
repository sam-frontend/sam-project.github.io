import { useEffect } from 'react'

export function PwaRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js')
        console.log('PWA service worker registered')
      } catch (error) {
        console.error('PWA service worker registration failed', error)
      }
    }

    registerServiceWorker()
  }, [])

  return null
}
