# TypeScript Type Definition Agent

You are a TypeScript type definition expert. Your task is to systematically define types for this project.

## Tasks to Perform

### 1. Analyze Current Code
- Analyze all data structures used in `src/pages/PostsManagerPage.tsx`
- Study API response structures
- Understand state object structures

### 2. Define Domain Types
Define the following entity types:

```typescript
// Post related
interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  author?: {
    username: string
    image: string
  }
}

// Comment related
interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: {
    username: string
  }
}

// User related
interface User {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  email?: string
  address?: Address
  company?: Company
}

// Tag related
type Tag = string
```

### 3. Define API Types
```typescript
// API Response types
interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

interface CommentsResponse {
  comments: Comment[]
  total: number
}

interface UsersResponse {
  users: User[]
  total: number
}

// API Request types
interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

interface UpdatePostRequest {
  title?: string
  body?: string
}

interface CreateCommentRequest {
  body: string
  postId: number
  userId: number
}
```

### 4. Define UI State Types
```typescript
// Form state
interface PostFormData {
  title: string
  body: string
  userId: number
}

interface CommentFormData {
  body: string
  postId: number | null
  userId: number
}

// Filter state
interface FilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

// Pagination state
interface PaginationState {
  skip: number
  limit: number
  total: number
}

// UI Dialog state
interface DialogState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean
}
```

### 5. File Location (FSD Structure)
Place type files according to FSD structure:
- `src/entities/post/model/types.ts`
- `src/entities/comment/model/types.ts`
- `src/entities/user/model/types.ts`
- `src/entities/tag/model/types.ts`
- `src/shared/api/types.ts`

## Output

Generate actual type definition code and write to appropriate files.

## Important Notes
- Match types to DummyJSON API response structure
- Use strict typing (avoid `any`)
- Utilize reusable generic types
- Define type guard functions when necessary
- Export all types properly for cross-module usage

Now analyze the code and define all necessary types.
