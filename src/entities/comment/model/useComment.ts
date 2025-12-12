import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "../api"
import type { CommentsResponse, CreateCommentDto, UpdateCommentDto } from "@/shared/types"

export const COMMENT_QUERY_KEY = "comments"

export const useQueryComments = (postId: number | null) => {
  return useQuery({
    queryKey: [COMMENT_QUERY_KEY, postId],
    queryFn: () => commentApi.getComments(postId!),
    enabled: !!postId,
  })
}

export const useMutationCommentAdd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCommentDto) => commentApi.createComment(data),

    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentsResponse>(
        [COMMENT_QUERY_KEY, newComment.postId],
        (old) => {
          if (!old) {
            return { comments: [newComment], total: 1 }
          }

          return {
            comments: [newComment, ...old.comments],
            total: old.total + 1,
          }
        }
      )
    },
  })
}

export const useMutationCommentUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
      postId,
    }: {
      id: number
      data: UpdateCommentDto
      postId: number
    }) => commentApi.updateComment(id, data),

    onSuccess: (updatedComment, variables) => {
      queryClient.setQueryData<CommentsResponse>(
        [COMMENT_QUERY_KEY, variables.postId],
        (old) => {
          if (!old) return undefined

          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === variables.id
                ? { ...comment, ...updatedComment }
                : comment
            ),
          }
        }
      )
    },
  })
}

export const useMutationCommentDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postId }: { id: number; postId: number }) =>
      commentApi.deleteComment(id),

    onSuccess: (_, variables) => {
      queryClient.setQueryData<CommentsResponse>(
        [COMMENT_QUERY_KEY, variables.postId],
        (old) => {
          if (!old) return undefined
          return {
            ...old,
            comments: old.comments.filter((comment) => comment.id !== variables.id),
            total: old.total - 1,
          }
        }
      )
    },
  })
}

export const useMutationCommentLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes, postId }: { id: number; likes: number; postId: number }) =>
      commentApi.likeComment(id, likes),

    // 낙관적 업데이트: API 호출 전에 UI를 먼저 업데이트
    // Mock 데이터 환경에서는 서버 응답을 신뢰할 수 없으므로 낙관적 업데이트만 유지
    onMutate: async (variables) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: [COMMENT_QUERY_KEY, variables.postId] })

      // 낙관적 업데이트: 즉시 UI 업데이트
      queryClient.setQueryData<CommentsResponse>(
        [COMMENT_QUERY_KEY, variables.postId],
        (old) => {
          if (!old) return old

          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === variables.id
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            ),
          }
        }
      )
    },

    // Mock 데이터 환경에서는 서버 응답을 무시하고 낙관적 업데이트만 유지
    // onSuccess와 onError는 제거하여 롤백이나 서버 응답 업데이트가 발생하지 않도록 함
  })
}
