import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPostsBySearchApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";
import { PostListApiResponse, PostsSearchQueryParams } from "../api/dto";
import { STALE_TIME } from "../../../shared/config/query-config";

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
    queryKey: postsKeys.listBySearch(params?.q ?? "", params),
    queryFn: () => getPostsBySearchApi(params),
    staleTime: STALE_TIME.DYNAMIC,
    select,
    enabled,
  });
}
