import { postsKeys } from "../api/posts-keys";
import { getPostsApi } from "../api/post-api";
import { useQuery } from "@tanstack/react-query";
import { PostGetQueryParams } from "../api/dto";

export function usePostsQuery(params: PostGetQueryParams) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => getPostsApi(params),
  });
}
