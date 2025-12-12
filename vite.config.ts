import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

const base: string = process.env.NODE_ENV === "production" ? "/front_7th_chapter3-2/" : ""

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/app": path.resolve(__dirname, "./src/app"),
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
