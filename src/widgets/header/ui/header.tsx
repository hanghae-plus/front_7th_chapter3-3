/**
 * Header Widget UI
 * 
 * 헤더 위젯 컴포넌트
 * 여러 페이지에서 재사용되는 헤더 UI 블록
 */

import { MessageSquare } from "lucide-react"

/**
 * 헤더 위젯
 */
export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6" />
          <h1 className="text-xl font-bold">게시물 관리 시스템</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">홈</a></li>
            <li><a href="#" className="hover:underline">대시보드</a></li>
            <li><a href="#" className="hover:underline">설정</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
