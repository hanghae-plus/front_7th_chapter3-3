/**
 * Post Filter Feature API
 *
 * 게시물 필터링 기능에 특화된 API 호출
 * @see mockdowns/PLANS/feature-api-separation-plan.md - Feature API 분리 계획 참고
 */

import type { PostsResponse, TagsResponse } from "../../../entities/post/model/types"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 태그별 게시물 조회
 */
export async function fetchPostsByTag(tag: string): Promise<PostsResponse> {
  try {
    const response = await fetch(getApiUrl(`/posts/tag/${encodeURIComponent(tag)}`))

    if (!response.ok) {
      throw new Error(`태그별 게시물 조회 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("태그별 게시물 조회 오류:", error)
    throw error
  }
}

/**
 * 태그 목록 조회
 */
export async function fetchTags(): Promise<TagsResponse> {
  try {
    const response = await fetch(getApiUrl("/posts/tags"))

    if (!response.ok) {
      throw new Error(`태그 목록 조회 실패: ${response.statusText}`)
    }

    const data = await response.json()

    // API 응답이 배열인 경우 {tags: string[]} 형식으로 변환
    if (Array.isArray(data)) {
      // 객체 배열인 경우 name 또는 slug를 추출
      return {
        tags: data.map(
          (tag: { name?: string; slug?: string; [key: string]: unknown }) => tag.name || tag.slug || String(tag),
        ),
      }
    }

    // 이미 {tags: string[]} 형식인 경우 그대로 반환
    return data
  } catch (error) {
    console.error("태그 목록 조회 오류:", error)
    throw error
  }
}
