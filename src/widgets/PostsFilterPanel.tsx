import { useQuery } from "@tanstack/react-query"
import { SearchBar } from "@/features/search-posts"
import { TagFilter } from "@/features/filter-by-tag"
import { SortControls } from "@/features/sort-posts"
import { tagQueries } from "@/entities/tag"

interface PostsFilterPanelProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  onSearch: (query: string) => void
  onTagChange: (tag: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export const PostsFilterPanel = ({
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
}: PostsFilterPanelProps) => {
  // 위젯 자체적으로 tags 데이터 조회 (props drilling 제거)
  const { data: tags = [] } = useQuery(tagQueries.list())
  return (
    <div className="flex gap-4">
      <SearchBar initialValue={searchQuery} onSearch={onSearch} />
      <TagFilter tags={tags} selectedTag={selectedTag} onTagChange={onTagChange} />
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />
    </div>
  )
}
