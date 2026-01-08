/**
 * Post Filter Feature Hook
 *
 * 게시물 필터링 기능을 위한 커스텀 훅
 */

import { usePostStore, type Post } from "../../../entities/post/model"
import { fetchPostsByTag, fetchTags } from "../api/post-filter-api"
import { fetchUsers } from "../../../entities/user/api"
import type { User } from "../../../entities/user/model"

/**
 * 클라이언트 사이드 게시물 정렬 (태그 필터링 시 사용)
 */
function sortPosts(posts: Post[], sortBy: string, sortOrder: "asc" | "desc"): Post[] {
  const sorted = [...posts].sort((a, b) => {
    let aValue: unknown
    let bValue: unknown

    // 중첩된 필드 처리 (예: reactions.likes)
    if (sortBy.includes(".")) {
      const [parent, child] = sortBy.split(".")
      const aObj = a as unknown as Record<string, unknown>
      const bObj = b as unknown as Record<string, unknown>
      aValue = aObj[parent] ? (aObj[parent] as Record<string, unknown>)?.[child] : undefined
      bValue = bObj[parent] ? (bObj[parent] as Record<string, unknown>)?.[child] : undefined
    } else {
      const aObj = a as unknown as Record<string, unknown>
      const bObj = b as unknown as Record<string, unknown>
      aValue = aObj[sortBy]
      bValue = bObj[sortBy]
    }

    // 숫자 비교
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    // 문자열 비교
    const aStr = String(aValue || "").toLowerCase()
    const bStr = String(bValue || "").toLowerCase()

    if (sortOrder === "asc") {
      return aStr.localeCompare(bStr)
    } else {
      return bStr.localeCompare(aStr)
    }
  })

  return sorted
}

/**
 * 게시물 필터링 훅
 */
export function usePostFilter() {
  const { selectedTag, tags, setSelectedTag, setTags, setPosts, setTotal, setLoading, setError } = usePostStore()

  // 태그 목록 조회
  const loadTags = async () => {
    try {
      const response = await fetchTags()
      setTags(response.tags)
    } catch (error) {
      setError(error instanceof Error ? error.message : "태그 목록 조회 실패")
    }
  }

  // 태그별 게시물 조회
  const handleFilterByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      setSelectedTag("all") // "all"로 설정하여 "모든 태그" 표시 유지
      // 전체 게시물 다시 불러오기
      const { fetchPosts } = usePostStore.getState()
      await fetchPosts()
      return
    }

    setSelectedTag(tag)
    setLoading(true)
    setError(null)

    try {
      // 태그별 게시물 조회
      const [postsResponse, usersResponse] = await Promise.all([
        fetchPostsByTag(tag),
        fetchUsers({ limit: 0, select: "username,image" }),
      ])

      // 게시물과 사용자 정보 결합
      let postsWithUsers: Post[] = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse.users.find((user: User) => user.id === post.userId),
      }))

      // 정렬 적용 (태그 필터링 시에도 정렬 유지)
      const { sortBy, sortOrder } = usePostStore.getState()
      if (sortBy) {
        postsWithUsers = sortPosts(postsWithUsers, sortBy, sortOrder || "asc")
      }

      setPosts(postsWithUsers)
      setTotal(postsResponse.total)
    } catch (error) {
      setError(error instanceof Error ? error.message : "태그별 게시물 조회 실패")
    } finally {
      setLoading(false)
    }
  }

  return {
    selectedTag,
    tags,
    loadTags,
    handleFilterByTag,
  }
}
