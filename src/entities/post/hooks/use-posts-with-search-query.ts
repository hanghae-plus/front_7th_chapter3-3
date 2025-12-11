import { useQuery } from "@tanstack/react-query";
import { getPostsBySearchApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";

interface UsePostsWithSearchQueryProps {
  searchQuery?: string;
  enabled?: boolean;
}
export function usePostsWithSearchQuery({ searchQuery = "", enabled = true }: UsePostsWithSearchQueryProps) {
  return useQuery({
    queryKey: postsKeys.listBySearch(searchQuery),
    queryFn: () => getPostsBySearchApi(searchQuery),
    enabled,
  });
}
