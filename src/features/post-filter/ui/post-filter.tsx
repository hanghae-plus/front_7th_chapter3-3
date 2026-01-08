/**
 * Post Filter Feature UI
 *
 * 게시물 필터링 컴포넌트
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilter } from "../model/use-post-filter"
import { usePostStore } from "../../../entities/post/model"
import { useEffect } from "react"

interface PostFilterProps {
  className?: string
}

/**
 * 게시물 필터 컴포넌트
 */
export function PostFilter({ className }: PostFilterProps) {
  const { selectedTag, tags, loadTags, handleFilterByTag } = usePostFilter()
  const { sortBy, setSortBy, sortOrder, setSortOrder, fetchPosts } = usePostStore()

  useEffect(() => {
    loadTags()
  }, [loadTags])

  useEffect(() => {
    fetchPosts()
  }, [sortBy, sortOrder, fetchPosts])

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-")
    setSortBy(newSortBy)
    setSortOrder(newSortOrder as "asc" | "desc")
  }

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <Select value={selectedTag} onValueChange={handleFilterByTag}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {(tags || []).map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy ? `${sortBy}-${sortOrder}` : "id-desc"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id-desc">최신순</SelectItem>
          <SelectItem value="title-asc">제목 오름차순</SelectItem>
          <SelectItem value="title-desc">제목 내림차순</SelectItem>
          <SelectItem value="reactions.likes-desc">좋아요순</SelectItem>
          <SelectItem value="views-desc">조회수순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
