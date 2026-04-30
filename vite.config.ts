import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'PageOS-M';
const base = process.env.PAGEOS_BASE ?? (process.env.GITHUB_ACTIONS ? `/${repository}/` : '/');

export default defineConfig({
  root: resolve(__dirname, 'shell'),
  base,
  publicDir: resolve(__dirname, 'shell/public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
