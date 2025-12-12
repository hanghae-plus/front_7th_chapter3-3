import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ThumbsUp } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types"
import { Button } from "../../../shared/ui"
import { commentMutations } from "../api/mutations"

interface LikeCommentButtonProps {
  comment: Comment
}

const LikeCommentButton = ({ comment }: LikeCommentButtonProps) => {
  const queryClient = useQueryClient()
  const { mutate: likeCommentMutation } = useMutation(commentMutations.like(queryClient))

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        likeCommentMutation(comment)
      }}
    >
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}

export default LikeCommentButton
