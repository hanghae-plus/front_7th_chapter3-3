/**
 * Post Search Feature Hook
 *
 * 게시물 검색 기능을 위한 커스텀 훅
 */

import { usePostStore } from "../../../entities/post/model"
import { searchPosts } from "../api/post-search-api"

/**
 * 게시물 검색 훅
 */
export function usePostSearch() {
  const { setSearchQuery, searchQuery, setPosts, setTotal, setLoading, setError } = usePostStore()

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return
    }

    setSearchQuery(query)
    setLoading(true)
    setError(null)

    try {
      const response = await searchPosts(query)
      setPosts(response.posts)
      setTotal(response.total)
    } catch (error) {
      setError(error instanceof Error ? error.message : "게시물 검색 실패")
    } finally {
      setLoading(false)
    }
  }

  return {
    searchQuery,
    handleSearch,
  }
}
