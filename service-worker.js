const CACHE_NAME = 'transport-company-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/vehicles.js',
  '/js/routes.js',
  '/images/hero-bg.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});