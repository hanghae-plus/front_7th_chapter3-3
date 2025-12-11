import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"
import type { Comment } from "@/entities/comment"

interface DeleteCommentButtonProps {
  comment: Comment
  onClick?: (commentId: number, postId: number) => void
  disabled?: boolean
}

/**
 * 댓글 삭제 버튼
 * 클릭 시 댓글을 삭제합니다.
 */
export const DeleteCommentButton = ({ comment, onClick, disabled }: DeleteCommentButtonProps) => {
  const handleClick = () => {
    onClick?.(comment.id, comment.postId)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      title="댓글 삭제"
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

