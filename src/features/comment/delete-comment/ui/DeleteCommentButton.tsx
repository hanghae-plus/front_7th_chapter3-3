import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { useDeleteComment } from "@/entities/comment"

interface DeleteCommentButtonProps {
  commentId: number
  onSuccess?: () => void // optional로 변경
}

export const DeleteCommentButton = ({ commentId, onSuccess }: DeleteCommentButtonProps) => {
  // TanStack Query Mutation 사용
  const deleteComment = useDeleteComment()

  const handleDelete = () => {
    deleteComment.mutate(commentId, {
      onSuccess: () => {
        onSuccess?.()
      },
      onError: (error) => {
        console.error("댓글 삭제 오류:", error)
      },
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deleteComment.isPending}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
