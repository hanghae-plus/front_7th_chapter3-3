import { queryOptions } from "@tanstack/react-query"
import { getTags } from "./api"

export const tagQueries = {
  all: ["posts", "tags"] as const,
  list: () =>
    queryOptions({
      queryKey: [...tagQueries.all],
      queryFn: getTags,
    }),
}
