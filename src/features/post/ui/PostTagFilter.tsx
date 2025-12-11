import { useQueryClient } from "@tanstack/react-query"
import type { Tag } from '../../../entities/post'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'
import { postKeys } from '../../../shared/lib'

interface PostTagFilterProps {
  tags: Tag[]
}

/**
 * 게시물 태그 필터 컴포넌트
 * 태그를 선택하여 게시물을 필터링합니다.
 */
export const PostTagFilter = ({ tags }: PostTagFilterProps) => {
  const { selectedTag, setSelectedTag, syncURL } = usePostFilters()
  const queryClient = useQueryClient()

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    // 최신 태그를 직접 전달하여 URL 동기화
    syncURL({ tag: tag === 'all' ? null : tag })
    
    // 태그가 변경되면 관련 쿼리 무효화하여 새로고침
    if (tag !== 'all') {
      // 태그별 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.byTag(tag) })
    } else {
      // 'all'로 변경되면 일반 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.all() })
    }
  }

  return (
    <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

