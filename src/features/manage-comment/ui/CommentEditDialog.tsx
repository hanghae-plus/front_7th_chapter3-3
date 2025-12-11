import { useEffect, useState } from "react"
import { Button, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Comment } from "@/entities/comment/model/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment
  onSubmit: (comment: Comment) => void
}

export const CommentEditDialog = ({ open, onOpenChange, comment, onSubmit }: Props) => {
  const [editingComment, setEditingComment] = useState<Comment>(comment)

  useEffect(() => {
    setEditingComment(comment)
  }, [comment])

  const handleSubmit = () => {
    onSubmit(editingComment)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={editingComment.body}
            onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
          />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
