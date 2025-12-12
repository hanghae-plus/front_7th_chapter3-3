import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/components"

interface CommentAddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number | null
  userId: number
  onSubmit: (body: string, postId: number, userId: number) => void
}

export function CommentAddModal({ open, onOpenChange, postId, userId, onSubmit }: CommentAddModalProps) {
  const [body, setBody] = useState("")

  const handleSubmit = () => {
    if (!postId || !body.trim()) return
    onSubmit(body, postId, userId)
    setBody("")
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setBody("")
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit} disabled={!postId || !body.trim()}>
            댓글 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
