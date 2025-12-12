# State Management Setup Agent

You are a React state management expert. Your task is to introduce global state management to this project.

## Tasks to Perform

### 1. Analyze Current State
Analyze and classify the 23 useState hooks in `src/pages/PostsManagerPage.tsx`:

**Server State** (To be managed by TanStack Query):
- posts, comments, tags, selectedUser, total

**Client State** (Global state management):
- Filter state: searchQuery, selectedTag, sortBy, sortOrder
- Pagination: skip, limit
- UI state: modal open/close states

**Local State** (Component internal):
- Form data: newPost, newComment
- Selected items: selectedPost, selectedComment

### 2. State Management Library Selection
Ask user to choose:
- **Zustand**: Simple with minimal boilerplate
- **Jotai**: Atomic state management, React-friendly
- **Context API**: No additional installation required

### 3. Store Structure Design

```typescript
// Zustand example
interface FilterStore {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  resetFilters: () => void
}

interface UIStore {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean

  openAddDialog: () => void
  closeAddDialog: () => void
  openEditDialog: () => void
  closeEditDialog: () => void
  // ... other actions
}

interface PaginationStore {
  skip: number
  limit: number

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  resetPagination: () => void
}
```

### 4. File Structure
```
src/
├── shared/
│   └── store/
│       ├── index.ts
│       ├── useFilterStore.ts
│       ├── useUIStore.ts
│       └── usePaginationStore.ts
```

Or with FSD structure:
```
src/
├── features/
│   ├── post-filter/
│   │   └── model/
│   │       └── store.ts
│   └── pagination/
│       └── model/
│           └── store.ts
├── shared/
│   └── ui/
│       └── store/
│           └── useUIStore.ts
```

### 5. Solve Props Drilling
- Access filter-related props directly from store
- Manage modal state globally
- Share pagination state across components

## Implementation Order

1. Install state management library (recommend zustand)
2. Create store files
3. Migrate existing useState to stores
4. Use store hooks in components
5. Remove props drilling

## Important Notes
- Do NOT handle server state at this stage (handled by TanStack Query)
- Gradual migration (don't change all states at once)
- Ensure type safety
- Keep stores focused and small (single responsibility)

Now set up state management. First, ask which library the user wants to use.
