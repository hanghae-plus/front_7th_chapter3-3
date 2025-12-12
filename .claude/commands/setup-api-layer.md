# API Layer Organization Agent

You are an API architecture expert. Your task is to create a well-organized, type-safe API layer for this project.

## Tasks to Perform

### 1. Analyze Current API Usage
Identify all API endpoints used in `src/pages/PostsManagerPage.tsx`:

**Posts API:**
- `GET /api/posts?limit={limit}&skip={skip}` - Paginated posts
- `GET /api/posts/search?q={query}` - Search posts
- `GET /api/posts/tag/{tag}` - Posts by tag
- `GET /api/posts/tags` - All tags
- `POST /api/posts/add` - Create post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

**Comments API:**
- `GET /api/comments/post/{postId}` - Comments for post
- `POST /api/comments/add` - Create comment
- `PUT /api/comments/{id}` - Update comment
- `DELETE /api/comments/{id}` - Delete comment
- `PATCH /api/comments/{id}` - Like comment

**Users API:**
- `GET /api/users?limit=0&select=username,image` - All users (minimal)
- `GET /api/users/{id}` - User details

### 2. Create Base API Client

```typescript
// src/shared/api/apiClient.ts
const BASE_URL = '/api'

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url.searchParams.append(key, String(value))
        }
      })
    }
    return url.toString()
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async post<T>(endpoint: string, data: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async put<T>(endpoint: string, data: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }
}

export const apiClient = new ApiClient(BASE_URL)
```

### 3. Create Entity-Specific API Modules

```typescript
// src/entities/post/api/postApi.ts
import { apiClient } from '@/shared/api/apiClient'
import type { Post, PostsResponse, CreatePostRequest, UpdatePostRequest } from '../model/types'

export const postApi = {
  getPosts: (params: { limit: number; skip: number }) =>
    apiClient.get<PostsResponse>('/posts', { params }),

  getPostsByTag: (tag: string) =>
    apiClient.get<PostsResponse>(`/posts/tag/${tag}`),

  searchPosts: (query: string) =>
    apiClient.get<PostsResponse>('/posts/search', { params: { q: query } }),

  getTags: () =>
    apiClient.get<string[]>('/posts/tags'),

  createPost: (data: CreatePostRequest) =>
    apiClient.post<Post>('/posts/add', data),

  updatePost: (id: number, data: UpdatePostRequest) =>
    apiClient.put<Post>(`/posts/${id}`, data),

  deletePost: (id: number) =>
    apiClient.delete<Post>(`/posts/${id}`),
}
```

```typescript
// src/entities/comment/api/commentApi.ts
import { apiClient } from '@/shared/api/apiClient'
import type { Comment, CommentsResponse, CreateCommentRequest, UpdateCommentRequest } from '../model/types'

export const commentApi = {
  getComments: (postId: number) =>
    apiClient.get<CommentsResponse>(`/comments/post/${postId}`),

  createComment: (data: CreateCommentRequest) =>
    apiClient.post<Comment>('/comments/add', data),

  updateComment: (id: number, data: UpdateCommentRequest) =>
    apiClient.put<Comment>(`/comments/${id}`, data),

  deleteComment: (id: number) =>
    apiClient.delete<Comment>(`/comments/${id}`),

  likeComment: (id: number) =>
    apiClient.patch<Comment>(`/comments/${id}`, { likes: 1 }),
}
```

```typescript
// src/entities/user/api/userApi.ts
import { apiClient } from '@/shared/api/apiClient'
import type { User, UsersResponse } from '../model/types'

export const userApi = {
  getUsers: (params?: { limit?: number; select?: string }) =>
    apiClient.get<UsersResponse>('/users', { params }),

  getUser: (id: number) =>
    apiClient.get<User>(`/users/${id}`),
}
```

### 4. File Structure

```
src/
├── shared/
│   └── api/
│       ├── index.ts           # Barrel export
│       ├── apiClient.ts       # Base API client
│       ├── queryKeys.ts       # TanStack Query keys
│       └── types.ts           # Common API types
├── entities/
│   ├── post/
│   │   ├── api/
│   │   │   ├── index.ts       # Barrel export
│   │   │   ├── postApi.ts     # Post API functions
│   │   │   ├── usePosts.ts    # TanStack Query hooks
│   │   │   └── useSearchPosts.ts
│   │   └── model/
│   │       └── types.ts       # Post types
│   ├── comment/
│   │   ├── api/
│   │   │   ├── index.ts
│   │   │   ├── commentApi.ts
│   │   │   └── useComments.ts
│   │   └── model/
│   │       └── types.ts
│   └── user/
│       ├── api/
│       │   ├── index.ts
│       │   ├── userApi.ts
│       │   └── useUser.ts
│       └── model/
│           └── types.ts
```

### 5. Path Aliases Setup

```typescript
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/shared/*": ["src/shared/*"],
      "@/entities/*": ["src/entities/*"],
      "@/features/*": ["src/features/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/pages/*": ["src/pages/*"],
      "@/app/*": ["src/app/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

## Implementation Order

1. Setup path aliases in tsconfig and vite.config
2. Create shared/api/apiClient.ts
3. Create shared/api/types.ts for common types
4. Create entity-specific API modules
5. Create shared/api/queryKeys.ts
6. Create TanStack Query hooks for each entity
7. Replace all inline fetch calls with API modules

## Important Notes
- All API functions should be type-safe
- Use consistent error handling
- Keep API modules close to their entities (FSD principle)
- Export through barrel files (index.ts)
- Path aliases improve import readability

Now create the API layer with proper types and structure.
