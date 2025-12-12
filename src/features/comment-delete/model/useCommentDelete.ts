import { useDeleteComment } from '@/entities/comment/api/queries'

export const useCommentDelete = (postId: number) => {
  const deleteComment = useDeleteComment()

  const handleDelete = (commentId: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment.mutate({ id: commentId, postId })
    }
  }

  return {
    handleDelete,
    isPending: deleteComment.isPending,
  }
}
