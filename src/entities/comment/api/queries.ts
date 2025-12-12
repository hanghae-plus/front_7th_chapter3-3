import { queryOptions } from "@tanstack/react-query"
import { getComments } from "./api"

export const commentQueries = {
  all: ["comments", "post"] as const,
  list: (id: number) =>
    queryOptions({
      queryKey: [...commentQueries.all, id],
      queryFn: () => getComments(id),
    }),
}
