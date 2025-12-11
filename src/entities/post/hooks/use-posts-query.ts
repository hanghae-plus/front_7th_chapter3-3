import { postsKeys } from "../api/posts-keys";
import { getPostsApi } from "../api/post-api";
import { useQuery } from "@tanstack/react-query";
import { PostGetQueryParams } from "../api/dto";

interface UsePostsQueryProps {
  params?: PostGetQueryParams;
  enabled?: boolean;
}

export function usePostsQuery({ params = {}, enabled = true }: UsePostsQueryProps) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => getPostsApi(params),
    enabled,
  });
}
