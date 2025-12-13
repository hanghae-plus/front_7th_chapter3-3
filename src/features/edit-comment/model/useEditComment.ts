import { useState } from "react"
import { useCommentStore } from "../../../entities/comment/model/useCommentStore"
import { Comment } from "../../../entities/comment/model/types"

export const useEditComment = () => {
  const updateCommentInStore = useCommentStore((state) => state.updateComment)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const openDialog = (comment: Comment) => {
    setSelectedComment(comment)
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
    setSelectedComment(null)
  }

  const updateComment = async () => {
    if (!selectedComment) return
    const data = await updateCommentInStore(selectedComment.id, selectedComment.postId, selectedComment.body)
    if (data) {
      closeDialog()
    }
    return data
  }

  return {
    showDialog,
    selectedComment,
    setShowDialog,
    setSelectedComment,
    openDialog,
    closeDialog,
    updateComment,
  }
}

