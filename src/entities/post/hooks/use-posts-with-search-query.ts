import { useQuery } from "@tanstack/react-query";
import { getPostsBySearchApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";

export function usePostsWithSearchQuery(searchQuery: string) {
  return useQuery({
    queryKey: postsKeys.listBySearch(searchQuery),
    queryFn: () => getPostsBySearchApi(searchQuery),
    enabled: !!searchQuery,
  });
}
