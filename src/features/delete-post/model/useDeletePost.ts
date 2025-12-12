import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, type PostsResponse } from "@/entities/post"
import { queryKeys } from "@/shared/api"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => postApi.delete(postId),

    onMutate: async (deletedId) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.all,
      })

      // 2. Snapshot all cached post queries
      const previousData = queryClient.getQueriesData<PostsResponse>({
        queryKey: queryKeys.posts.all,
      })

      // 3. Optimistically remove from all cached lists
      queryClient.setQueriesData<PostsResponse>(
        { queryKey: queryKeys.posts.all },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.filter((p) => p.id !== deletedId),
            total: old.total - 1,
          }
        }
      )

      // 4. Return context with previous value
      return { previousData }
    },

    onError: (error, _deletedId, context) => {
      // 5. Restore all previous data on error
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      console.error("게시물 삭제 오류:", error)
    },

    onSettled: () => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
