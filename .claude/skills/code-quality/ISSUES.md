# Common Issues and Fixes

## TypeScript Issues

### Implicit `any` Type
```typescript
// ❌ Bad
const handleClick = (e) => { ... }

// ✅ Good
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

### Missing Return Type
```typescript
// ❌ Bad
function getPosts() {
  return fetch('/api/posts').then(r => r.json())
}

// ✅ Good
function getPosts(): Promise<PostsResponse> {
  return fetch('/api/posts').then(r => r.json())
}
```

### Null/Undefined Handling
```typescript
// ❌ Bad
user.name // user might be null

// ✅ Good
user?.name
// or
if (user) { user.name }
```

---

## FSD Architecture Issues

### Layer Violation
```typescript
// ❌ Bad: Entity importing from Feature
// In src/entities/post/ui/PostCard.tsx
import { useAddPost } from '@/features/add-post'

// ✅ Good: Feature imports from Entity
// In src/features/add-post/ui/AddPostDialog.tsx
import { PostCard } from '@/entities/post'
```

### Missing Barrel Export
```typescript
// ❌ Bad: Direct import
import { PostCard } from '@/entities/post/ui/PostCard'

// ✅ Good: Import from barrel
import { PostCard } from '@/entities/post'
```

### Cross-Entity Import
```typescript
// ❌ Bad: Entity importing another entity
// In src/entities/post/ui/PostCard.tsx
import { User } from '@/entities/user'

// ✅ Good: Widget composes entities
// In src/widgets/posts-table/ui/PostsTable.tsx
import { PostCard } from '@/entities/post'
import { UserAvatar } from '@/entities/user'
```

---

## React Issues

### Missing Keys
```typescript
// ❌ Bad
{posts.map(post => <PostCard post={post} />)}

// ✅ Good
{posts.map(post => <PostCard key={post.id} post={post} />)}
```

### Stale Closure
```typescript
// ❌ Bad
useEffect(() => {
  fetchPosts(skip, limit)
}, []) // Missing dependencies

// ✅ Good
useEffect(() => {
  fetchPosts(skip, limit)
}, [skip, limit])
```

### Giant Component
```typescript
// ❌ Bad: 700+ lines in one component
function PostsManager() {
  // Everything here
}

// ✅ Good: Composed components
function PostsManagerPage() {
  return (
    <div>
      <PostSearchBar />
      <PostFilters />
      <PostsTable />
      <Pagination />
    </div>
  )
}
```

---

## State Management Issues

### Server State in Zustand
```typescript
// ❌ Bad: Server data in Zustand
const usePostStore = create((set) => ({
  posts: [],
  fetchPosts: async () => {
    const posts = await postApi.getPosts()
    set({ posts })
  }
}))

// ✅ Good: Server data in TanStack Query
function usePosts(params) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => postApi.getPosts(params),
  })
}
```

### Props Drilling
```typescript
// ❌ Bad: Passing props through many levels
<Parent>
  <Child1 filter={filter}>
    <Child2 filter={filter}>
      <Child3 filter={filter} />
    </Child2>
  </Child1>
</Parent>

// ✅ Good: Use store
function Child3() {
  const filter = useFilterStore(state => state.filter)
  return <div>{filter}</div>
}
```

---

## TanStack Query Issues

### Missing Query Key
```typescript
// ❌ Bad: Static key
useQuery({
  queryKey: ['posts'],
  queryFn: () => postApi.getPosts({ skip, limit }),
})

// ✅ Good: Dynamic key with params
useQuery({
  queryKey: ['posts', { skip, limit }],
  queryFn: () => postApi.getPosts({ skip, limit }),
})
```

### Not Invalidating After Mutation
```typescript
// ❌ Bad: No invalidation
useMutation({
  mutationFn: postApi.createPost,
})

// ✅ Good: Invalidate related queries
useMutation({
  mutationFn: postApi.createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})
```

### Incorrect Enabled Usage
```typescript
// ❌ Bad: Query runs with undefined
useQuery({
  queryKey: ['user', userId],
  queryFn: () => userApi.getUser(userId),
})

// ✅ Good: Conditional query
useQuery({
  queryKey: ['user', userId],
  queryFn: () => userApi.getUser(userId!),
  enabled: !!userId,
})
```

---

## Import Path Issues

### Absolute Path Not Working
```bash
# Check tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

# Check vite.config.ts
resolve: {
  alias: {
    '@': resolve(__dirname, 'src'),
  },
}
```

### Circular Import
```typescript
// ❌ Bad: A imports B, B imports A
// entities/post/index.ts imports from entities/comment
// entities/comment/index.ts imports from entities/post

// ✅ Good: Move shared types to shared layer
// shared/types/index.ts - shared types
// entities/post - uses shared types
// entities/comment - uses shared types
```
