import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import PostsManagerPage from "./pages/posts-manager/ui/PostsManagerPage.tsx";
import { PostsUrlQueryProvider } from "./pages/posts-manager/providers/PostsUrlQueryContext.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsUrlQueryProvider>
            <PostsManagerPage />
          </PostsUrlQueryProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
