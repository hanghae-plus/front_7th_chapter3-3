import { useQueryClient } from "@tanstack/react-query"
import type { SortBy, SortOrder } from '../model/usePostSort'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'
import { postKeys } from '../../../shared/lib'

/**
 * 게시물 정렬 컨트롤 컴포넌트
 * 정렬 기준과 정렬 순서를 선택합니다.
 */
export const PostSortControls = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder, syncURL } = usePostFilters()
  const queryClient = useQueryClient()

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value)
    syncURL() // URL 동기화
    // 정렬 변경 시 관련 쿼리 무효화하여 새로고침
    queryClient.invalidateQueries({ queryKey: postKeys.all() })
  }

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value)
    syncURL() // URL 동기화
    // 정렬 변경 시 관련 쿼리 무효화하여 새로고침
    queryClient.invalidateQueries({ queryKey: postKeys.all() })
  }

  return (
    <>
      <Select value={sortBy} onValueChange={handleSortByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={handleSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

