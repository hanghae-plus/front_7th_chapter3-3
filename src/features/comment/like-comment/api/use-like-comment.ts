import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "@/entities/comment/api/commentApi"
import { commentQueries } from "@/entities/comment/queries"

/**
 * 댓글 좋아요 기능 (낙관적 업데이트 적용)
 *
 * FSD 공식 가이드:
 * "기능 근처 커스텀 훅에서 useMutation 로직과 queryClient 갱신을 함께 정의"
 *
 * 동작 방식:
 * 1. onMutate: 즉시 UI에 좋아요 수 증가 반영
 * 2. onError: 에러 발생 시 이전 상태로 롤백
 * 3. onSettled: 서버 데이터로 최종 동기화
 */
export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, currentLikes }: { id: number; currentLikes: number }) =>
      commentApi.likeComment(id, currentLikes),

    // 낙관적 업데이트: 요청 전 즉시 UI 업데이트
    onMutate: async ({ id }) => {
      // 진행 중인 refetch 취소 (낙관적 업데이트와 충돌 방지)
      await queryClient.cancelQueries({ queryKey: commentQueries.lists() })

      // 현재 캐시된 모든 댓글 목록 데이터 저장 (롤백용)
      const previousComments = queryClient.getQueriesData({ queryKey: commentQueries.lists() })

      // 모든 댓글 목록 캐시에서 해당 댓글의 likes를 즉시 증가
      queryClient.setQueriesData({ queryKey: commentQueries.lists() }, (old: any) => {
        if (!old?.comments) return old

        return {
          ...old,
          comments: old.comments.map((comment: any) =>
            comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
          ),
        }
      })

      // 롤백을 위해 이전 데이터 반환
      return { previousComments }
    },

    // 에러 발생 시: 이전 상태로 롤백
    onError: (err, _variables, context) => {
      if (context?.previousComments) {
        // 저장된 이전 데이터로 모든 캐시 복구
        context.previousComments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error("댓글 좋아요 실패:", err)
    },

    // 완료 시: 서버 데이터로 최종 동기화
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    // },
  })
}
