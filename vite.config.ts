import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

const base = process.env.NODE_ENV === "production" ? "/front_7th_chapter3-3/" : ""

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  base,
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
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
