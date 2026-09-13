// Service Worker para AutoFind Lab PWA (Optimizado para GitHub Pages y Localhost)
const CACHE_NAME = 'autofind-v1.8.0-fix-events';

// Recursos relativos al scope del Service Worker
const RELATIVE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/data.js',
  './js/specs-catalog.js',
  './js/finder.js',
  './js/schematics.js',
  './js/app.js',
  './models/combustion_xray.glb',
  './models/electric_xray.glb',
  './models/moto_xray.glb',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: Precaché de recursos del App Shell resolviendo URLs relativas al scope
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precargando App Shell para scope:', self.registration.scope);
        // Resolver cada recurso relativo a self.location (funciona tanto en / como en /Proyecto_Vehiculos/)
        const urlsToCache = RELATIVE_ASSETS.map((asset) => new URL(asset, self.location).href);
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] Error al precachear recursos:', err);
      })
  );
});

// Activación: Limpieza de cachés anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Eliminando versión de caché anterior:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First para modelos 3D (.glb) y Stale-While-Revalidate para el resto
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Mismo origen (Localhost o dominio de GitHub Pages)
  if (url.origin === location.origin) {
    // Modelos 3D (.glb): Network-First para garantizar modelos actualizados sin problemas de caché
    if (url.pathname.endsWith('.glb')) {
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Actualización de fondo
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
              }
            })
            .catch(() => {
              // Silencio cuando está offline
            });
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // Si es navegación HTML y no hay red, servir index.html relativo al scope
            if (event.request.headers.get('accept')?.includes('text/html')) {
              const fallbackUrl = new URL('./index.html', self.location).href;
              return caches.match(fallbackUrl);
            }
          });
      })
    );
  } else {
    // CDNs externos (ej. Tailwind CSS)
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return res;
        }).catch(() => {});
      })
    );
  }
});
