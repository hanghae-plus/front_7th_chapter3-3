import { useEffect, useState } from "react"

import { Dialog, Textarea, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/comment"
import { useSelectedCommentStore } from "../../../entities/comment/model/useSelectedCommentStore"

import { useEditCommentDialogStore } from "../model/useEditCommentDialogStore"
import useUpdateCommentQuery from "../model/useUpdateCommentQuery"

const EditCommentDialog = () => {
  const showEditCommentDialog = useEditCommentDialogStore((state) => state.showDialog)
  const setShowEditCommentDialog = useEditCommentDialogStore((state) => state.setShowDialog)
  const selectedComment = useSelectedCommentStore((state) => state.selectedComment)
  const { updateComment } = useUpdateCommentQuery()

  const [newComment, setNewComment] = useState<Comment>(selectedComment!)

  useEffect(() => {
    setNewComment(selectedComment!)
  }, [selectedComment])

  const handleUpdateComment = () => {
    updateComment({ comment: newComment })
    setShowEditCommentDialog(false)
  }

  if (!selectedComment) return <></>

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment?.body || ""}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default EditCommentDialog
