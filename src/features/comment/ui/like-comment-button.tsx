import { Button } from "@/shared/ui"
import { ThumbsUp } from "lucide-react"
import type { Comment } from "@/entities/comment"

interface LikeCommentButtonProps {
  comment: Comment
  onClick?: (commentId: number, postId: number) => void
}

/**
 * 댓글 좋아요 버튼
 * 클릭 시 댓글의 좋아요 수를 증가시킵니다.
 */
export const LikeCommentButton = ({ comment, onClick }: LikeCommentButtonProps) => {
  const handleClick = () => {
    onClick?.(comment.id, comment.postId)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} title="댓글 좋아요">
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
