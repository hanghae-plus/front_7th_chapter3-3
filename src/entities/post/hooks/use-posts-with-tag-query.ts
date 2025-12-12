import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPostsByTagApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";
import { PostListApiResponse, PostsTagQueryParams } from "../api/dto";

interface UsePostsWithTagQueryProps<TQueryFnData, TError = unknown, TData = TQueryFnData> {
  params?: PostsTagQueryParams;
  select?: UseQueryOptions<PostListApiResponse, TError, TData>["select"];
  enabled?: boolean;
}

export function usePostsWithTagQuery<TQueryFnData, TError = unknown, TData = TQueryFnData>({
  params,
  enabled = true,
  select,
}: UsePostsWithTagQueryProps<TQueryFnData, TError, TData>) {
  return useQuery({
    queryKey: postsKeys.listByTag(params),
    queryFn: () => getPostsByTagApi(params),
    select,
    enabled,
  });
}
