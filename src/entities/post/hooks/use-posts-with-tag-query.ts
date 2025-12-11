import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPostsByTagApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";
import { PostListApiResponse } from "../api/dto";

interface UsePostsWithTagQueryProps<TQueryFnData, TError = unknown, TData = TQueryFnData> {
  tag?: string;
  select?: UseQueryOptions<PostListApiResponse, TError, TData>["select"];
  enabled?: boolean;
}

export function usePostsWithTagQuery<TQueryFnData, TError = unknown, TData = TQueryFnData>({
  tag = "",
  enabled = true,
  select,
}: UsePostsWithTagQueryProps<TQueryFnData, TError, TData>) {
  return useQuery({
    queryKey: postsKeys.listByTag(tag),
    queryFn: () => getPostsByTagApi(tag),
    select,
    enabled,
  });
}
