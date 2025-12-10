import { SearchBar } from "@/features/search-posts"
import { TagFilter } from "@/features/filter-by-tag"
import { SortControls } from "@/features/sort-posts"
import { Tag } from "@/entities/tag"

interface PostsFilterPanelProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  tags: Tag[]
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
  tags,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
}: PostsFilterPanelProps) => {
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
