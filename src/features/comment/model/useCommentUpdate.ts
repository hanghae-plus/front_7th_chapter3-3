import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi, type UpdateCommentDto } from '../../../entities/comment/api'
import { commentKeys } from '../../../shared/lib'

/**
 * 댓글 수정 기능
 */
export const useCommentUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: UpdateCommentDto }) =>
      commentApi.updateComment(id, comment),
    onSuccess: (data) => {
      // 해당 게시물의 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(data.postId) })
    },
    onError: (error) => {
      console.error('댓글 수정 오류:', error)
    },
  })
}
