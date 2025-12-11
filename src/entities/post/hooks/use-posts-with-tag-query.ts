import { useQuery } from "@tanstack/react-query";
import { getPostsByTagApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";

interface UsePostsWithTagQueryProps {
  tag?: string;
  enabled?: boolean;
}

export function usePostsWithTagQuery({ tag = "", enabled = true }: UsePostsWithTagQueryProps) {
  return useQuery({
    queryKey: postsKeys.listByTag(tag),
    queryFn: () => getPostsByTagApi(tag),
    enabled,
  });
}
