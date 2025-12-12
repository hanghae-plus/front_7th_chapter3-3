import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/components"

interface CommentEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: { id: number; body: string } | null
  onSubmit: (id: number, body: string) => void
}

export function CommentEditModal({ open, onOpenChange, comment, onSubmit }: CommentEditModalProps) {
  const [body, setBody] = useState("")

  const handleSubmit = () => {
    if (!comment || !body.trim()) return
    onSubmit(comment.id, body)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && comment) {
      setBody(comment.body)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit} disabled={!comment || !body.trim()}>
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
