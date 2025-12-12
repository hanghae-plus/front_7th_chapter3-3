# TypeScript Patterns

## Utility Types

### Pick and Omit
```typescript
// Pick specific fields
type PostSummary = Pick<Post, 'id' | 'title' | 'userId'>

// Omit specific fields
type PostWithoutReactions = Omit<Post, 'reactions'>
```

### Partial and Required
```typescript
// All fields optional (for updates)
type UpdatePostData = Partial<Post>

// All fields required
type RequiredPost = Required<Post>
```

### Record
```typescript
// Map of comments by post ID
type CommentsByPost = Record<number, Comment[]>

// Form errors
type FormErrors<T> = Partial<Record<keyof T, string>>
```

### Extract and Exclude
```typescript
type SortOrder = 'asc' | 'desc' | 'none'

// Extract only 'asc' | 'desc'
type ValidSortOrder = Exclude<SortOrder, 'none'>
```

---

## Generic Types

### API Response Wrapper
```typescript
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Usage
type PostResponse = ApiResponse<Post>
type PostsResponse = ApiResponse<Post[]>
```

### Paginated Response
```typescript
interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Usage
type PaginatedPosts = PaginatedResponse<Post>
```

### Async State
```typescript
interface AsyncState<T, E = Error> {
  data: T | null
  isLoading: boolean
  error: E | null
}

// Usage
type PostsState = AsyncState<Post[]>
```

---

## Discriminated Unions

### API Response States
```typescript
type QueryResult<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

// Usage
function handleResult(result: QueryResult<Post[]>) {
  switch (result.status) {
    case 'loading':
      return <Loading />
    case 'error':
      return <Error message={result.error.message} />
    case 'success':
      return <PostList posts={result.data} />
  }
}
```

### Dialog Types
```typescript
type DialogState =
  | { type: 'closed' }
  | { type: 'add' }
  | { type: 'edit'; post: Post }
  | { type: 'delete'; postId: number }

function handleDialog(state: DialogState) {
  switch (state.type) {
    case 'closed':
      return null
    case 'add':
      return <AddDialog />
    case 'edit':
      return <EditDialog post={state.post} />
    case 'delete':
      return <DeleteDialog postId={state.postId} />
  }
}
```

---

## Type Guards

### Check for Null/Undefined
```typescript
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

// Usage
const posts: (Post | null)[] = [...]
const validPosts = posts.filter(isNotNull) // Post[]
```

### Check Object Type
```typescript
function isPost(obj: unknown): obj is Post {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'body' in obj
  )
}
```

### Check Array
```typescript
function isPostArray(arr: unknown): arr is Post[] {
  return Array.isArray(arr) && arr.every(isPost)
}
```

---

## Mapped Types

### Make All Properties Nullable
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

type NullablePost = Nullable<Post>
```

### Make Specific Properties Optional
```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type PostWithOptionalReactions = PartialBy<Post, 'reactions'>
```

### Readonly Deep
```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}

type ImmutablePost = DeepReadonly<Post>
```

---

## Component Prop Types

### With Children
```typescript
interface PropsWithChildren<P = unknown> {
  children: React.ReactNode
} & P

// Usage
interface CardProps extends PropsWithChildren {
  title: string
}
```

### Event Handler Props
```typescript
interface ClickableProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void
}

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}
```

### Polymorphic Component
```typescript
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

// Usage
interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

function Button<C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  children,
  ...props
}: PolymorphicComponentProp<C, ButtonProps>) {
  const Component = as || 'button'
  return <Component {...props}>{children}</Component>
}

// Can be used as:
<Button>Click me</Button>
<Button as="a" href="/link">Link</Button>
```

---

## Inference

### Infer Return Type
```typescript
function createPost(title: string, body: string) {
  return { id: Date.now(), title, body, userId: 1 }
}

type CreatedPost = ReturnType<typeof createPost>
```

### Infer Array Element
```typescript
type PostArray = Post[]
type PostElement = PostArray[number] // Post
```

### Infer Promise Value
```typescript
type FetchPostsReturn = Promise<PostsResponse>
type PostsResponseType = Awaited<FetchPostsReturn> // PostsResponse
```
