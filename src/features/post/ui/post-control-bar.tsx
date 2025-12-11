import { PostSearchBar } from "./post-search-bar"
import { PostFilterBar } from "./post-filter-bar"
import type { Tag } from "@/entities/tag"

interface PostControlBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  selectedTag: string
  tags: (Tag | string)[]
  sortBy: string
  sortOrder: string
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (sortOrder: string) => void
}

/**
 * 게시물 검색 및 필터 컨트롤 바
 * 검색, 태그 필터, 정렬 기능을 제공합니다.
 */
export const PostControlBar = ({
  searchQuery,
  onSearchChange,
  onSearch,
  selectedTag,
  tags,
  sortBy,
  sortOrder,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
}: PostControlBarProps) => {
  return (
    <div className="flex gap-4">
      <PostSearchBar value={searchQuery} onChange={onSearchChange} onSearch={onSearch} />
      <PostFilterBar
        selectedTag={selectedTag}
        tags={tags}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onTagChange={onTagChange}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />
    </div>
  )
}

