// vite.config.js

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  publicDir: false,
  build: {
    outDir: 'public/build',
    assetsDir: 'assets',
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
    },
  },
});