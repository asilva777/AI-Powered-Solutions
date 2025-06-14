const CACHE_NAME = 'mh-digital-apps-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/onboarding.js',
  '/icons/icon-192x192.png',
  '/manifest.json',
  // Add other assets you want to cache
];

// Install: Pre-cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: Remove any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Serve cached assets, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;

  // For navigation requests, try network first, then cache, then fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Optionally update the cache with the latest HTML
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match('/index.html')
        )
    );
    return;
  }

  // For other requests (static assets): cache-first
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, fetch from network and cache it
      return fetch(request).then(networkResponse => {
        // Only cache GET requests and successful responses
        if (
          request.method === 'GET' &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic'
        ) {
          caches.open(CACHE_NAME).then(cache =>
            cache.put(request, networkResponse.clone())
          );
        }
        return networkResponse;
      }).catch(() => {
        // Optionally: fallback for requests like images
        if (request.destination === 'image') {
          return caches.match('/icons/icon-192x192.png');
        }
      });
    })
  );
});
