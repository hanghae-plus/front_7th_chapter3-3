import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '../../../entities/comment/api'
import { commentKeys } from '../../../shared/lib'
import type { Comment } from '../../../entities/comment'

/**
 * 댓글 좋아요 기능
 * 낙관적 업데이트를 적용합니다.
 */
export const useCommentLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number; postId: number }) =>
      commentApi.likeComment(id, likes),
    // 낙관적 업데이트: 서버 응답 전에 UI 업데이트
    onMutate: async ({ id, likes, postId }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: commentKeys.list(postId) })

      // 이전 데이터 백업
      const previousComments = queryClient.getQueryData<{ comments: Comment[] }>(
        commentKeys.list(postId)
      )

      // 낙관적 업데이트: 즉시 좋아요 수 증가
      queryClient.setQueryData<{ comments: Comment[] }>(
        commentKeys.list(postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === id ? { ...comment, likes: likes + 1 } : comment
            ),
          }
        }
      )

      return { previousComments }
    },
    // 에러 발생 시 롤백
    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentKeys.list(variables.postId),
          context.previousComments
        )
      }
      console.error('댓글 좋아요 오류:', error)
    },
    // 성공 시 쿼리 무효화
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) })
    },
  })
}
