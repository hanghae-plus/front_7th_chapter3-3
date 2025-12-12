import { useCallback } from "react"
import { Post } from "@/entities/post/model/post"
import { usePostsQuery } from "@/entities/post/model/use-posts-query"
import { useUsersQuery } from "@/entities/user/model/use-users-query"
import { useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEY } from "@/entities/post/model/use-posts-query"

interface UsePostsParams {
  skip?: number
  limit?: number
  tag?: string
  search?: string
}

export const usePosts = (params: UsePostsParams = {}) => {
  const queryClient = useQueryClient()
  const { data: usersData } = useUsersQuery()
  const users = usersData?.users || []

  const { data, isLoading, refetch } = usePostsQuery(params, users)

  const posts = data?.posts || []
  const total = data?.total || 0

  const refetchPosts = useCallback(
    async (options?: { skip: number; limit: number }) => {
      await queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
      if (options) {
        await refetch()
      }
    },
    [queryClient, refetch],
  )

  const searchPosts = useCallback(
    async (_query: string) => {
      // 검색은 params를 통해 처리되므로 여기서는 invalidate만
      await queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
    [queryClient],
  )

  const fetchPostsByTag = useCallback(
    async (_tag: string) => {
      // 태그 필터링도 params를 통해 처리되므로 invalidate만
      await queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
    [queryClient],
  )

  const addPostToState = useCallback(
    (newPost: Post) => {
      queryClient.setQueryData<{ posts: Post[]; total: number }>(
        [...POSTS_QUERY_KEY, params],
        (old) => {
          if (!old) return { posts: [newPost], total: 1 }
          return {
            posts: [newPost, ...old.posts],
            total: old.total + 1,
          }
        },
      )
    },
    [queryClient, params],
  )

  const removePostFromState = useCallback(
    (postId: number) => {
      queryClient.setQueryData<{ posts: Post[]; total: number }>(
        [...POSTS_QUERY_KEY, params],
        (old) => {
          if (!old) return old
          return {
            posts: old.posts.filter((post) => post.id !== postId),
            total: old.total - 1,
          }
        },
      )
    },
    [queryClient, params],
  )

  return {
    posts,
    total,
    loading: isLoading,
    refetchPosts,
    searchPosts,
    fetchPostsByTag,
    addPostToState,
    removePostFromState,
  }
}
