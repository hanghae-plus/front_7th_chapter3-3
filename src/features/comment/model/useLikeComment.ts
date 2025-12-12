import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLikeComment = (postId: number) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, currentLikes }: { id: number; currentLikes: number }) =>
      commentApi.likeComment(id, currentLikes),
    // 낙관적 업데이트
    onMutate: async ({ id, currentLikes }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.comments.byPost(postId) })

      const previousComments = queryClient.getQueryData<{ comments: TComment[] }>(queryKeys.comments.byPost(postId))

      queryClient.setQueryData(queryKeys.comments.byPost(postId), (old: { comments: TComment[] } | undefined) =>
        old
          ? {
              comments: old.comments.map((c) => (c.id === id ? { ...c, likes: currentLikes + 1 } : c)),
            }
          : old,
      )

      return { previousComments }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKeys.comments.byPost(postId), context.previousComments)
      }
    },
  })

  return {
    handleLike: (id: number, currentLikes: number) => mutation.mutate({ id, currentLikes }),
    isLoading: mutation.isPending,
  }
}
