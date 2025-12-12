import { PostListApiResponse } from "../../../entities/post/api/dto";
import { mapPostsUrlQueryParamsToApiParams } from "../../../entities/post/api/mappers";
import { usePostsQuery } from "../../../entities/post/hooks/use-posts-query";
import { usePostsWithSearchQuery } from "../../../entities/post/hooks/use-posts-with-search-query";
import { usePostsWithTagQuery } from "../../../entities/post/hooks/use-posts-with-tag-query";
import { UserListApiResponse } from "../../../entities/user/api/dto";
import { useUsersQuery } from "../../../entities/user/hooks/use-users-query";
import { PostsUrlQueryParams } from "../../../pages/posts-manager/model/types";
import { PostTableListData } from "../model/types";

interface UsePostTableDataQueryProps {
  urlQueryParams: PostsUrlQueryParams;
}

export function usePostTableDataQuery({ urlQueryParams }: UsePostTableDataQueryProps) {
  const { tag, search, ...baseQueryParams } = urlQueryParams;

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
    tag: null,
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
    searchQuery: search ?? undefined,
    select: (data) => postSelect(data, usersData),
    enabled: postsWithSearchEnabled,
  });
  const { data: postsWithTagData, isFetching: isFetchingPostsWithTag } = usePostsWithTagQuery({
    tag: tag ?? undefined,
    enabled: postsWithTagEnabled,
    select: (data) => postSelect(data, usersData),
  });

  return {
    loading: isFetchingUsers || isFetchingPosts || isFetchingPostsWithSearch || isFetchingPostsWithTag,
    data: postsWithSearchEnabled ? postsWithSearchData : postsWithTagEnabled ? postsWithTagData : postsData,
  };
}
