import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useCreateComment } from "@/entities/comment"

interface CreateCommentDialogProps {
  postId: number
  onSuccess?: () => void // optional로 변경
}

export const CreateCommentDialog = ({ postId, onSuccess }: CreateCommentDialogProps) => {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState("")

  // TanStack Query Mutation 사용
  const createComment = useCreateComment()

  const handleCreate = () => {
    createComment.mutate(
      { body, postId, userId: 1 },
      {
        onSuccess: () => {
          setBody("")
          setOpen(false)
          onSuccess?.()
        },
        onError: (error) => {
          console.error("댓글 추가 오류:", error)
        },
      },
    )
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
            <Button onClick={handleCreate} disabled={createComment.isPending}>
              {createComment.isPending ? "추가 중..." : "댓글 추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
