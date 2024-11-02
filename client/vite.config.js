import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configure your proxy settings here
      '/api': {
        target: 'http://localhost:5000', // Change this to your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite path
      },
    },
  },
});
