import {
  PostListApiResponse,
  usePostsQuery,
  usePostsWithSearchQuery,
  usePostsWithTagQuery,
} from "../../../entities/post";
import { UserListApiResponse, useUsersQuery } from "../../../entities/user";
import {
  mapPostsUrlQueryParamsToApiParams,
  mapPostsUrlQueryParamsToApiSearchParams,
  mapPostsUrlQueryParamsToApiTagParams,
} from "../lib/mappers";
import { PostsUrlQueryParams } from "../../../shared/url-query";
import { PostTableListData } from "../model/types";

interface UsePostTableDataQueryProps {
  urlQueryParams: PostsUrlQueryParams;
}

export function usePostTableDataQuery({ urlQueryParams }: UsePostTableDataQueryProps) {
  const { tag, search, sortBy, sortOrder, ...baseQueryParams } = urlQueryParams;

  const postsWithTagEnabled = !!tag && tag !== "all";
  const postsWithSearchEnabled = !!search;
  const postsEnabled = !postsWithTagEnabled && !postsWithSearchEnabled;

  const postSelect = (data: PostListApiResponse, usersData?: UserListApiResponse): PostTableListData => {
    return {
      total: data.total,
      skip: data.skip,
      limit: data.limit,
      posts: data.posts.map((post) => ({
        ...post,
        author: usersData?.users.find((user) => user.id === post.userId),
      })),
    };
  };

  const apiBaseParams = mapPostsUrlQueryParamsToApiParams({
    ...baseQueryParams,
    sortBy: sortBy ?? null,
    sortOrder: sortOrder ?? null,
    tag: null,
    search: null,
  });

  const apiSearchParams = mapPostsUrlQueryParamsToApiSearchParams({
    ...baseQueryParams,
    search: search ?? null,
    sortBy: null,
    sortOrder: null,
    tag: null,
  });

  const apiTagParams = mapPostsUrlQueryParamsToApiTagParams({
    ...baseQueryParams,
    tag: tag ?? null,
    sortBy: null,
    sortOrder: null,
    search: null,
  });

  const { data: usersData, isFetching: isFetchingUsers } = useUsersQuery({
    params: { limit: "0", select: "username,image" },
  });

  const { data: postsData, isFetching: isFetchingPosts } = usePostsQuery({
    params: apiBaseParams,
    select: (data) => postSelect(data, usersData),
    enabled: postsEnabled,
  });
  const { data: postsWithSearchData, isFetching: isFetchingPostsWithSearch } = usePostsWithSearchQuery({
    params: apiSearchParams,
    select: (data) => postSelect(data, usersData),
    enabled: postsWithSearchEnabled,
  });
  const { data: postsWithTagData, isFetching: isFetchingPostsWithTag } = usePostsWithTagQuery({
    tag: tag ?? "",
    params: apiTagParams,
    enabled: postsWithTagEnabled,
    select: (data) => postSelect(data, usersData),
  });

  return {
    loading: isFetchingUsers || isFetchingPosts || isFetchingPostsWithSearch || isFetchingPostsWithTag,
    data: postsWithSearchEnabled ? postsWithSearchData : postsWithTagEnabled ? postsWithTagData : postsData,
  };
}
