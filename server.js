// Servidor HTTP Estático Nativo para AutoMeca Lab PWA
// Compatible con Node.js y agy-node sin dependencias externas.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Limpiar URL y parámetros de consulta
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Redirigir raíz a index.html
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Prevenir Directory Traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  // Comprobar si el archivo existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Recurso no encontrado en AutoMeca Lab');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Encabezados HTTP especiales
    const headers = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    };

    // Si es el Service Worker o el Manifest, evitar caché agresiva para permitir actualizaciones inmediatas
    if (pathname === '/sw.js') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Service-Worker-Allowed'] = '/';
    } else if (pathname === '/manifest.json') {
      headers['Cache-Control'] = 'no-cache';
    }

    res.writeHead(200, headers);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', (streamErr) => {
      console.error('[Error de lectura de archivo]', streamErr);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 - Error interno al leer el archivo');
      }
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`=======================================================`);
  console.log(`🚀 AutoMeca Lab Servidor PWA en ejecución`);
  console.log(`📡 URL Local: http://localhost:${PORT}`);
  console.log(`📱 Soporte PWA, Service Worker y Modo Offline habilitado`);
  console.log(`=======================================================`);
});
