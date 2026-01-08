/**
 * Comment Like Feature API
 *
 * 댓글 좋아요 기능에 특화된 API 호출
 * @see mockdowns/PLANS/feature-api-separation-plan.md - Feature API 분리 계획 참고
 */

import type { CommentResponse } from "../../../entities/comment/model"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 댓글 좋아요
 */
export async function likeComment(id: number, currentLikes: number): Promise<CommentResponse> {
  try {
    const response = await fetch(getApiUrl(`/comments/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })

    if (!response.ok) {
      throw new Error(`댓글 좋아요 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    throw error
  }
}
