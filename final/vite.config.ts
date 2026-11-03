import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    // mapbox-gl is ~1.4 MB minified; keep it in its own chunk so app changes don't bust its cache.
    chunkSizeWarningLimit: 1500,
    rollupOptions: { output: { manualChunks: { mapbox: ['mapbox-gl'] } } },
  },
});
