import { useState } from "react"
import { Edit2 } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { Comment, useUpdateComment } from "@/entities/comment"

interface EditCommentButtonProps {
  comment: Comment
  onSuccess?: () => void // optional로 변경
}

export const EditCommentButton = ({ comment, onSuccess }: EditCommentButtonProps) => {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState(comment.body)

  // TanStack Query Mutation 사용
  const updateComment = useUpdateComment()

  const handleUpdate = () => {
    updateComment.mutate(
      { id: comment.id, body },
      {
        onSuccess: () => {
          setOpen(false)
          onSuccess?.()
        },
        onError: (error) => {
          console.error("댓글 업데이트 오류:", error)
        },
      },
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setBody(comment.body)
          setOpen(true)
        }}
      >
        <Edit2 className="w-3 h-3" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
            <Button onClick={handleUpdate} disabled={updateComment.isPending}>
              {updateComment.isPending ? "업데이트 중..." : "댓글 업데이트"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
