import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { Input } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'
import { postKeys } from '../../../shared/lib'

/**
 * 게시물 검색 입력 컴포넌트
 * 검색어 입력과 검색 실행을 처리합니다.
 */
export const PostSearchInput = () => {
  const { searchQuery, setSearchQuery, syncURL } = usePostFilters()
  const queryClient = useQueryClient()
  // 로컬 상태로 입력값 관리 (URL과 분리)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '')

  // URL의 searchQuery가 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setLocalSearchQuery(searchQuery || '')
  }, [searchQuery])

  const handleSearch = () => {
    // 검색어를 필터 상태에 반영하고 URL 동기화
    setSearchQuery(localSearchQuery)
    // 최신 검색어를 직접 전달하여 URL 동기화
    syncURL({ search: localSearchQuery.trim() || null })
    
    // 검색어가 변경되면 관련 쿼리 무효화하여 새로고침
    if (localSearchQuery.trim()) {
      // 검색 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.search(localSearchQuery.trim()) })
    } else {
      // 검색어가 비어있으면 일반 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.all() })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
