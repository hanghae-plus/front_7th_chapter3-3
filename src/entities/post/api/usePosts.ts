import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"
import { postApi } from "./postApi"

export function usePosts(params: { skip: number; limit: number }) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => postApi.getPosts(params),
  })
}

export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: queryKeys.posts.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: query.length > 0,
  })
}

export function usePostsByTag(tag: string) {
  return useQuery({
    queryKey: queryKeys.posts.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: tag.length > 0,
  })
}
