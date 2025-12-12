import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "@/entities/comment/api/commentApi"
import { commentQueries } from "@/entities/comment/queries"

/**
 * 댓글 생성 기능
 *
 * 동작 방식:
 * 1. onMutate: 즉시 UI에 임시 댓글 추가 (id는 임시값)
 * 2. onError: 에러 발생 시 이전 상태로 롤백
 * 3. onSuccess: 서버에서 받은 실제 데이터로 교체
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentApi.createComment,

    // 낙관적 업데이트: 요청 전 즉시 UI에 임시 댓글 추가
    onMutate: async (newComment) => {
      const queryKey = commentQueries.listByPost(newComment.postId).queryKey

      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey })

      // 이전 데이터 저장 (롤백용)
      const previousComments = queryClient.getQueryData(queryKey)

      // 임시 댓글을 캐시에 즉시 추가
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old?.comments) return old

        const tempComment = {
          id: Date.now(), // 임시 ID
          body: newComment.body,
          postId: newComment.postId,
          userId: newComment.userId || 1, // 임시 사용자 ID
          likes: 0,
          user: {
            id: newComment.userId || 1,
            username: "나", // 임시 사용자명
          },
        }

        return {
          ...old,
          comments: [...old.comments, tempComment],
          total: old.total + 1,
        }
      })

      return { previousComments }
    },

    // 에러 발생 시: 이전 상태로 롤백
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        const queryKey = commentQueries.listByPost(variables.postId).queryKey
        queryClient.setQueryData(queryKey, context.previousComments)
      }
      console.error("댓글 생성 실패:", err)
    },

    // 성공 시: 서버 데이터로 최종 동기화
    // onSuccess: (_data, variables) => {
    //   queryClient.invalidateQueries({
    //     queryKey: commentQueries.listByPost(variables.postId).queryKey,
    //   })
    // },
  })
}
