/**
 * Post 엔티티 API 함수
 *
 * 기본 CRUD 작업을 담당하는 API 함수들
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

import type { PostResponse, PostsResponse, CreatePostDto, UpdatePostDto, FetchPostsParams } from "../model/types"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 게시물 목록 조회
 */
export async function fetchPosts(params?: FetchPostsParams): Promise<PostsResponse> {
  try {
    const limit = params?.limit ?? 10
    const skip = params?.skip ?? 0
    const sortBy = params?.sortBy
    const sortOrder = params?.sortOrder

    let url = getApiUrl(`/posts?limit=${limit}&skip=${skip}`)

    // 정렬 파라미터 추가
    if (sortBy) {
      url += `&sortBy=${sortBy}`
      if (sortOrder) {
        url += `&order=${sortOrder}`
      }
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`게시물 조회 실패: ${response.statusText}`)
    }

    const data = await response.json()

    // API가 정렬을 지원하지 않는 경우 클라이언트 사이드 정렬
    if (sortBy && data.posts) {
      data.posts = sortPosts(data.posts, sortBy, sortOrder || "asc")
    }

    return data
  } catch (error) {
    console.error("게시물 조회 오류:", error)
    throw error
  }
}

/**
 * 클라이언트 사이드 게시물 정렬
 */
function sortPosts(posts: PostResponse[], sortBy: string, sortOrder: "asc" | "desc"): PostResponse[] {
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
 * 게시물 상세 조회
 */
export async function fetchPostById(id: number): Promise<PostResponse> {
  try {
    const response = await fetch(getApiUrl(`/posts/${id}`))

    if (!response.ok) {
      throw new Error(`게시물 조회 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("게시물 조회 오류:", error)
    throw error
  }
}

/**
 * 게시물 추가
 */
export async function addPost(post: CreatePostDto): Promise<PostResponse> {
  try {
    const response = await fetch(getApiUrl("/posts/add"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })

    if (!response.ok) {
      throw new Error(`게시물 추가 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("게시물 추가 오류:", error)
    throw error
  }
}

/**
 * 게시물 수정
 */
export async function updatePost(id: number, post: UpdatePostDto): Promise<PostResponse> {
  try {
    const response = await fetch(getApiUrl(`/posts/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })

    if (!response.ok) {
      throw new Error(`게시물 수정 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("게시물 수정 오류:", error)
    throw error
  }
}

/**
 * 게시물 삭제
 */
export async function deletePost(id: number): Promise<void> {
  try {
    const response = await fetch(getApiUrl(`/posts/${id}`), {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`게시물 삭제 실패: ${response.statusText}`)
    }
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    throw error
  }
}
