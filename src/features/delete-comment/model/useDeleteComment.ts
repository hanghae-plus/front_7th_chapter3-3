import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, type CommentsResponse } from "@/entities/comment"
import { queryKeys } from "@/shared/api"

interface DeleteCommentParams {
  commentId: number
  postId: number
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentParams) =>
      commentApi.delete(commentId),

    onMutate: async ({ commentId, postId }) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })

      // 2. Snapshot the previous value
      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId)
      )

      // 3. Optimistically remove the comment
      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.filter((comment) => comment.id !== commentId),
            total: old.total - 1,
          }
        }
      )

      // 4. Return context with previous value
      return { previousData }
    },

    onError: (error, { postId }, context) => {
      // 5. Rollback cache on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(postId),
          context.previousData
        )
      }
      console.error("댓글 삭제 오류:", error)
    },

    onSettled: (_data, _error, { postId }) => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })
    },
  })
}
