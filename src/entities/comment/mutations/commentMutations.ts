import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "../api/commentApi"
import { commentQueries } from "../queries"

/**
 * 댓글 생성 Mutation (낙관적 업데이트 적용)
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

/**
 * 댓글 수정 Mutation (낙관적 업데이트 적용)
 *
 * 동작 방식:
 * 1. onMutate: 즉시 UI에 수정된 내용 반영
 * 2. onError: 에러 발생 시 이전 상태로 롤백
 * 3. onSettled: 서버 데이터로 최종 동기화
 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentApi.updateComment(id, body),

    // 낙관적 업데이트: 요청 전 즉시 UI 업데이트
    onMutate: async ({ id, body }) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: commentQueries.lists() })

      // 현재 캐시된 모든 댓글 목록 데이터 저장 (롤백용)
      const previousComments = queryClient.getQueriesData({ queryKey: commentQueries.lists() })

      // 모든 댓글 목록 캐시에서 해당 댓글의 body를 즉시 업데이트
      queryClient.setQueriesData({ queryKey: commentQueries.lists() }, (old: any) => {
        if (!old?.comments) return old

        return {
          ...old,
          comments: old.comments.map((comment: any) =>
            comment.id === id ? { ...comment, body } : comment
          ),
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
      console.error("댓글 수정 실패:", err)
    },

    // 완료 시: 서버 데이터로 최종 동기화
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    // },
  })
}

/**
 * 댓글 삭제 Mutation (낙관적 업데이트 적용)
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

/**
 * 댓글 좋아요 Mutation (낙관적 업데이트 적용)
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
