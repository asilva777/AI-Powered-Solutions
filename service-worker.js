const CACHE_NAME = 'ai-powered-solutions-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/assets/ai-dashboard.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(response => response || fetch(evt.request))
  );
});
