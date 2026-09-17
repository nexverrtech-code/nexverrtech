import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Keep the vendor libraries in stable, separately cached chunks so a
        // content update never invalidates the whole bundle on the CDN.
        //
        // Matched by module path rather than by package name: framer-motion
        // reaches `react/jsx-runtime` through CommonJS interop, which rollup
        // sees as a proxy module the name-based form never matched. The runtime
        // therefore ended up inside the animation chunk, which made a 39 kB
        // dependency a hard requirement of every page on the site.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          const path = id.replace(/\\/g, '/');

          if (
            /\/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(
              path,
            ) ||
            path.includes('react/jsx-runtime') ||
            path.includes('react/jsx-dev-runtime')
          ) {
            return 'react';
          }

          if (/framer-motion|motion-dom|motion-utils|popmotion|style-value-types/.test(path)) {
            return 'motion';
          }

          if (/react-hook-form|@hookform|\/zod\//.test(path)) {
            return 'forms';
          }

          return undefined;
        },
      },
    },
  },
});
