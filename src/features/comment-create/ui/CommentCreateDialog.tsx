import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Textarea } from '@/shared/ui'
import { useCreateComment } from '@/entities/comment/api/queries'

interface CommentCreateDialogProps {
  postId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommentCreateDialog = ({ postId, open, onOpenChange }: CommentCreateDialogProps) => {
  const [body, setBody] = useState('')
  const createComment = useCreateComment()

  useEffect(() => {
    if (!open) {
      setBody('')
    }
  }, [open])

  const handleSubmit = () => {
    if (!postId) return

    createComment.mutate(
      { body, postId, userId: 1 },
      {
        onSuccess: () => {
          setBody('')
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit} disabled={createComment.isPending}>
            댓글 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
