import { useQuery } from "@tanstack/react-query"
import { SearchBar } from "@/features/post/search-posts"
import { TagFilter } from "@/features/tag/filter-by-tag"
import { SortControls } from "@/features/post/sort-posts"
import { tagQueries } from "@/entities/tag"
import { usePostsParams } from "@/shared/lib/posts-params"

export const PostsFilterPanel = () => {
  const { params, updateParams } = usePostsParams()
  const { search: searchQuery, tag: selectedTag, sortBy, sortOrder } = params

  // 위젯 자체적으로 tags 데이터 조회
  const { data: tags = [] } = useQuery(tagQueries.list())

  const handleSearch = (query: string) => {
    updateParams({
      search: query,
      skip: 0,
      tag: "",
    })
  }

  const handleTagChange = (tag: string) => {
    // "모든 태그" 선택 시 URL에서 tag 파라미터 제거
    updateParams({
      tag: tag === "all" ? "" : tag,
      skip: 0,
      search: "",
    })
  }

  const handleSortByChange = (value: string) => {
    // "없음" 선택 시 URL에서 sortBy 파라미터 제거
    updateParams({ sortBy: value === "none" ? "" : value })
  }

  const handleSortOrderChange = (value: string) => {
    // sortBy가 없으면 기본값 'id' 자동 설정
    if (!sortBy) {
      updateParams({ sortBy: "id", sortOrder: value })
    } else {
      updateParams({ sortOrder: value })
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
