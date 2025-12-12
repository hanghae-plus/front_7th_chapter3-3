import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi, type Comment, type CommentsResponse, type CreateCommentRequest } from "@/entities/comment"
import { queryKeys } from "@/shared/api"

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => commentApi.create(data),

    onMutate: async (newComment) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(newComment.postId),
      })

      // 2. Snapshot the previous value
      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(newComment.postId)
      )

      // 3. Optimistically add the comment
      const optimisticComment: Comment = {
        id: Date.now(), // Temporary ID
        body: newComment.body,
        postId: newComment.postId,
        likes: 0,
        user: {
          id: newComment.userId,
          username: "사용자",
          fullName: "새 사용자",
        },
      }

      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(newComment.postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: [...old.comments, optimisticComment],
            total: old.total + 1,
          }
        }
      )

      // 4. Return context with previous value
      return { previousData, postId: newComment.postId }
    },

    onError: (error, _newComment, context) => {
      // 5. Rollback cache on error
      if (context?.previousData && context?.postId) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(context.postId),
          context.previousData
        )
      }
      console.error("댓글 추가 오류:", error)
    },

    onSettled: (_data, _error, variables) => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(variables.postId),
      })
    },
  })
}
