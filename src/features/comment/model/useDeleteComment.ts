import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (commentId: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) {
        return Promise.reject(new Error("User cancelled"))
      }
      return commentApi.deleteComment(commentId)
    },
    // 낙관적 업데이트
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.comments.byPost(postId) })

      const previousComments = queryClient.getQueryData<{ comments: TComment[] }>(queryKeys.comments.byPost(postId))

      queryClient.setQueryData(queryKeys.comments.byPost(postId), (old: { comments: TComment[] } | undefined) =>
        old
          ? {
              comments: old.comments.filter((c) => c.id !== commentId),
            }
          : old,
      )

      return { previousComments }
    },
    // 에러 시 롤백
    onError: (_err, _commentId, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKeys.comments.byPost(postId), context.previousComments)
      }
    },
  })

  return {
    handleDelete: mutation.mutate,
    isLoading: mutation.isPending,
  }
}
