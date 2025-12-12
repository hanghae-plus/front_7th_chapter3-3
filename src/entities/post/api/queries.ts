import { queryOptions } from "@tanstack/react-query"
import { PostsParams } from "../model/types"
import { getPosts, getPostsBySearch, getPostsByTag } from "./api"

export const postQueries = {
  all: ["posts"] as const,
  list: (params: PostsParams) =>
    queryOptions({
      queryKey: [...postQueries.all, "list", params],
      queryFn: () => getPosts(params),
    }),
  search: (params: PostsParams) =>
    queryOptions({
      queryKey: [...postQueries.all, "search", params],
      queryFn: () => getPostsBySearch(params.search),
    }),
  tag: (params: PostsParams) =>
    queryOptions({
      queryKey: [...postQueries.all, "tag", params],
      queryFn: () => getPostsByTag(params.tag),
    }),
}
