import { type FC } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"
import { useTags } from "@/features/tags/model/useTags"

const SearchFilter: FC = () => {
  const {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setSkip,
  } = useSearchFilter()

  const { tags } = useTags()

  const handleSearch = () => {
    setSkip(0)
  }

  return (
    <div className="flex gap-4">
      {/* 검색창 */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      {/* 태그 선택 */}
      <Select value={selectedTag || "all"} onValueChange={setSelectedTag}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.slug} value={tag.slug}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 정렬 기준 */}
      <Select value={sortBy || "none"} onValueChange={setSortBy}>
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

      {/* 정렬 순서 */}
      <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
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

export default SearchFilter
