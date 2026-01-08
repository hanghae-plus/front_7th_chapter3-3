/**
 * Comment Edit Feature Hook
 *
 * 댓글 수정 기능을 위한 커스텀 훅
 */

import { useCommentStore } from "../../../entities/comment/model"
import { useUIStore } from "../../../shared/lib/stores"
import type { Comment } from "../../../entities/comment/model"

/**
 * 댓글 수정 훅
 */
export function useCommentEdit() {
  const { selectedComment, setSelectedComment, updateComment } = useCommentStore()
  const { setShowEditCommentDialog, showEditCommentDialog } = useUIStore()

  const handleUpdate = async () => {
    if (!selectedComment) return

    try {
      await updateComment(selectedComment.id, {
        body: selectedComment.body,
      })
      setShowEditCommentDialog(false)
      setSelectedComment(null)
    } catch (error) {
      console.error("댓글 수정 오류:", error)
      throw error
    }
  }

  const openEditCommentDialog = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return {
    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    openEditCommentDialog,
    handleUpdate,
  }
}
