import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./app', import.meta.url)));
const position = process.argv.indexOf('--port');
const candidate = position >= 0 ? Number(process.argv[position + 1]) : 8080;
const port = Number.isInteger(candidate) && candidate > 0 && candidate < 65536 ? candidate : 8080;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
};

createServer((request, response) => {
  let pathname = '/';
  try { pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Invalid URL'); return; }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const target = resolve(join(root, pathname.replace(/^\/+/, '')));
  if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403).end('Forbidden'); return; }
  try {
    const size = statSync(target).size;
    response.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream', 'content-length': size, 'cache-control': 'no-store' });
    createReadStream(target).pipe(response);
  } catch { response.writeHead(404).end('Not found'); }
}).listen(port, '127.0.0.1', () => process.stdout.write(`Rupiah Rapi serves on http://localhost:${port}\n`));
