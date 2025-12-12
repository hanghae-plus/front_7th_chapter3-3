# Zustand Advanced Patterns

## Selectors (Performance Optimization)

```typescript
// Define selectors outside component
const selectSearchQuery = (state: FilterState) => state.searchQuery
const selectSetSearchQuery = (state: FilterState) => state.setSearchQuery

// Use in component - only re-renders when selected value changes
function SearchBar() {
  const searchQuery = useFilterStore(selectSearchQuery)
  const setSearchQuery = useFilterStore(selectSetSearchQuery)

  return <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
}
```

## Shallow Comparison

```typescript
import { shallow } from 'zustand/shallow'

// Multiple values with shallow comparison
function Filters() {
  const { searchQuery, selectedTag } = useFilterStore(
    (state) => ({
      searchQuery: state.searchQuery,
      selectedTag: state.selectedTag,
    }),
    shallow
  )

  // Only re-renders when searchQuery OR selectedTag changes
}
```

## Computed/Derived State

```typescript
interface PaginationState {
  skip: number
  limit: number
  total: number

  // Computed getters (not stored, calculated on access)
  get currentPage(): number
  get totalPages(): number
  get hasNextPage(): boolean
  get hasPrevPage(): boolean
}

export const usePaginationStore = create<PaginationState>()(
  devtools(
    (set, get) => ({
      skip: 0,
      limit: 10,
      total: 0,

      get currentPage() {
        return Math.floor(get().skip / get().limit) + 1
      },
      get totalPages() {
        return Math.ceil(get().total / get().limit)
      },
      get hasNextPage() {
        return get().currentPage < get().totalPages
      },
      get hasPrevPage() {
        return get().skip > 0
      },

      // ... actions
    }),
    { name: 'pagination-store' }
  )
)
```

## Persist Middleware

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PreferencesState {
  theme: 'light' | 'dark'
  pageSize: number
  setTheme: (theme: 'light' | 'dark') => void
  setPageSize: (size: number) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'light',
      pageSize: 10,
      setTheme: (theme) => set({ theme }),
      setPageSize: (pageSize) => set({ pageSize }),
    }),
    {
      name: 'user-preferences', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        pageSize: state.pageSize,
      }), // Only persist these fields
    }
  )
)
```

## Immer Middleware (Immutable Updates)

```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface TodoState {
  todos: { id: number; text: string; done: boolean }[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],

    addTodo: (text) =>
      set((state) => {
        state.todos.push({ id: Date.now(), text, done: false })
      }),

    toggleTodo: (id) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id)
        if (todo) todo.done = !todo.done
      }),

    removeTodo: (id) =>
      set((state) => {
        const index = state.todos.findIndex((t) => t.id === id)
        if (index !== -1) state.todos.splice(index, 1)
      }),
  }))
)
```

## Combining Middlewares

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        // ... state and actions
      })),
      { name: 'store' }
    ),
    { name: 'store' }
  )
)
```

## Store Slices Pattern

```typescript
// Slice types
interface FilterSlice {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

interface PaginationSlice {
  skip: number
  limit: number
  setSkip: (skip: number) => void
}

// Slice creators
const createFilterSlice = (set: any): FilterSlice => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
})

const createPaginationSlice = (set: any): PaginationSlice => ({
  skip: 0,
  limit: 10,
  setSkip: (skip) => set({ skip }),
})

// Combined store
type StoreState = FilterSlice & PaginationSlice

export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      ...createFilterSlice(set),
      ...createPaginationSlice(set),
    }),
    { name: 'combined-store' }
  )
)
```

## Reset Store Pattern

```typescript
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

      // ... actions

      reset: () => set(initialState),

      // Partial reset
      resetSearch: () => set({ searchQuery: '' }),
      resetFilters: () => set({ selectedTag: '', sortBy: '', sortOrder: 'asc' }),
    }),
    { name: 'filter-store' }
  )
)
```

## Subscribe to Changes

```typescript
// Outside component - subscribe to store changes
const unsubscribe = useFilterStore.subscribe(
  (state) => state.searchQuery,
  (searchQuery, prevSearchQuery) => {
    console.log('Search changed:', prevSearchQuery, '->', searchQuery)
  }
)

// Cleanup
unsubscribe()
```

## Access Store Outside React

```typescript
// Get current state
const currentFilters = useFilterStore.getState()

// Set state
useFilterStore.setState({ searchQuery: 'new query' })

// Subscribe
useFilterStore.subscribe((state) => {
  console.log('State changed:', state)
})
```
