import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, type Post, type PostsResponse, type CreatePostRequest } from "@/entities/post"
import { queryKeys } from "@/shared/api"
import { usePaginationStore } from "@/features/pagination"

export const useAddPost = () => {
  const queryClient = useQueryClient()
  const { skip, limit } = usePaginationStore()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApi.create(data),

    onMutate: async (newPost) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.all,
      })

      // 2. Snapshot the previous value
      const previousData = queryClient.getQueryData<PostsResponse>(
        queryKeys.posts.list({ skip, limit })
      )

      // 3. Optimistically update to the new value
      const optimisticPost: Post = {
        id: Date.now(), // Temporary ID
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
        tags: [],
        reactions: { likes: 0, dislikes: 0 },
        views: 0,
      }

      queryClient.setQueryData<PostsResponse>(
        queryKeys.posts.list({ skip, limit }),
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: [optimisticPost, ...old.posts],
            total: old.total + 1,
          }
        }
      )

      // 4. Return context with previous value
      return { previousData }
    },

    onError: (error, _newPost, context) => {
      // 5. Rollback cache on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.posts.list({ skip, limit }),
          context.previousData
        )
      }
      console.error("게시물 추가 오류:", error)
    },

    onSettled: () => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
