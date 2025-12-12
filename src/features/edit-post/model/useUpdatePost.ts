import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, type PostsResponse, type UpdatePostRequest } from "@/entities/post"
import { queryKeys } from "@/shared/api"

interface UpdatePostParams {
  id: number
  data: UpdatePostRequest
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdatePostParams) => postApi.update(id, data),

    onMutate: async ({ id, data }) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.all,
      })

      // 2. Snapshot all cached post queries
      const previousData = queryClient.getQueriesData<PostsResponse>({
        queryKey: queryKeys.posts.all,
      })

      // 3. Optimistically update all cached lists
      queryClient.setQueriesData<PostsResponse>(
        { queryKey: queryKeys.posts.all },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.map((post) =>
              post.id === id ? { ...post, ...data } : post
            ),
          }
        }
      )

      // 4. Return context with previous value
      return { previousData }
    },

    onError: (error, _variables, context) => {
      // 5. Restore all previous data on error
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      console.error("게시물 수정 오류:", error)
    },

    onSettled: () => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
