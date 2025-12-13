import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider, queryClient, ReactQueryDevtools } from "@/shared/lib/react-query"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
