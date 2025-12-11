import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from '../../../entities/post/api'
import { postKeys } from '../../../shared/lib'
import type { Post } from '../../../entities/post'

/**
 * 게시물 삭제 기능
 * 낙관적 업데이트를 적용합니다.
 */
export const usePostDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    // 낙관적 업데이트: 서버 응답 전에 UI 업데이트
    onMutate: async (id) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: postKeys.all() })

      // 이전 데이터 백업
      const previousQueries = queryClient.getQueriesData({ queryKey: postKeys.all() })

      // 낙관적 업데이트: 목록에서 즉시 제거
      queryClient.setQueriesData<{ posts: Post[]; total: number }>(
        { queryKey: postKeys.all() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.filter((p) => p.id !== id),
            total: old.total - 1,
          }
        }
      )

      return { previousQueries }
    },
    // 에러 발생 시 롤백
    onError: (error, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error('게시물 삭제 오류:', error)
    },
    // 성공 시 쿼리 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })
}
