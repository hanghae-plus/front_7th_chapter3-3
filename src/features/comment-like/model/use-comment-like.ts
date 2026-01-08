/**
 * Comment Like Feature Hook
 *
 * 댓글 좋아요 기능을 위한 커스텀 훅
 */

import { useCommentStore } from "../../../entities/comment/model"
import { likeComment as likeCommentAPI } from "../api/comment-like-api"

/**
 * 댓글 좋아요 훅
 */
export function useCommentLike() {
  const { comments } = useCommentStore()

  const handleLike = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id)
      if (!comment) return

      await likeCommentAPI(id, comment.likes)

      // Store 업데이트는 API 호출 후 자동으로 처리됨
      // 필요 시 Store에 액션 추가 가능
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    }
  }

  return {
    handleLike,
  }
}
