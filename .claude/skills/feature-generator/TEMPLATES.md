# Feature Templates

## CRUD Feature: add-post

### api/useAddPost.ts
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

### ui/AddPostDialog.tsx
```typescript
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
} from '@/shared/ui'
import { useAddPost } from '../api/useAddPost'
import type { CreatePostRequest } from '@/entities/post'

interface AddPostDialogProps {
  open: boolean
  onClose: () => void
}

export function AddPostDialog({ open, onClose }: AddPostDialogProps) {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: '',
    body: '',
    userId: 1,
  })

  const { mutate, isPending } = useAddPost()

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        onClose()
        setFormData({ title: '', body: '', userId: 1 })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Body"
            rows={4}
            value={formData.body}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, body: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### index.ts
```typescript
export { useAddPost } from './api/useAddPost'
export { AddPostDialog } from './ui/AddPostDialog'
```

---

## CRUD Feature: edit-post

### api/useUpdatePost.ts
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { postApi, type UpdatePostRequest } from '@/entities/post'

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

### ui/EditPostDialog.tsx
```typescript
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
} from '@/shared/ui'
import { useUpdatePost } from '../api/useUpdatePost'
import type { Post } from '@/entities/post'

interface EditPostDialogProps {
  open: boolean
  post: Post | null
  onClose: () => void
}

export function EditPostDialog({ open, post, onClose }: EditPostDialogProps) {
  const [formData, setFormData] = useState({ title: '', body: '' })
  const { mutate, isPending } = useUpdatePost()

  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, body: post.body })
    }
  }, [post])

  const handleSubmit = () => {
    if (!post) return
    mutate(
      { id: post.id, data: formData },
      { onSuccess: onClose }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Body"
            rows={4}
            value={formData.body}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, body: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## CRUD Feature: delete-post

### api/useDeletePost.ts
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { postApi } from '@/entities/post'

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

---

## Filter Feature: post-filter

### model/store.ts
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  reset: () => void
}

const initialState = {
  searchQuery: '',
  selectedTag: '',
  sortBy: '',
  sortOrder: 'asc' as const,
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      ...initialState,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      reset: () => set(initialState),
    }),
    { name: 'filter-store' }
  )
)
```

### ui/PostFilters.tsx
```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'
import { useTags } from '@/entities/tag'
import { useFilterStore } from '../model/store'

export function PostFilters() {
  const { selectedTag, sortBy, sortOrder, setSelectedTag, setSortBy, setSortOrder } =
    useFilterStore()
  const { data: tags = [] } = useTags()

  return (
    <div className="flex gap-4">
      <Select value={selectedTag} onValueChange={setSelectedTag}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="reactions">Reactions</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(v) => setSortOrder(v as 'asc' | 'desc')}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
```

---

## Filter Feature: post-search

### ui/PostSearchBar.tsx
```typescript
import { useState } from 'react'
import { Input, Button } from '@/shared/ui'
import { Search } from 'lucide-react'
import { useFilterStore } from '@/features/post-filter'

export function PostSearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = () => {
    setSearchQuery(localQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search posts..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-64"
      />
      <Button onClick={handleSearch}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  )
}
```

---

## Pagination Feature

### model/store.ts
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface PaginationState {
  skip: number
  limit: number

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  reset: () => void
}

export const usePaginationStore = create<PaginationState>()(
  devtools(
    (set, get) => ({
      skip: 0,
      limit: 10,

      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit, skip: 0 }),
      nextPage: () => set((state) => ({ skip: state.skip + state.limit })),
      prevPage: () =>
        set((state) => ({ skip: Math.max(0, state.skip - state.limit) })),
      reset: () => set({ skip: 0, limit: 10 }),
    }),
    { name: 'pagination-store' }
  )
)
```

### ui/Pagination.tsx
```typescript
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'
import { usePaginationStore } from '../model/store'

interface PaginationProps {
  total: number
}

export function Pagination({ total }: PaginationProps) {
  const { skip, limit, setLimit, nextPage, prevPage } = usePaginationStore()

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show:</span>
        <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={skip === 0}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

---

## Optimistic Update Feature: like-comment

### api/useLikeComment.ts
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { commentApi, type CommentsResponse } from '@/entities/comment'

interface LikeParams {
  commentId: number
  postId: number
}

export function useLikeComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId }: LikeParams) => commentApi.like(commentId),

    onMutate: async ({ commentId, postId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })

      // Snapshot previous value
      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId)
      )

      // Optimistically update
      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId),
        (old) =>
          old
            ? {
                ...old,
                comments: old.comments.map((c) =>
                  c.id === commentId ? { ...c, likes: c.likes + 1 } : c
                ),
              }
            : old
      )

      return { previousData }
    },

    onError: (_, { postId }, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(postId),
          context.previousData
        )
      }
    },

    onSettled: (_, __, { postId }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })
    },
  })
}
```

### ui/LikeButton.tsx
```typescript
import { ThumbsUp } from 'lucide-react'
import { Button } from '@/shared/ui'
import { useLikeComment } from '../api/useLikeComment'

interface LikeButtonProps {
  commentId: number
  postId: number
  likes: number
}

export function LikeButton({ commentId, postId, likes }: LikeButtonProps) {
  const { mutate, isPending } = useLikeComment()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => mutate({ commentId, postId })}
      disabled={isPending}
    >
      <ThumbsUp className="w-4 h-4 mr-1" />
      {likes}
    </Button>
  )
}
```
