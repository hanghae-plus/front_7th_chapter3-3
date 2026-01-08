/**
 * Comment Create Feature Hook
 *
 * 댓글 생성 기능을 위한 커스텀 훅
 */

import { useCommentStore } from "../../../entities/comment/model"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 댓글 생성 훅
 */
export function useCommentCreate() {
  const { addComment, newComment, setNewComment } = useCommentStore()
  const { setShowAddCommentDialog, showAddCommentDialog } = useUIStore()

  const handleCreate = async () => {
    if (!newComment.body.trim() || !newComment.postId) {
      return
    }

    try {
      await addComment({
        body: newComment.body,
        postId: newComment.postId,
        userId: newComment.userId,
      })
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 생성 오류:", error)
      throw error
    }
  }

  const openAddCommentDialog = (postId: number) => {
    setNewComment({ body: "", postId, userId: 1 })
    setShowAddCommentDialog(true)
  }

  return {
    newComment,
    setNewComment,
    showAddCommentDialog,
    openAddCommentDialog,
    handleCreate,
  }
}
