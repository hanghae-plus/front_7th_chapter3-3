import { PostListApiResponse } from "../../../entities/post/api/dto";
import { usePostsQuery } from "../../../entities/post/hooks/use-posts-query";
import { usePostsWithSearchQuery } from "../../../entities/post/hooks/use-posts-with-search-query";
import { usePostsWithTagQuery } from "../../../entities/post/hooks/use-posts-with-tag-query";
import { UserListApiResponse } from "../../../entities/user/api/dto";
import { useUsersQuery } from "../../../entities/user/hooks/use-users-query";
import { PostTableListData } from "../model/types";

interface UsePostTableDataQueryProps {
  skip?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  selectedTag?: string;
  searchQuery?: string;
}

export function usePostTableDataQuery({
  skip,
  limit,
  sortBy,
  sortOrder,
  selectedTag,
  searchQuery,
}: UsePostTableDataQueryProps) {
  const postsWithTagEnabled = !!selectedTag && selectedTag !== "all";
  const postsWithSearchEnabled = !!searchQuery;
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

  const { data: usersData, isFetching: isFetchingUsers } = useUsersQuery({
    params: { limit: "0", select: "username,image" },
  });

  const { data: postsData, isFetching: isFetchingPosts } = usePostsQuery({
    params: { skip: skip?.toString(), limit: limit?.toString(), sortBy, sortOrder },
    select: (data) => postSelect(data, usersData),
    enabled: postsEnabled,
  });
  const { data: postsWithSearchData, isFetching: isFetchingPostsWithSearch } = usePostsWithSearchQuery({
    searchQuery,
    select: (data) => postSelect(data, usersData),
    enabled: postsWithSearchEnabled,
  });
  const { data: postsWithTagData, isFetching: isFetchingPostsWithTag } = usePostsWithTagQuery({
    tag: selectedTag,
    enabled: postsWithTagEnabled,
    select: (data) => postSelect(data, usersData),
  });

  return {
    loading: isFetchingUsers || isFetchingPosts || isFetchingPostsWithSearch || isFetchingPostsWithTag,
    data: postsWithSearchEnabled ? postsWithSearchData : postsWithTagEnabled ? postsWithTagData : postsData,
  };
}
