# TanStack Query Hooks Reference

## Query Hooks (GET Requests)

### Basic Query
```typescript
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { postApi } from './postApi'

export function usePosts(params: { skip: number; limit: number }) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => postApi.getPosts(params),
  })
}
```

### Conditional Query
```typescript
export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: queryKeys.posts.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: query.length > 0,  // Only run when query exists
  })
}
```

### Query with Dependent Data
```typescript
export function usePostComments(postId: number | null) {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId!),
    queryFn: () => commentApi.getByPostId(postId!),
    enabled: !!postId,  // Only run when postId exists
  })
}
```

### Query with Select (Transform Data)
```typescript
export function useUsernames() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => userApi.getAll(),
    select: (data) => data.users.map(u => u.username),
  })
}
```

### Query with Initial Data
```typescript
export function usePost(id: number) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postApi.getById(id),
    initialData: () => {
      // Get from cache if available
      const posts = queryClient.getQueryData<PostsResponse>(queryKeys.posts.all)
      return posts?.posts.find(p => p.id === id)
    },
  })
}
```

---

## Mutation Hooks (POST/PUT/DELETE)

### Basic Mutation
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { postApi, type CreatePostRequest } from '@/entities/post'

export function useAddPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

### Mutation with Variables
```typescript
interface UpdateParams {
  id: number
  data: UpdatePostRequest
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateParams) => postApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

### Mutation with Callbacks
```typescript
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onMutate: (id) => {
      console.log('Deleting post:', id)
    },
    onSuccess: (data, id) => {
      console.log('Deleted:', id)
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
    onError: (error, id) => {
      console.error('Failed to delete:', id, error)
    },
    onSettled: () => {
      // Always runs (success or error)
    },
  })
}
```

---

## Using Hooks in Components

### Query Usage
```typescript
function PostsList() {
  const { skip, limit } = usePaginationStore()
  const { data, isLoading, error, refetch } = usePosts({ skip, limit })

  if (isLoading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <div>
      {data?.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Mutation Usage
```typescript
function AddPostButton() {
  const { mutate, isPending } = useAddPost()

  const handleAdd = () => {
    mutate(
      { title: 'New Post', body: 'Content', userId: 1 },
      {
        onSuccess: () => {
          toast.success('Post added!')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  }

  return (
    <Button onClick={handleAdd} disabled={isPending}>
      {isPending ? 'Adding...' : 'Add Post'}
    </Button>
  )
}
```

---

## Query Invalidation Patterns

### Invalidate All Posts
```typescript
queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
```

### Invalidate Specific Query
```typescript
queryClient.invalidateQueries({ queryKey: queryKeys.posts.list({ skip: 0, limit: 10 }) })
```

### Invalidate Multiple Queries
```typescript
queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
queryClient.invalidateQueries({ queryKey: queryKeys.comments.all })
```

### Refetch Query
```typescript
queryClient.refetchQueries({ queryKey: queryKeys.posts.all })
```

### Set Query Data Directly
```typescript
queryClient.setQueryData(queryKeys.posts.detail(1), updatedPost)
```

---

## Hook Return Values

### useQuery Returns
```typescript
const {
  data,           // Query result
  isLoading,      // First load
  isFetching,     // Any fetch (including background)
  isError,        // Error state
  error,          // Error object
  isSuccess,      // Success state
  refetch,        // Manually refetch
  status,         // 'pending' | 'error' | 'success'
} = useQuery(...)
```

### useMutation Returns
```typescript
const {
  mutate,         // Trigger mutation
  mutateAsync,    // Trigger mutation (Promise)
  isPending,      // Loading state
  isError,        // Error state
  error,          // Error object
  isSuccess,      // Success state
  data,           // Response data
  reset,          // Reset mutation state
} = useMutation(...)
```
