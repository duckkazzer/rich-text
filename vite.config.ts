import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'konva-vendor': ['konva', 'react-konva', 'react-konva-utils'],
          'html2canvas-vendor': ['html2canvas'],
          'react-quill-vendor': ['react-quill']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Увеличьте лимит до 1000 kB или другого значения
  }
});