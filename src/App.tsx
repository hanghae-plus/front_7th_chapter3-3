import { BrowserRouter as Router } from "react-router-dom"
import { Header, Footer } from "./widgets"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { PostProvider } from "@/features/post"
import { CommentProvider } from "@/features/comment"
import { UserProvider } from "@/features/user"

const App = () => {
  return (
    <Router>
      <PostProvider>
        <CommentProvider>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <PostsManagerPage />
              </main>
              <Footer />
            </div>
          </UserProvider>
        </CommentProvider>
      </PostProvider>
    </Router>
  )
}

export default App
