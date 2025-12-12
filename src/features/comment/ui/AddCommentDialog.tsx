import { useState } from "react"
import { Dialog, Textarea, Button } from "../../../shared/ui/index"

import { AddCommentRequest } from "../../../entities/comment/model/comment"
import { useSelectedPostStore } from "../../../entities/post/model/useSelectedPostStore"

import { useAddCommentDialogStore } from "../model/useAddCommentDialogStore"
import useAddCommentQuery from "../model/useAddCommentQuery"

const AddCommentDialog = () => {
  const { addComment } = useAddCommentQuery()

  const selectedPost = useSelectedPostStore((state) => state.selectedPost)
  const showAddCommentDialog = useAddCommentDialogStore((state) => state.showDialog)
  const closeAddCommentDialog = useAddCommentDialogStore((state) => state.closeAddCommentDialog)
  const setShowAddCommentDialog = useAddCommentDialogStore((state) => state.setShowDialog)

  const [newComment, setNewComment] = useState<AddCommentRequest>({
    body: "",
    postId: selectedPost?.id || 0,
    userId: 1,
  })

  const handleAddComment = () => {
    addComment({ comment: newComment })
    setNewComment({ body: "", postId: selectedPost?.id || 0, userId: 1 })
    closeAddCommentDialog()
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, postId: selectedPost?.id || 0, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default AddCommentDialog
