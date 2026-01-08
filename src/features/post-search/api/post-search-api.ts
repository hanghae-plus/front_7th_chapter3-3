/**
 * Post Search Feature API
 *
 * 게시물 검색 기능에 특화된 API 호출
 * @see mockdowns/PLANS/feature-api-separation-plan.md - Feature API 분리 계획 참고
 */

import type { PostsResponse } from "../../../entities/post/model/types"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 게시물 검색
 */
export async function searchPosts(query: string): Promise<PostsResponse> {
  try {
    const response = await fetch(getApiUrl(`/posts/search?q=${encodeURIComponent(query)}`))

    if (!response.ok) {
      throw new Error(`게시물 검색 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("게시물 검색 오류:", error)
    throw error
  }
}
