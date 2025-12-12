import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, type CommentsResponse, type UpdateCommentRequest } from "@/entities/comment"
import { queryKeys } from "@/shared/api"

interface UpdateCommentParams {
  commentId: number
  postId: number
  data: UpdateCommentRequest
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, data }: UpdateCommentParams) =>
      commentApi.update(commentId, data),

    onMutate: async ({ commentId, postId, data }) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })

      // 2. Snapshot the previous value
      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId)
      )

      // 3. Optimistically update the comment
      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, ...data }
                : comment
            ),
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
      console.error("댓글 수정 오류:", error)
    },

    onSettled: (_data, _error, { postId }) => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })
    },
  })
}
