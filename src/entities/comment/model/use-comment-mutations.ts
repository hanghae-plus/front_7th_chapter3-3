import { addComment, AddCommentParams } from "../api/add-comment"
import { updateComment } from "../api/update-comment"
import { deleteComment } from "../api/delete-comment"
import { likeComment } from "../api/like-comment"

interface UseCommentMutationsOptions {
  onSuccess?: () => void
}

export const useCommentMutations = (options?: UseCommentMutationsOptions) => {
  const { onSuccess } = options || {}

  const createComment = async (params: AddCommentParams, callbacks?: { onSuccess?: () => void }) => {
    try {
      const result = await addComment(params)
      callbacks?.onSuccess?.()
      onSuccess?.()
      return result
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    }
  }

  const modifyComment = async (id: number, body: string, callbacks?: { onSuccess?: () => void }) => {
    try {
      const result = await updateComment(id, body)
      callbacks?.onSuccess?.()
      onSuccess?.()
      return result
    } catch (error) {
      console.error("댓글 수정 오류:", error)
      throw error
    }
  }

  const removeComment = async (id: number, callbacks?: { onSuccess?: () => void }) => {
    try {
      await deleteComment(id)
      callbacks?.onSuccess?.()
      onSuccess?.()
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  }

  const likeCommentMutation = async (id: number, callbacks?: { onSuccess?: () => void }) => {
    try {
      const result = await likeComment(id)
      callbacks?.onSuccess?.()
      onSuccess?.()
      return result
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    }
  }

  return {
    createComment,
    modifyComment,
    removeComment,
    likeCommentMutation,
  }
}
