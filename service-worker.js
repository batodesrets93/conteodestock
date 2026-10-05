const CACHE_NAME = 'inventario-cache-v45';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './config.js',
  './products.js',
  './manifest.json',
  './xlsx.full.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './loc-bcn1.jpg',
  './loc-bcn2.jpg',
  './loc-madrid.jpg',
  './loc-malaga1.jpg',
  './loc-fabrica.jpg',
  './loc-valencia.jpg',
];

// Archivos que cambian cuando subís una actualización: siempre se piden
// primero a internet (así nadie queda con una versión vieja) y solo si no
// hay conexión se usa la copia guardada en el celular.
const NETWORK_FIRST = /\/(|index\.html|app\.js|config\.js|products\.js|style\.css|manifest\.json)$/;

self.addEventListener('install', (event) => {
  // cache: 'reload' evita que el caché del navegador / de GitHub devuelva
  // una copia vieja de los archivos al instalar la versión nueva.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(FILES_TO_CACHE.map((url) => new Request(url, { cache: 'reload' })))
    )
  );
  // La versión nueva se activa sola, sin esperar a que alguien toque
  // "Actualizar". El conteo en curso no se pierde: se guarda en el celular
  // con cada cambio.
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // fuentes de Google, etc.

  const isAppFile = event.request.mode === 'navigate' || NETWORK_FIRST.test(url.pathname);

  if (isAppFile) {
    // Primero internet (revalidando, sin usar copias viejas del navegador),
    // y si falla (sin conexión), lo que haya guardado.
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request, { ignoreSearch: true })
            .then((cached) => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // Imágenes, íconos y la librería de Excel: casi nunca cambian, se usa la
  // copia guardada (más rápido) y si no está, se baja de internet.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
