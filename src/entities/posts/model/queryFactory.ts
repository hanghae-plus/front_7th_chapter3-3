import { queryOptions } from "@tanstack/react-query"
import { fetchPosts, fetchTags, searchPosts, fetchPostsByTag } from "../api"

export const postQueries = {
  all: () => ["posts"],

  lists: () => [...postQueries.all(), "list"],

  tagsList: () => [...postQueries.all(), "tags"],

  searches: () => [...postQueries.all(), "search"],

  byTagList: () => [...postQueries.all(), "byTag"],

  list: (limit: number, skip: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), limit, skip],
      queryFn: () => fetchPosts(limit, skip),
    }),

  tags: () =>
    queryOptions({
      queryKey: postQueries.tagsList(),
      queryFn: () => fetchTags(),
    }),

  search: (query: string) =>
    queryOptions({
      queryKey: [...postQueries.searches(), query],
      queryFn: () => searchPosts(query),
    }),

  byTag: (tag: string) =>
    queryOptions({
      queryKey: [...postQueries.byTagList(), tag],
      queryFn: () => fetchPostsByTag(tag),
    }),
}
