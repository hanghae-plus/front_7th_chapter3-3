import { PostGetQueryParams } from "./dto";

export const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  list: (params: PostGetQueryParams) => [...postsKeys.lists(), params] as const,
  listBySearch: (searchQuery: string) => [...postsKeys.lists(), "search", searchQuery] as const,
  listByTag: (tag: string) => [...postsKeys.lists(), "tag", tag] as const,
  details: () => [...postsKeys.all, "detail"] as const,
  detail: (postId: number) => [...postsKeys.details(), postId] as const,
  tags: () => [...postsKeys.all, "tags"] as const,
};
