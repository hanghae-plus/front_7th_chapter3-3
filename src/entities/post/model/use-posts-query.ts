import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Post } from "./post"
import { User } from "@/entities/user/model/user"
import { fetchPosts } from "../api/fetch-posts"
import { fetchPostsByTag } from "../api/fetch-posts-by-tag"
import { searchPosts } from "../api/search-posts"

export const POSTS_QUERY_KEY = ["posts"] as const

interface PostsQueryParams {
  skip?: number
  limit?: number
  tag?: string
  search?: string
}

// Helper function to join posts with users
const joinPostsWithUsers = async (posts: Post[], users: User[]) => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}

export const usePostsQuery = (
  params: PostsQueryParams,
  users: User[] = [],
  options?: Omit<UseQueryOptions<{ posts: Post[]; total: number }>, "queryKey" | "queryFn">,
) => {
  const { skip = 0, limit = 10, tag, search } = params

  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, { skip, limit, tag, search }],
    queryFn: async () => {
      let data

      if (search) {
        data = await searchPosts(search)
      } else if (tag && tag !== "all") {
        data = await fetchPostsByTag(tag)
      } else {
        data = await fetchPosts({ skip, limit })
      }

      const postsWithUsers = await joinPostsWithUsers(data.posts, users)
      return {
        posts: postsWithUsers,
        total: data.total,
      }
    },
    enabled: users.length > 0, // users가 로드된 후에만 실행
    ...options,
  })
}
