import { useQuery } from "@tanstack/react-query"
import getSearchPostsApi from "../api/getSearchPostsApi"
import getUsersApi from "../../user/api/getUsersApi"
import { POST_QUERY_KEY } from "./usePostQuery"
import { PostParams } from "./post"

const useSearchPostsQuery = (params: PostParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, params],
    queryFn: async () => {
      const postsData = await getSearchPostsApi({
        searchQuery: params.searchQuery,
        limit: params.limit,
        skip: params.skip,
      })
      const { users } = await getUsersApi()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))

      return {
        ...postsData,
        posts: postsWithUsers,
      }
    },
    enabled: enabled && !!params.searchQuery,
  })
}

export default useSearchPostsQuery
