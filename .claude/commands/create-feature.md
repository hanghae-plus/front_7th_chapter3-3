# Feature Creation Agent

You are an FSD architecture expert. Your task is to create a complete feature structure for user actions/events.

## Usage
When user runs this command, ask them which feature to create:
- add-post (Create new post)
- edit-post (Edit existing post)
- delete-post (Delete post)
- post-search (Search posts)
- post-filter (Filter posts by tag/sort)
- add-comment (Create new comment)
- edit-comment (Edit existing comment)
- delete-comment (Delete comment)
- like-comment (Like a comment)
- pagination (Page navigation)
- (or custom feature name)

## Feature Structure Template

For each feature, create the following structure:

```
src/features/{feature-name}/
├── index.ts              # Public API (barrel export)
├── model/
│   ├── types.ts          # Feature-specific types
│   ├── store.ts          # Feature state (if needed, using Zustand)
│   └── index.ts          # Model exports
├── api/
│   ├── use{Feature}.ts   # Mutation hook for the feature
│   └── index.ts          # API exports
├── ui/
│   ├── {Feature}Button.tsx    # Trigger component
│   ├── {Feature}Dialog.tsx    # Dialog/form component
│   └── index.ts               # UI exports
└── lib/
    ├── helpers.ts        # Feature-specific utilities
    └── index.ts          # Lib exports
```

## Templates by Feature Type

### CRUD Feature (add-post, edit-post, etc.)

**ui/{Feature}Dialog.tsx**
```typescript
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui'
import { Button, Input, Textarea } from '@/shared/ui'
import { use{Feature} } from '../api/use{Feature}'

interface {Feature}DialogProps {
  open: boolean
  onClose: () => void
  // For edit: initialData?: EntityType
}

export function {Feature}Dialog({ open, onClose }: {Feature}DialogProps) {
  const [formData, setFormData] = useState({ /* initial form state */ })
  const { mutate, isPending } = use{Feature}()

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        onClose()
        // Reset form
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feature Title</DialogTitle>
        </DialogHeader>
        {/* Form fields */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**api/use{Feature}.ts**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { entityApi } from '@/entities/entity'

export function use{Feature}() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RequestType) => entityApi.method(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.entity.all })
    },
  })
}
```

### Filter/Search Feature

**ui/PostSearchBar.tsx**
```typescript
import { useState } from 'react'
import { Input, Button } from '@/shared/ui'
import { Search } from 'lucide-react'

interface PostSearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
}

export function PostSearchBar({ onSearch, initialValue = '' }: PostSearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button onClick={handleSearch}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  )
}
```

**model/store.ts (using Zustand)**
```typescript
import { create } from 'zustand'

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

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedTag: '',
  sortBy: '',
  sortOrder: 'asc',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  reset: () => set({ searchQuery: '', selectedTag: '', sortBy: '', sortOrder: 'asc' }),
}))
```

### Pagination Feature

**ui/Pagination.tsx**
```typescript
import { Button, Select } from '@/shared/ui'

interface PaginationProps {
  skip: number
  limit: number
  total: number
  onSkipChange: (skip: number) => void
  onLimitChange: (limit: number) => void
}

export function Pagination({ skip, limit, total, onSkipChange, onLimitChange }: PaginationProps) {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>Show:</span>
        <Select value={String(limit)} onValueChange={(v) => onLimitChange(Number(v))}>
          {[10, 20, 30].map((n) => (
            <SelectItem key={n} value={String(n)}>{n}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => onSkipChange(skip - limit)}
        >
          Previous
        </Button>
        <span>{currentPage} / {totalPages}</span>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => onSkipChange(skip + limit)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

### Optimistic Update Feature (like-comment)

**api/useLikeComment.ts**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { commentApi, type Comment, type CommentsResponse } from '@/entities/comment'

interface LikeCommentParams {
  commentId: number
  postId: number
}

export function useLikeComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId }: LikeCommentParams) =>
      commentApi.like(commentId),

    onMutate: async ({ commentId, postId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })

      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId)
      )

      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId),
        (old) => old ? {
          ...old,
          comments: old.comments.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          ),
        } : old
      )

      return { previousData }
    },

    onError: (_, { postId }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(postId),
          context.previousData
        )
      }
    },

    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })
    },
  })
}
```

## Instructions

1. Ask user which feature to create
2. Determine feature type (CRUD, filter, pagination, optimistic update)
3. Create all files following appropriate template
4. Connect to relevant entities
5. Ensure proper TypeScript typing
6. Export through barrel file

Now ask the user which feature they want to create.
