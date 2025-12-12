import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { useAddComment } from "../model/useAddComment"

interface AddCommentDialogProps {
  postId: number | null
}

export const AddCommentDialog = ({ postId }: AddCommentDialogProps) => {
  const { showAddCommentDialog, closeAddCommentDialog } = useUIStore()
  const [body, setBody] = useState("")
  const addComment = useAddComment()

  const handleAddComment = () => {
    if (!postId) return

    addComment.mutate(
      { body, postId, userId: 1 },
      {
        onSuccess: () => {
          closeAddCommentDialog()
          setBody("")
        },
      }
    )
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={closeAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleAddComment} disabled={addComment.isPending}>
            {addComment.isPending ? "추가 중..." : "댓글 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
