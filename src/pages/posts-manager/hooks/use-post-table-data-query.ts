import {
  PostListApiResponse,
  usePostsQuery,
  usePostsWithSearchQuery,
  usePostsWithTagQuery,
} from "../../../entities/post";
import { UserListApiResponse, useUsersQuery } from "../../../entities/user";
import { mapToPostsApiParams, mapToPostsSearchApiParams, mapToPostsTagApiParams } from "../lib/mappers";
import { PaginationParams } from "../../../shared/types";
import { PostFilterParams } from "../../../features/post-filter";
import { PostTableListData } from "../../../features/post";

interface UsePostTableDataQueryProps {
  pagination: PaginationParams;
  filter: PostFilterParams;
}

export function usePostTableDataQuery({ pagination, filter }: UsePostTableDataQueryProps) {
  const { tag, search } = filter;

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

  const apiBaseParams = mapToPostsApiParams({ pagination, filter });
  const apiSearchParams = mapToPostsSearchApiParams({ pagination, filter });
  const apiTagParams = mapToPostsTagApiParams({ pagination });

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
