/**
 * Comment Delete Feature Hook
 *
 * 댓글 삭제 기능을 위한 커스텀 훅
 */

import { useCommentStore } from "../../../entities/comment/model"

/**
 * 댓글 삭제 훅
 */
export function useCommentDelete() {
  const { deleteComment } = useCommentStore()

  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteComment(id, postId)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  }

  return {
    handleDeleteComment,
  }
}
