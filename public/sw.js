const CACHE_NAME = 'sam-portfolio-cache-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/favicon.ico',
  '/manifest.webmanifest',
  '/contact.html',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
          return Promise.resolve()
        }),
      ),
    ),
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request)),
  )
})

self.addEventListener('push', event => {
  const message = event.data?.text() || 'New update from Sam’s portfolio.'
  const options = {
    body: message,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  }
  event.waitUntil(self.registration.showNotification('Sam Portfolio', options))
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      if (windowClients.length > 0) {
        return windowClients[0].focus()
      }
      return clients.openWindow('/')
    }),
  )
})
