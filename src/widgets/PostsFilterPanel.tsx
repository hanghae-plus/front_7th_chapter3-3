import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { SearchBar } from "@/features/post/search-posts"
import { TagFilter } from "@/features/tag/filter-by-tag"
import { SortControls } from "@/features/post/sort-posts"
import { tagQueries } from "@/entities/tag"

export const PostsFilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL에서 직접 파라미터 읽기
  const searchQuery = searchParams.get("search") || ""
  const selectedTag = searchParams.get("tag") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || ""

  // 위젯 자체적으로 tags 데이터 조회
  const { data: tags = [] } = useQuery(tagQueries.list())

  // URL 업데이트 함수
  const updateSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  const handleSearch = (query: string) => {
    updateSearchParams({
      search: query,
      skip: 0,
      tag: "",
    })
  }

  const handleTagChange = (tag: string) => {
    // "모든 태그" 선택 시 URL에서 tag 파라미터 제거
    updateSearchParams({
      tag: tag === "all" ? "" : tag,
      skip: 0,
      search: "",
    })
  }

  const handleSortByChange = (value: string) => {
    // "없음" 선택 시 URL에서 sortBy 파라미터 제거
    updateSearchParams({ sortBy: value === "none" ? "" : value })
  }

  const handleSortOrderChange = (value: string) => {
    // sortBy가 없으면 기본값 'id' 자동 설정
    if (!sortBy) {
      updateSearchParams({ sortBy: "id", sortOrder: value })
    } else {
      updateSearchParams({ sortOrder: value })
    }
  }

  return (
    <div className="flex gap-4">
      <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
      <TagFilter tags={tags} selectedTag={selectedTag} onTagChange={handleTagChange} />
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
      />
    </div>
  )
}
