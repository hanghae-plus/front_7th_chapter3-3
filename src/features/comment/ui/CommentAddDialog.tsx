import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"

interface CommentAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (body: string) => void
}

export const CommentAddDialog = ({ open, onOpenChange, onSubmit }: CommentAddDialogProps) => {
  const [body, setBody] = useState("")

  const handleSubmit = () => {
    onSubmit(body)
    setBody("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            rows={3}
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
