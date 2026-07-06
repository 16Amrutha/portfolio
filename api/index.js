import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import serverEntry from '../dist/server/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.join(__dirname, '..', 'dist', 'client');

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.ico':
      return 'image/x-icon';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}

async function tryServeStatic(pathname) {
  if (!pathname || pathname.includes('..')) {
    return null;
  }

  const cleanPath = pathname.replace(/^\/+/, '');
  if (!cleanPath) {
    return null;
  }

  const candidatePath = path.join(clientDir, cleanPath);
  if (!candidatePath.startsWith(clientDir)) {
    return null;
  }

  try {
    const buffer = await readFile(candidatePath);
    return new Response(buffer, {
      status: 200,
      headers: {
        'content-type': getContentType(candidatePath),
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const url = new URL(req.url ?? '/', `https://${req.headers.host ?? 'portfolio.local'}`);
  const pathname = decodeURIComponent(url.pathname);

  const staticResponse = await tryServeStatic(pathname);
  if (staticResponse) {
    const body = Buffer.from(await staticResponse.arrayBuffer());
    res.statusCode = staticResponse.status;
    staticResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.end(body);
    return;
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers ?? {})) {
    if (typeof value === 'string') {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
    }
  }

  const requestInit = {
    method: req.method ?? 'GET',
    headers,
  };

  if (req.method && !['GET', 'HEAD'].includes(req.method)) {
    requestInit.body = req;
  }

  const request = new Request(url.toString(), requestInit);
  const response = await serverEntry.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = Buffer.from(await response.arrayBuffer());
  res.end(body);
}
