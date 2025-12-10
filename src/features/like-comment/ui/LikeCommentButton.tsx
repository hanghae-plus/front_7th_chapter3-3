import { ThumbsUp } from "lucide-react"
import { Button } from "@/shared/ui"
import { likeComment } from "@/entities/comment"

interface LikeCommentButtonProps {
  commentId: number
  likes: number
  onSuccess: () => void
}

export const LikeCommentButton = ({ commentId, likes, onSuccess }: LikeCommentButtonProps) => {
  const handleLike = async () => {
    try {
      await likeComment(commentId, likes)
      onSuccess()
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{likes}</span>
    </Button>
  )
}
