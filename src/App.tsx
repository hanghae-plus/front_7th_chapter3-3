import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/shared/lib"
import { OverlayProvider, OverlayContainer } from "@/shared/lib/overlay"
import { Header } from "@/widgets/Header"
import { Footer } from "@/widgets/Footer"
import PostsManagerPage from "@/pages/PostsManagerPage"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </Router>
        <OverlayContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </OverlayProvider>
    </QueryClientProvider>
  )
}

export default App
