// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5000,
    strictPort: true,
    allowedHosts: [
      "bf19fe41-1e21-4e1b-8fb5-16a4d2377563-00-z314uyh2tn6s.sisko.replit.dev",
      ".replit.dev",
      "localhost",
    ],
    hmr: {
      clientPort: 5000,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        timeout: 10000,
      },
    },
  },
});