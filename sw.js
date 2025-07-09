// Dateien für den Offline-Zugriff speichern
const CACHE_NAME = 'hausaufgaben-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  console.log('🔧 Service Worker installiert');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('🧹 Service Worker aktiviert');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🗑️ Alter Cache wird gelöscht:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Hier wird später die Push-Nachricht verarbeitet
self.addEventListener('push', event => {
  const data = event.data.json();
  const title = data.title || '📌 Erinnerung';
  const options = {
    body: data.body,
    icon: 'icon-192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


