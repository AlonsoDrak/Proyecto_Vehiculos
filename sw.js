// Service Worker para AutoMeca Lab PWA
const CACHE_NAME = 'automeca-v1.0.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/data.js',
  './js/schematics.js',
  './js/app.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: Precaché de recursos críticos del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precargando App Shell en caché:', CACHE_NAME);
        return cache.addAll(ASSETS_TO_CACHE);
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
            console.log('[SW] Eliminando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Estrategia Stale-While-Revalidate / Cache-First para soporte offline completo
self.addEventListener('fetch', (event) => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // No interceptar peticiones de extensiones o externas que no sean del mismo origen (excepto CDN de Tailwind o fuentes)
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Actualizar en segundo plano si hay red
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {
            // Ignorar fallos de red silenciosamente cuando estamos offline
          });
          return cachedResponse;
        }

        // Si no está en caché, buscar en red y guardar en caché
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
            // Si falla la red y es una navegación HTML, devolver la página principal
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('./index.html');
            }
          });
      })
    );
  } else {
    // Para CDNs (ej. Tailwind CSS o Google Fonts), usar Cache-First con fallback a red
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return res;
        }).catch(() => {
          // Si falla y no está en caché, simplemente no se devuelve nada
        });
      })
    );
  }
});
