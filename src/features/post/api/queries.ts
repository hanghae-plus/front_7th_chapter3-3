import { QueryClient, queryOptions } from "@tanstack/react-query"
import { postQueries } from "../../../entities/post/api/queries"
import { PostsParams } from "../../../entities/post/model/types"
import { userQueries } from "../../../entities/user/api/queries"
import { PostWithAuthorResponse } from "../model/types"

export const postWithAuthorQueries = {
  all: ["postWithAuthor"] as const,
  list: (queryClient: QueryClient, params: PostsParams) =>
    queryOptions({
      queryKey: [...postWithAuthorQueries.all, "list", params],
      queryFn: async () => {
        const queryOptions =
          params.tag && params.tag !== "all"
            ? postQueries.tag(params)
            : params.search
              ? postQueries.search(params)
              : postQueries.list(params)

        const { posts, total } = await queryClient.ensureQueryData(queryOptions)
        const { users } = await queryClient.ensureQueryData(userQueries.list())

        const processedData = posts.map((post) => ({
          ...post,
          author: users.find((user) => user.id === post.userId),
        }))

        return {
          data: processedData,
          total,
        }
      },
    }),
  detail: (queryClient: QueryClient, id: number | null) =>
    queryOptions({
      queryKey: [...postWithAuthorQueries.all, "detail", id],
      queryFn: async () => {
        if (id === null) throw new Error("Post ID is required")

        const allListQueries = queryClient.getQueriesData<PostWithAuthorResponse>({
          queryKey: [...postWithAuthorQueries.all, "list"],
        })

        for (const [, cachedData] of allListQueries) {
          if (!cachedData) continue
          const selectedPost = cachedData.data.find((post) => post.id === id)
          if (selectedPost) return selectedPost
        }

        throw new Error(`Post with id ${id} not found: list data not cached`)
      },
      enabled: id !== null,
    }),
}
