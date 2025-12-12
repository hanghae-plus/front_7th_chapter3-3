import usePostParams from "./usePostParams"
import usePostsQuery from "../../../entities/post/model/usePostQuery"
import useSearchPostsQuery from "../../../entities/post/model/useSearchPostsQuery"
import useTagPostsQuery from "../../../entities/post/model/useTagPostsQuery"

const usePostWithParams = () => {
  const { params } = usePostParams()

  // 조건 판별
  const hasSearch = !!params.searchQuery
  const hasTag = !!params.selectedTag && params.selectedTag !== "all"

  // 각 상황에 맞는 query 실행 (enabled로 제어)
  const postsQuery = usePostsQuery({
    params,
    enabled: !hasSearch && !hasTag, // 검색/태그 없을 때만 실행
  })

  // 검색 쿼리
  const searchQuery = useSearchPostsQuery(params, hasSearch)

  // 태그 쿼리
  const tagQuery = useTagPostsQuery(params, hasTag)

  // 활성화된 query 선택
  const activeQuery = hasSearch ? searchQuery : hasTag ? tagQuery : postsQuery

  return {
    data: activeQuery.data || { posts: [], total: 0, skip: 0, limit: 10 },
    isLoading: activeQuery.isLoading,
  }
}

export default usePostWithParams

