# Zustand Store Templates

## Filter Store

```typescript
// src/features/post-filter/model/store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {
  // State
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'

  // Actions
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

---

## Pagination Store

```typescript
// src/features/pagination/model/store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface PaginationState {
  // State
  skip: number
  limit: number

  // Actions
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  reset: () => void
}

export const usePaginationStore = create<PaginationState>()(
  devtools(
    (set, get) => ({
      skip: 0,
      limit: 10,

      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit, skip: 0 }), // Reset skip when limit changes
      nextPage: () => set((state) => ({ skip: state.skip + state.limit })),
      prevPage: () => set((state) => ({ skip: Math.max(0, state.skip - state.limit) })),
      goToPage: (page) => set((state) => ({ skip: (page - 1) * state.limit })),
      reset: () => set({ skip: 0, limit: 10 }),
    }),
    { name: 'pagination-store' }
  )
)

// Derived state helper
export const usePaginationHelpers = () => {
  const { skip, limit } = usePaginationStore()

  return {
    currentPage: Math.floor(skip / limit) + 1,
    getTotalPages: (total: number) => Math.ceil(total / limit),
  }
}
```

---

## UI Store (Dialog/Modal State)

```typescript
// src/shared/store/useUIStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Post } from '@/entities/post'
import type { Comment } from '@/entities/comment'

interface UIState {
  // Dialog states
  showAddPostDialog: boolean
  showEditPostDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean

  // Selected items
  selectedPost: Post | null
  selectedComment: Comment | null
  selectedUserId: number | null

  // Actions - Post dialogs
  openAddPostDialog: () => void
  closeAddPostDialog: () => void
  openEditPostDialog: (post: Post) => void
  closeEditPostDialog: () => void
  openPostDetail: (post: Post) => void
  closePostDetail: () => void

  // Actions - Comment dialogs
  openAddCommentDialog: (post: Post) => void
  closeAddCommentDialog: () => void
  openEditCommentDialog: (comment: Comment) => void
  closeEditCommentDialog: () => void

  // Actions - User modal
  openUserModal: (userId: number) => void
  closeUserModal: () => void

  // Reset all
  closeAll: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      showAddPostDialog: false,
      showEditPostDialog: false,
      showPostDetailDialog: false,
      showAddCommentDialog: false,
      showEditCommentDialog: false,
      showUserModal: false,
      selectedPost: null,
      selectedComment: null,
      selectedUserId: null,

      // Post dialog actions
      openAddPostDialog: () => set({ showAddPostDialog: true }),
      closeAddPostDialog: () => set({ showAddPostDialog: false }),
      openEditPostDialog: (post) => set({ showEditPostDialog: true, selectedPost: post }),
      closeEditPostDialog: () => set({ showEditPostDialog: false, selectedPost: null }),
      openPostDetail: (post) => set({ showPostDetailDialog: true, selectedPost: post }),
      closePostDetail: () => set({ showPostDetailDialog: false, selectedPost: null }),

      // Comment dialog actions
      openAddCommentDialog: (post) => set({ showAddCommentDialog: true, selectedPost: post }),
      closeAddCommentDialog: () => set({ showAddCommentDialog: false }),
      openEditCommentDialog: (comment) => set({ showEditCommentDialog: true, selectedComment: comment }),
      closeEditCommentDialog: () => set({ showEditCommentDialog: false, selectedComment: null }),

      // User modal actions
      openUserModal: (userId) => set({ showUserModal: true, selectedUserId: userId }),
      closeUserModal: () => set({ showUserModal: false, selectedUserId: null }),

      // Reset all
      closeAll: () => set({
        showAddPostDialog: false,
        showEditPostDialog: false,
        showPostDetailDialog: false,
        showAddCommentDialog: false,
        showEditCommentDialog: false,
        showUserModal: false,
        selectedPost: null,
        selectedComment: null,
        selectedUserId: null,
      }),
    }),
    { name: 'ui-store' }
  )
)
```

---

## Selection Store

```typescript
// src/shared/store/useSelectionStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SelectionState<T> {
  selected: T[]
  isSelected: (item: T) => boolean
  select: (item: T) => void
  deselect: (item: T) => void
  toggle: (item: T) => void
  selectAll: (items: T[]) => void
  clearSelection: () => void
}

// Generic selection store factory
export function createSelectionStore<T extends { id: number }>() {
  return create<SelectionState<T>>()(
    devtools(
      (set, get) => ({
        selected: [],

        isSelected: (item) => get().selected.some((s) => s.id === item.id),

        select: (item) =>
          set((state) => ({
            selected: state.selected.some((s) => s.id === item.id)
              ? state.selected
              : [...state.selected, item],
          })),

        deselect: (item) =>
          set((state) => ({
            selected: state.selected.filter((s) => s.id !== item.id),
          })),

        toggle: (item) => {
          const { isSelected, select, deselect } = get()
          if (isSelected(item)) {
            deselect(item)
          } else {
            select(item)
          }
        },

        selectAll: (items) => set({ selected: items }),

        clearSelection: () => set({ selected: [] }),
      }),
      { name: 'selection-store' }
    )
  )
}

// Usage
// export const usePostSelectionStore = createSelectionStore<Post>()
```

---

## Barrel Export

```typescript
// src/shared/store/index.ts
export { useFilterStore } from '@/features/post-filter/model/store'
export { usePaginationStore, usePaginationHelpers } from '@/features/pagination/model/store'
export { useUIStore } from './useUIStore'
```
