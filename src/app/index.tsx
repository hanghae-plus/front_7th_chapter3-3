import { BrowserRouter as Router } from "react-router-dom"
import Header from "./layouts/Header.tsx"
import Footer from "./layouts/Footer.tsx"
import { PostsManagerPage } from "@/pages"
import QueryProvider from "./providers/QueryProvider"

const App = () => {
  return (
    <Router>
      <QueryProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </QueryProvider>
    </Router>
  )
}

export default App
