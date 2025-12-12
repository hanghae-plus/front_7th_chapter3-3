import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPostsBySearchApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";
import { PostListApiResponse, PostsSearchQueryParams } from "../api/dto";

interface UsePostsWithSearchQueryProps<TQueryFnData, TError = unknown, TData = TQueryFnData> {
  params?: PostsSearchQueryParams;
  select?: UseQueryOptions<PostListApiResponse, TError, TData>["select"];
  enabled?: boolean;
}
export function usePostsWithSearchQuery<TQueryFnData, TError = unknown, TData = TQueryFnData>({
  params,
  enabled = true,
  select,
}: UsePostsWithSearchQueryProps<TQueryFnData, TError, TData>) {
  return useQuery({
    queryKey: postsKeys.listBySearch(params),
    queryFn: () => getPostsBySearchApi(params),
    select,
    enabled,
  });
}
