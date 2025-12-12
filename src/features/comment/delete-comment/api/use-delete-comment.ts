import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "@/entities/comment/api/commentApi"
import { commentQueries } from "@/entities/comment/queries"

/**
 * 댓글 삭제 기능
 *
 * 동작 방식:
 * 1. onMutate: 즉시 UI에서 댓글 제거
 * 2. onError: 에러 발생 시 이전 상태로 롤백
 * 3. onSettled: 서버 데이터로 최종 동기화
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentApi.deleteComment,

    // 낙관적 업데이트: 요청 전 즉시 UI에서 제거
    onMutate: async (commentId) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: commentQueries.lists() })

      // 현재 캐시된 모든 댓글 목록 데이터 저장 (롤백용)
      const previousComments = queryClient.getQueriesData({ queryKey: commentQueries.lists() })

      // 모든 댓글 목록 캐시에서 해당 댓글을 즉시 제거
      queryClient.setQueriesData({ queryKey: commentQueries.lists() }, (old: any) => {
        if (!old?.comments) return old

        return {
          ...old,
          comments: old.comments.filter((comment: any) => comment.id !== commentId),
          total: old.total - 1,
        }
      })

      return { previousComments }
    },

    // 에러 발생 시: 이전 상태로 롤백
    onError: (err, _variables, context) => {
      if (context?.previousComments) {
        context.previousComments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error("댓글 삭제 실패:", err)
    },

    // 완료 시: 서버 데이터로 최종 동기화
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    // },
  })
}
