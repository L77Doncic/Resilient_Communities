import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const rootDir = fileURLToPath(new URL('.', import.meta.url));
  const officeStaticRoot = path.resolve(rootDir, 'src/office-workers-static');

  const mime = (p: string) => {
    const ext = path.extname(p).toLowerCase();
    switch (ext) {
      case '.html':
        return 'text/html; charset=utf-8';
      case '.css':
        return 'text/css; charset=utf-8';
      case '.js':
        return 'text/javascript; charset=utf-8';
      case '.svg':
        return 'image/svg+xml';
      case '.webp':
        return 'image/webp';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  };

  const officeWorkersStaticPlugin = () => ({
    name: 'office-workers-static',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || '';
        const pathname = url.split('?')[0];
        if (!pathname) return next();

        // Serve /common/* and /office-workers/index.html from src
        if (
          pathname.startsWith('/common/') ||
          pathname === '/office-workers/index.html'
        ) {
          const rel = pathname.replace(/^\//, '');
          const filePath = path.resolve(officeStaticRoot, rel);

          if (!filePath.startsWith(officeStaticRoot)) return next();
          if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return next();

          res.statusCode = 200;
          res.setHeader('Content-Type', mime(filePath));
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        return next();
      });
    },
    async writeBundle() {
      // Copy static files into dist for production build.
      const outDir = path.resolve(rootDir, 'dist');
      const copyPairs: Array<{from: string; to: string}> = [
        {from: path.resolve(officeStaticRoot, 'common'), to: path.resolve(outDir, 'common')},
        {from: path.resolve(officeStaticRoot, 'office-workers'), to: path.resolve(outDir, 'office-workers')},
      ];

      for (const {from, to} of copyPairs) {
        await fsp.mkdir(to, {recursive: true});
        // Node 20+ supports fs.cp
        // @ts-ignore
        await fsp.cp(from, to, {recursive: true, force: true});
      }
    },
  });
  return {
    plugins: [react(), tailwindcss(), officeWorkersStaticPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(rootDir),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
