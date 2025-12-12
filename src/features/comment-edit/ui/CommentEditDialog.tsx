import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "@/shared/ui"
import { useMutationCommentUpdate } from "@/entities/comment/model/useComment"
import type { Comment } from "@/shared/types"

interface CommentEditDialogProps {
  comment: Comment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommentEditDialog = ({ comment, open, onOpenChange }: CommentEditDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: updateComment } = useMutationCommentUpdate()

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleUpdate = () => {
    if (comment) {
      updateComment(
        { id: comment.id, data: { body }, postId: comment.postId },
        {
          onSuccess: () => {
            onOpenChange(false)
          },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleUpdate}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
