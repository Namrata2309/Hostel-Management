import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      '/api': process.env.VITE_BACKEND_URL || 'http://localhost:5000', // Correct way to fallback
    },
  },
});
