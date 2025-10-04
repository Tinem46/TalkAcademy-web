import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: false,               // 👈 Bật HTTPS
    host: 'localhost',         // 👈 Cho phép truy cập từ localhost
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://voice-tranning-be.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
