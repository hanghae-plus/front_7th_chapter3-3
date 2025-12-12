# TanStack Query Migration Agent

You are a TanStack Query (React Query) expert. Your task is to migrate all API calls from manual fetch/useState to TanStack Query for proper server state management.

## Tasks to Perform

### 1. Analyze Current API Calls
Identify all fetch calls in `src/pages/PostsManagerPage.tsx`:

**Queries (GET requests):**
- `fetchPosts()` - Get paginated posts
- `fetchTags()` - Get all tags
- `searchPosts()` - Search posts by query
- `fetchPostsByTag()` - Get posts by tag
- `fetchComments(postId)` - Get comments for a post
- `fetchUser(userId)` - Get user details

**Mutations (POST/PUT/DELETE):**
- `addPost()` - Create new post
- `updatePost()` - Update existing post
- `deletePost(id)` - Delete post
- `addComment()` - Create new comment
- `updateComment()` - Update existing comment
- `deleteComment(id)` - Delete comment
- `likeComment(id)` - Like a comment

### 2. Setup TanStack Query

```typescript
// src/app/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 3. Define Query Keys

```typescript
// src/shared/api/queryKeys.ts
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: (params: { skip: number; limit: number; tag?: string; sortBy?: string; sortOrder?: string }) =>
      ['posts', 'list', params] as const,
    search: (query: string) => ['posts', 'search', query] as const,
    detail: (id: number) => ['posts', 'detail', id] as const,
  },
  comments: {
    all: ['comments'] as const,
    byPost: (postId: number) => ['comments', 'post', postId] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', 'detail', id] as const,
  },
  tags: {
    all: ['tags'] as const,
  },
}
```

### 4. Create Custom Hooks

**Query Hooks:**

```typescript
// src/entities/post/api/usePosts.ts
export function usePosts(params: PostsParams) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => postApi.getPosts(params),
  })
}

// src/entities/post/api/useSearchPosts.ts
export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: queryKeys.posts.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

// src/entities/comment/api/useComments.ts
export function useComments(postId: number) {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => commentApi.getComments(postId),
    enabled: !!postId,
  })
}

// src/entities/user/api/useUser.ts
export function useUser(userId: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId,
  })
}
```

**Mutation Hooks:**

```typescript
// src/features/add-post/api/useAddPost.ts
export function useAddPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}

// src/features/edit-post/api/useUpdatePost.ts
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostRequest }) =>
      postApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}

// src/features/delete-post/api/useDeletePost.ts
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

### 5. Implement Optimistic Updates

```typescript
// src/features/like-comment/api/useLikeComment.ts
export function useLikeComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postId }: { id: number; postId: number }) =>
      commentApi.likeComment(id),
    onMutate: async ({ id, postId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.comments.byPost(postId) })

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(queryKeys.comments.byPost(postId))

      // Optimistically update
      queryClient.setQueryData(queryKeys.comments.byPost(postId), (old: CommentsResponse) => ({
        ...old,
        comments: old.comments.map(comment =>
          comment.id === id
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        ),
      }))

      return { previousComments }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(variables.postId),
          context.previousComments
        )
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(variables.postId) })
    },
  })
}
```

### 6. File Structure

```
src/
├── app/
│   └── providers/
│       └── QueryProvider.tsx
├── shared/
│   └── api/
│       ├── queryKeys.ts
│       ├── apiClient.ts
│       └── types.ts
├── entities/
│   ├── post/
│   │   └── api/
│   │       ├── postApi.ts
│   │       ├── usePosts.ts
│   │       ├── useSearchPosts.ts
│   │       └── index.ts
│   ├── comment/
│   │   └── api/
│   │       ├── commentApi.ts
│   │       ├── useComments.ts
│   │       └── index.ts
│   └── user/
│       └── api/
│           ├── userApi.ts
│           ├── useUser.ts
│           └── index.ts
├── features/
│   ├── add-post/
│   │   └── api/
│   │       └── useAddPost.ts
│   ├── edit-post/
│   │   └── api/
│   │       └── useUpdatePost.ts
│   ├── delete-post/
│   │   └── api/
│   │       └── useDeletePost.ts
│   └── like-comment/
│       └── api/
│           └── useLikeComment.ts
```

## Implementation Order

1. Install TanStack Query: `pnpm add @tanstack/react-query @tanstack/react-query-devtools`
2. Create QueryProvider and wrap App
3. Define query keys
4. Create API client layer
5. Create query hooks (read operations)
6. Create mutation hooks (write operations)
7. Implement optimistic updates for better UX
8. Replace all manual fetch calls with hooks
9. Remove useState for server data
10. Remove manual loading states (use `isLoading` from hooks)

## Important Notes
- Query keys should be structured and predictable
- Use `enabled` option to conditionally run queries
- Implement proper error boundaries
- Use `staleTime` and `gcTime` for caching optimization
- Optimistic updates improve perceived performance
- DevTools help with debugging

Now install TanStack Query and start migrating the API calls.
