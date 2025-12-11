import { BrowserRouter as Router } from "react-router-dom"
import Header from "../../widgets/Header/ui/index.tsx"
import Footer from "../../widgets/Footer/ui/index.tsx"
import PostsManagerPage from "../../pages/posts-manager/ui/Page.tsx"
import { DashboardPage } from "@/pages/dashboard/ui/DashboardPage.tsx"
import { SettingsPage } from "@/pages/settings/ui/SettingsPage.tsx"
import { Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Routes로 감싸서 URL에 따라 다른 컴포넌트를 보여줍니다 */}
          <Routes>
            {/* 1. 메인 접속 시 게시글페이지로 자동 이동 */}
            <Route path="/" element={<Navigate to="/posts" replace />} />

            {/* 2. 대시보드 페이지 */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* 3. 게시글 관리 페이지 */}
            <Route path="/posts" element={<PostsManagerPage />} />

            {/* 4. 설정 페이지 */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
