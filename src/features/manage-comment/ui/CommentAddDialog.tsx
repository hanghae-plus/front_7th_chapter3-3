import { useState } from "react"
import { Button, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
  onSubmit: (comment: { body: string; postId: number; userId: number }) => void
}

export const CommentAddDialog = ({ open, onOpenChange, postId, onSubmit }: Props) => {
  const [newComment, setNewComment] = useState({ body: "", postId, userId: 1 })

  const handleSubmit = () => {
    onSubmit({ ...newComment, postId })
    onOpenChange(false)
    setNewComment({ body: "", postId, userId: 1 })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleSubmit}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
