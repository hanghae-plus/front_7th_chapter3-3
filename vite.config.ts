import path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@app", replacement: path.resolve(__dirname, "src/app") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@widgets", replacement: path.resolve(__dirname, "src/widgets") },
      { find: "@features", replacement: path.resolve(__dirname, "src/features") },
      { find: "@entities", replacement: path.resolve(__dirname, "src/entities") },
      { find: "@shared", replacement: path.resolve(__dirname, "src/shared") },
    ],
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
