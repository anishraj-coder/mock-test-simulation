import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Dynamic endpoint to list test files in sample_test_accenture
  if (reqPath === '/api/tests') {
    const testDir = path.join(__dirname, 'sample_test_accenture');
    fs.readdir(testDir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'manifest.json');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(JSON.stringify(jsonFiles));
    });
    return;
  }

  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const fullPath = path.join(__dirname, reqPath);

  // Security check: ensure path is within directory
  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(fullPath).pipe(res);
  });
});

let port = parseInt(process.env.PORT, 10) || 3000;

function startServer(p) {
  server.listen(p, () => {
    console.log(`\n🚀 Mock Exam Simulator running at: http://localhost:${p}\nPress Ctrl+C to stop.`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${p} is in use, trying port ${p + 1}...`);
      startServer(p + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(port);
