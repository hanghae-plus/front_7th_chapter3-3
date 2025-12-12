import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Textarea } from '@/shared/ui'
import { useUpdateComment } from '@/entities/comment/api/queries'
import { Comment } from '@/entities/comment/model/types'

interface CommentUpdateDialogProps {
  comment: Comment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommentUpdateDialog = ({ comment, open, onOpenChange }: CommentUpdateDialogProps) => {
  const [body, setBody] = useState('')
  const updateComment = useUpdateComment()

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleSubmit = () => {
    if (!comment) return

    updateComment.mutate(
      { id: comment.id, body, postId: comment.postId },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit} disabled={updateComment.isPending}>
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
