import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"
import type { Comment } from "@/entities/comment"

interface EditCommentButtonProps {
  comment: Comment
  onClick?: (comment: Comment) => void
}

/**
 * 댓글 수정 버튼
 * 클릭 시 댓글 수정 다이얼로그를 열어서 댓글을 수정할 수 있습니다.
 */
export const EditCommentButton = ({ comment, onClick }: EditCommentButtonProps) => {
  const handleClick = () => {
    onClick?.(comment)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} title="댓글 수정">
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}

