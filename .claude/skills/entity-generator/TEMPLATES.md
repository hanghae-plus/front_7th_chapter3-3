# Entity Templates

## Post Entity

### model/types.ts
```typescript
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
```

### api/postApi.ts
```typescript
import { apiClient } from '@/shared/api'
import type { Post, PostsResponse, CreatePostRequest, UpdatePostRequest } from '../model/types'

export const postApi = {
  getPosts: (params: { limit: number; skip: number }) =>
    apiClient.get<PostsResponse>('/posts', { params }),

  getPostsByTag: (tag: string) =>
    apiClient.get<PostsResponse>(`/posts/tag/${tag}`),

  searchPosts: (query: string) =>
    apiClient.get<PostsResponse>('/posts/search', { params: { q: query } }),

  createPost: (data: CreatePostRequest) =>
    apiClient.post<Post>('/posts/add', data),

  updatePost: (id: number, data: UpdatePostRequest) =>
    apiClient.put<Post>(`/posts/${id}`, data),

  deletePost: (id: number) =>
    apiClient.delete<Post>(`/posts/${id}`),
}
```

### api/usePosts.ts
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

export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: queryKeys.posts.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: query.length > 0,
  })
}

export function usePostsByTag(tag: string) {
  return useQuery({
    queryKey: queryKeys.posts.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: tag.length > 0,
  })
}
```

### ui/PostCard.tsx
```typescript
import type { PostWithAuthor } from '../model/types'

interface PostCardProps {
  post: PostWithAuthor
  onClick?: () => void
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.body}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {post.author && (
            <>
              <img
                src={post.author.image}
                alt={post.author.username}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-500">{post.author.username}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>👍 {post.reactions.likes}</span>
          <span>👀 {post.views}</span>
        </div>
      </div>
    </div>
  )
}
```

### ui/PostTableRow.tsx
```typescript
import { TableRow, TableCell } from '@/shared/ui'
import { Edit, Trash2, MessageSquare } from 'lucide-react'
import type { PostWithAuthor } from '../model/types'

interface PostTableRowProps {
  post: PostWithAuthor
  onEdit: () => void
  onDelete: () => void
  onViewDetail: () => void
  onViewUser: () => void
}

export function PostTableRow({
  post,
  onEdit,
  onDelete,
  onViewDetail,
  onViewUser,
}: PostTableRowProps) {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <span
          className="cursor-pointer hover:underline"
          onClick={onViewDetail}
        >
          {post.title}
        </span>
      </TableCell>
      <TableCell>
        <span
          className="cursor-pointer hover:underline"
          onClick={onViewUser}
        >
          {post.author?.username}
        </span>
      </TableCell>
      <TableCell>👍 {post.reactions.likes}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button onClick={onViewDetail}>
            <MessageSquare className="w-4 h-4" />
          </button>
          <button onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}
```

### index.ts
```typescript
// Types
export type {
  Post,
  PostWithAuthor,
  PostsResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from './model/types'

// API
export { postApi } from './api/postApi'
export { usePosts, useSearchPosts, usePostsByTag } from './api/usePosts'

// UI
export { PostCard } from './ui/PostCard'
export { PostTableRow } from './ui/PostTableRow'
```

---

## Comment Entity

### model/types.ts
```typescript
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

### api/commentApi.ts
```typescript
import { apiClient } from '@/shared/api'
import type { Comment, CommentsResponse, CreateCommentRequest, UpdateCommentRequest } from '../model/types'

export const commentApi = {
  getByPostId: (postId: number) =>
    apiClient.get<CommentsResponse>(`/comments/post/${postId}`),

  create: (data: CreateCommentRequest) =>
    apiClient.post<Comment>('/comments/add', data),

  update: (id: number, data: UpdateCommentRequest) =>
    apiClient.put<Comment>(`/comments/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<Comment>(`/comments/${id}`),

  like: (id: number) =>
    apiClient.patch<Comment>(`/comments/${id}`, { likes: 1 }),
}
```

### ui/CommentItem.tsx
```typescript
import { ThumbsUp, Edit, Trash2 } from 'lucide-react'
import type { Comment } from '../model/types'

interface CommentItemProps {
  comment: Comment
  onLike: () => void
  onEdit: () => void
  onDelete: () => void
}

export function CommentItem({ comment, onLike, onEdit, onDelete }: CommentItemProps) {
  return (
    <div className="p-3 border-b last:border-b-0">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-medium text-sm">{comment.user.username}</span>
          <p className="text-gray-700 mt-1">{comment.body}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onLike} className="flex items-center gap-1 text-sm">
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes}</span>
          </button>
          <button onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## User Entity

### model/types.ts
```typescript
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
    department: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
```

### ui/UserAvatar.tsx
```typescript
import type { User } from '../model/types'

interface UserAvatarProps {
  user: Pick<User, 'username' | 'image'>
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function UserAvatar({ user, size = 'md', onClick }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={onClick}
    >
      <img
        src={user.image}
        alt={user.username}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      <span className="text-sm">{user.username}</span>
    </div>
  )
}
```

---

## Tag Entity

### model/types.ts
```typescript
export type Tag = string

export interface TagsResponse {
  tags: Tag[]
}
```

### api/tagApi.ts
```typescript
import { apiClient } from '@/shared/api'

export const tagApi = {
  getAll: () => apiClient.get<string[]>('/posts/tags'),
}
```

### api/useTags.ts
```typescript
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { tagApi } from './tagApi'

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: tagApi.getAll,
  })
}
```
