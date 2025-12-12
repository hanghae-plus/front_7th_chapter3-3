import { ThumbsUp } from "lucide-react"
import { Button } from "@/shared/ui"
import { useLikeComment } from "../api/use-like-comment"

interface LikeCommentButtonProps {
  commentId: number
  likes: number
  onSuccess?: () => void // optional로 변경
}

export const LikeCommentButton = ({ commentId, likes, onSuccess }: LikeCommentButtonProps) => {
  // TanStack Query Mutation 사용
  const likeComment = useLikeComment()

  const handleLike = () => {
    likeComment.mutate(
      { id: commentId, currentLikes: likes },
      {
        onSuccess: () => {
          onSuccess?.()
        },
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      },
    )
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLike} disabled={likeComment.isPending}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{likes}</span>
    </Button>
  )
}
