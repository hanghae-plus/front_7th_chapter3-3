import { useLikeComment } from '@/entities/comment/api/queries'
import { Comment } from '@/entities/comment/model/types'

export const useCommentLike = (postId: number) => {
  const likeComment = useLikeComment()

  const handleLike = (comment: Comment) => {
    likeComment.mutate({
      id: comment.id,
      postId,
      currentLikes: comment.likes,
    })
  }

  return {
    handleLike,
    isPending: likeComment.isPending,
  }
}
