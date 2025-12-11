import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi, type CreateCommentDto } from '../../../entities/comment/api'
import { commentKeys } from '../../../shared/lib'

/**
 * 댓글 생성 기능
 */
export const useCommentCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: CreateCommentDto) => commentApi.createComment(comment),
    onSuccess: (_data, variables) => {
      // 해당 게시물의 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) })
    },
    onError: (error) => {
      console.error('댓글 생성 오류:', error)
    },
  })
}
