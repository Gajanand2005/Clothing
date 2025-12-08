import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-icons']
  },
  build: {
     chunkSizeWarningLimit: 1600,
    rollupOptions: {
      external: [],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor_react';
            if (id.includes('react-dom')) return 'vendor_react_dom';
            if (id.includes('@mui') || id.includes('@mui/material') || id.includes('@mui/icons-material')) return 'vendor_mui';
            if (id.includes('swiper')) return 'vendor_swiper';
            if (id.includes('react-icons')) return 'vendor_icons';
            if (id.includes('axios')) return 'vendor_axios';
            // fallback for other node_modules
            return 'vendor_misc';
          }
        },
      },
    },
  },
})


