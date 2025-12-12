import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components"
import { SearchInput } from "./SearchInput"

interface PostSearchFilterBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSearch: () => void
  selectedTag: string
  onTagChange: (value: string) => void
  tags: any[]
  sortBy: string
  onSortByChange: (value: string) => void
  sortOrder: string
  onSortOrderChange: (value: string) => void
}

export function PostSearchFilterBar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  selectedTag,
  onTagChange,
  tags,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: PostSearchFilterBarProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
      </div>
      <Select value={selectedTag} onValueChange={onTagChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag: any) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortByChange}>
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
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
