const CACHE_NAME = 'samrat-mitra-mandal-v1';
const ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/images/ganpati-hero.png',
  '/images/mandal/closeup-blessing.jpg',
  '/images/mandal/grand-stage.jpg',
  '/images/mandal/sunflower-darshan.jpg',
  '/images/mandal/festival-video.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
