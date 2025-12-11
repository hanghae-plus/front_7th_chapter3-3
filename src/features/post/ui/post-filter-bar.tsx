import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import type { Tag } from "@/entities/tag"

interface PostFilterBarProps {
  selectedTag: string
  tags: (Tag | string)[]
  sortBy: string
  sortOrder: string
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (sortOrder: string) => void
}

/**
 * 게시물 필터 컴포넌트
 * 태그, 정렬 기준, 정렬 순서를 제어합니다.
 */
export const PostFilterBar = ({
  selectedTag,
  tags,
  sortBy,
  sortOrder,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
}: PostFilterBarProps) => {
  return (
    <>
      {/* 태그 선택 */}
      <Select value={selectedTag} onValueChange={onTagChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택">{selectedTag === "all" ? "모든 태그" : selectedTag}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => {
            const tagName = typeof tag === "string" ? tag : tag.name
            return (
              <SelectItem key={tagName} value={tagName}>
                {tagName}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      {/* 정렬 기준 */}
      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준">
            {sortBy === "none"
              ? "없음"
              : sortBy === "id"
                ? "ID"
                : sortBy === "title"
                  ? "제목"
                  : sortBy === "reactions"
                    ? "반응"
                    : "정렬 기준"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      {/* 정렬 순서 */}
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서">
            {sortOrder === "asc" ? "오름차순" : sortOrder === "desc" ? "내림차순" : "정렬 순서"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
