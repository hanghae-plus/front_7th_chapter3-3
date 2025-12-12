import PostsManagerPage from "../pages/posts-manager"
import { queryClient } from "../shared/api/query-client"
import { Footer, Header, ToastContainer } from "../shared/ui"
import { ErrorBoundary } from "./ErrorBoundary"
import Providers from "./providers"
import Router from "./routes"
import "./styles/index.css"

const App = () => {
  return (
    <ErrorBoundary>
      <Providers client={queryClient}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </Router>
      </Providers>
    </ErrorBoundary>
  )
}

export default App
