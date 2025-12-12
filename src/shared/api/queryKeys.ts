export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: (params: { skip: number; limit: number }) => ["posts", "list", params] as const,
    search: (query: string) => ["posts", "search", query] as const,
    byTag: (tag: string) => ["posts", "tag", tag] as const,
    detail: (id: number) => ["posts", "detail", id] as const,
  },
  comments: {
    all: ["comments"] as const,
    byPost: (postId: number) => ["comments", "post", postId] as const,
  },
  users: {
    all: ["users"] as const,
    detail: (id: number) => ["users", "detail", id] as const,
  },
  tags: {
    all: ["tags"] as const,
  },
}
