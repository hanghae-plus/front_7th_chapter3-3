/**
 * Comment Like Feature UI
 * 
 * 댓글 좋아요 버튼 컴포넌트
 */

import { ThumbsUp } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentLike } from "../model/use-comment-like"

interface CommentLikeButtonProps {
  id: number
  postId: number
  likes: number
  className?: string
}

/**
 * 댓글 좋아요 버튼
 */
export function CommentLikeButton({ id, postId, likes, className }: CommentLikeButtonProps) {
  const { handleLike } = useCommentLike()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleLike(id, postId)}
      className={className || ""}
    >
      <ThumbsUp className="w-4 h-4 mr-1" />
      {likes}
    </Button>
  )
}

