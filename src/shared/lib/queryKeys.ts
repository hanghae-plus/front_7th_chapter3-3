export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: (params: { limit: number; skip: number; tag?: string }) => [...queryKeys.posts.all, "list", params] as const,
    detail: (id: number) => [...queryKeys.posts.all, "detail", id] as const,
    search: (query: string) => [...queryKeys.posts.all, "search", query] as const,
  },
  comments: {
    all: ["comments"] as const,
    byPost: (postId: number) => [...queryKeys.comments.all, "byPost", postId] as const,
  },
  tags: {
    all: ["tags"] as const,
  },
}
