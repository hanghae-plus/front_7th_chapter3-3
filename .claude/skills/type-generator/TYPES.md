# Complete Type Definitions

## Post Entity Types

```typescript
// src/entities/post/model/types.ts

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

export interface PostWithAuthor extends Post {
  author: {
    username: string
    image: string
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

export interface UpdatePostRequest {
  title?: string
  body?: string
}

export type PostSortField = 'id' | 'title' | 'reactions' | 'views'
```

---

## Comment Entity Types

```typescript
// src/entities/comment/model/types.ts

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface CreateCommentRequest {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentRequest {
  body: string
}
```

---

## User Entity Types

```typescript
// src/entities/user/model/types.ts

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  phone: string
  address: UserAddress
  company: UserCompany
}

export interface UserAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
}

export interface UserCompany {
  department: string
  name: string
  title: string
  address: UserAddress
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

// Minimal user for display
export type UserSummary = Pick<User, 'id' | 'username' | 'image'>
```

---

## Tag Entity Types

```typescript
// src/entities/tag/model/types.ts

export type Tag = string

export type TagsResponse = Tag[]
```

---

## Shared API Types

```typescript
// src/shared/api/types.ts

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  skip: number
  limit: number
}

// Pagination params
export interface PaginationParams {
  skip: number
  limit: number
}

// Sort params
export interface SortParams<T extends string = string> {
  sortBy: T
  sortOrder: 'asc' | 'desc'
}

// API Error
export interface ApiError {
  message: string
  status: number
}

// Query params builder
export type QueryParams = Record<string, string | number | boolean | undefined>
```

---

## UI State Types

```typescript
// src/shared/types/ui.ts

// Filter state
export interface FilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

// Pagination state
export interface PaginationState {
  skip: number
  limit: number
}

// Dialog state
export interface DialogState {
  isOpen: boolean
  data?: unknown
}

// Form state helper
export type FormState<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
}
```

---

## Component Props Types

```typescript
// Common props patterns

// Base props with className
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// Controlled input props
export interface ControlledInputProps<T> {
  value: T
  onChange: (value: T) => void
}

// Dialog props
export interface DialogProps {
  open: boolean
  onClose: () => void
}

// Entity action props
export interface EntityActionsProps<T> {
  item: T
  onEdit?: (item: T) => void
  onDelete?: (id: number) => void
  onView?: (item: T) => void
}

// List props
export interface ListProps<T> {
  items: T[]
  isLoading?: boolean
  error?: Error | null
  renderItem: (item: T) => React.ReactNode
  emptyMessage?: string
}
```

---

## Barrel Exports

```typescript
// src/entities/post/model/index.ts
export type {
  Post,
  PostWithAuthor,
  PostsResponse,
  CreatePostRequest,
  UpdatePostRequest,
  PostSortField,
} from './types'

// src/entities/post/index.ts
export type * from './model'
export * from './api'
export * from './ui'
```
