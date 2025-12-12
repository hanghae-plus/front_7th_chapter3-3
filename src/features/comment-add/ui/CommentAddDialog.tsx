import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "@/shared/ui"
import { useMutationCommentAdd } from "@/entities/comment/model/useComment"

interface CommentAddDialogProps {
  postId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommentAddDialog = ({ postId, open, onOpenChange }: CommentAddDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: addComment } = useMutationCommentAdd()

  const handleAdd = () => {
    if (postId) {
      addComment(
        { body, postId, userId: 1 },
        {
          onSuccess: () => {
            onOpenChange(false)
            setBody("")
          },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleAdd}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
