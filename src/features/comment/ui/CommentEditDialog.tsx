import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"
import { Comment } from "@/entities/comment/model/comment"

interface CommentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
  onSubmit: (id: number, body: string) => void
}

export const CommentEditDialog = ({ open, onOpenChange, comment, onSubmit }: CommentEditDialogProps) => {
  const [body, setBody] = useState("")

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleSubmit = () => {
    if (comment) {
      onSubmit(comment.id, body)
    }
  }

  if (!comment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea rows={3} placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
