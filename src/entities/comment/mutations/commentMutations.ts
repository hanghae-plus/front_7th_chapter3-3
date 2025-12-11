import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "../api/commentApi"
import { commentQueries } from "../queries"

/**
 * 댓글 생성 Mutation
 *
 * 성공 시:
 * - 해당 게시물의 댓글 목록 캐시 무효화
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentApi.createComment,
    onSuccess: (_, variables) => {
      // 해당 게시물의 댓글 목록만 무효화 (효율적인 캐시 무효화)
      queryClient.invalidateQueries({
        queryKey: commentQueries.listByPost(variables.postId).queryKey,
      })
    },
  })
}

/**
 * 댓글 수정 Mutation
 *
 * 성공 시:
 * - 모든 댓글 목록 캐시 무효화
 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentApi.updateComment(id, body),
    onSuccess: () => {
      // 모든 댓글 목록 무효화 (어느 게시물의 댓글인지 모르므로)
      queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    },
  })
}

/**
 * 댓글 삭제 Mutation
 *
 * 성공 시:
 * - 모든 댓글 목록 캐시 무효화
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    },
  })
}

/**
 * 댓글 좋아요 Mutation
 *
 * 성공 시:
 * - 모든 댓글 목록 캐시 무효화
 *
 * TODO: 낙관적 업데이트(Optimistic Update) 적용 가능
 */
export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, currentLikes }: { id: number; currentLikes: number }) =>
      commentApi.likeComment(id, currentLikes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
    },
  })
}
