import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { deleteComment } from "@/entities/comment"

interface DeleteCommentButtonProps {
  commentId: number
  onSuccess: () => void
}

export const DeleteCommentButton = ({ commentId, onSuccess }: DeleteCommentButtonProps) => {
  const handleDelete = async () => {
    try {
      await deleteComment(commentId)
      onSuccess()
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
