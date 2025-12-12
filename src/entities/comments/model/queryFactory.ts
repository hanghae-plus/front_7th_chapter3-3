import { queryOptions } from "@tanstack/react-query"
import { fetchComments } from "../api"

export const commentQueries = {
  all: () => ["comments"],

  lists: () => [...commentQueries.all(), "list"],

  list: (postId: number) =>
    queryOptions({
      queryKey: [...commentQueries.lists(), postId],
      queryFn: () => fetchComments(postId),
      enabled: postId > 0,
    }),
}
