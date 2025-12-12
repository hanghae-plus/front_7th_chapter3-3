import { BrowserRouter as Router } from "react-router-dom"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { QueryProvider } from "@/app/providers/QueryProvider"

const App = () => {
  return (
    <QueryProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryProvider>
  )
}

export default App
