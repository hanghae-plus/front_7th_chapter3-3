import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '../../../entities/comment/api'
import { commentKeys } from '../../../shared/lib'

/**
 * 댓글 삭제 기능
 */
export const useCommentDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) =>
      commentApi.deleteComment(id),
    onSuccess: (_, variables) => {
      // 해당 게시물의 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) })
    },
    onError: (error) => {
      console.error('댓글 삭제 오류:', error)
    },
  })
}
