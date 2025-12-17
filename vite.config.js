// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind ve Autoprefixer'ı import edin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})