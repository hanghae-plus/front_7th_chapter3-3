import { PostsListQueryParams, PostsSearchQueryParams, PostsTagQueryParams } from "./dto";

export const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  list: (params?: PostsListQueryParams) => [...postsKeys.lists(), params] as const,
  listBySearch: (search: string, params?: PostsSearchQueryParams) =>
    [...postsKeys.lists(), "search", search, params] as const,
  listByTag: (tag: string, params?: PostsTagQueryParams) => [...postsKeys.lists(), "tag", tag, params] as const,
  details: () => [...postsKeys.all, "detail"] as const,
  detail: (postId: number) => [...postsKeys.details(), postId] as const,
  tags: () => [...postsKeys.all, "tags"] as const,
};
