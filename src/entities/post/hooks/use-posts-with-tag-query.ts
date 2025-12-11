import { useQuery } from "@tanstack/react-query";
import { getPostsByTagApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";

export function usePostsWithTagQuery(tag: string) {
  return useQuery({
    queryKey: postsKeys.listByTag(tag),
    queryFn: () => getPostsByTagApi(tag),
    enabled: !!tag,
  });
}
