import { useState } from "react"
import { useCommentStore } from "../../../entities/comment/model/useCommentStore"
import { NewComment } from "../../../entities/comment/model/types"

export const useAddComment = () => {
  const addCommentToStore = useCommentStore((state) => state.addComment)
  const [showDialog, setShowDialog] = useState(false)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  const openDialog = (postId: number) => {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
    resetForm()
  }

  const resetForm = () => {
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  const addComment = async () => {
    const data = await addCommentToStore(newComment)
    if (data) {
      closeDialog()
    }
    return data
  }

  return {
    showDialog,
    newComment,
    setShowDialog,
    setNewComment,
    openDialog,
    closeDialog,
    addComment,
  }
}

