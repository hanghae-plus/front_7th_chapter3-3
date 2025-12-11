import { postsKeys } from "../api/posts-keys";
import { getPostsApi } from "../api/post-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PostGetQueryParams, PostListApiResponse } from "../api/dto";

interface UsePostsQueryProps<TQueryFnData, TError = unknown, TData = TQueryFnData> {
  params?: PostGetQueryParams;
  select?: UseQueryOptions<PostListApiResponse, TError, TData>["select"];
  enabled?: boolean;
}

export function usePostsQuery<TQueryFnData, TError = unknown, TData = TQueryFnData>({
  params = {},
  select,
  enabled = true,
}: UsePostsQueryProps<TQueryFnData, TError, TData>) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => getPostsApi(params),
    select,
    enabled,
  });
}
