import { defineConfig } from 'vite';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  appType: 'mpa',
  base: './',
  server: {
    port: 8322,
    strictPort: true,
  },
  preview: {
    port: 8323,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    // increase chunck size for DuckDB (~760 kB) & 3.js (~656 kB)
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: {
        index: 'index.html',
        match: 'match/index.html',
      },
    },
  },
  plugins: [{
    // The DuckDB worker is copied verbatim by its `?url` import, footer
    // included: `//# sourceMappingURL=duckdb-browser-eh.worker.js.map`.
    // Vite does not copy the map that footer points at, so any open
    // devtools 404s it on every DuckDB boot. Ship the map next to the
    // worker asset; costs ~1 MB in dist, fetched only when devtools asks.
    name: 'copy-duckdb-worker-map',
    closeBundle() {
      try {
        copyFileSync(
          resolve('node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js.map'),
          resolve('dist/assets/duckdb-browser-eh.worker.js.map'));
      } catch { /* map missing upstream — the devtools 404 returns, nothing worse */ }
    },
  }],
});
