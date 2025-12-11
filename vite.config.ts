import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path" // 👈 1. path 모듈 불러오기 (필수!)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/front_7th_chapter3-3/",
  // 👇 2. 여기가 핵심입니다! (@ 기호를 src 폴더로 연결)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
