/* Estúdio Avatar: service worker mínimo, só para o app poder ser instalado e aparecer no Compartilhar. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => { e.respondWith(fetch(e.request)); });
