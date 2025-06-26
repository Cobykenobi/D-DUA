import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        // Use Vite's default chunking strategy
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     if (id.includes('i18next') || id.includes('react-i18next')) {
        //       return 'i18n';
        //     }
        //     if (id.includes('react') || id.includes('react-dom')) {
        //       return 'react';
        //     }
        //     return 'vendor';
        //   }
        // },
      },
    },
  },
});
