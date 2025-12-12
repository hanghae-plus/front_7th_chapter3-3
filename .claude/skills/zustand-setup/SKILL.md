---
name: zustand-setup
description: Setup and configure Zustand for client state management. Use when creating stores for filters, pagination, UI state, or any client-side state that needs to be shared across components.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Zustand Setup

Setup Zustand stores for client state management in React applications.

## Quick Start

### 1. Install Zustand

```bash
pnpm add zustand
```

### 2. Create Store

```typescript
// src/shared/store/useFilterStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {
  searchQuery: string
  selectedTag: string

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      searchQuery: '',
      selectedTag: '',

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      reset: () => set({ searchQuery: '', selectedTag: '' }),
    }),
    { name: 'filter-store' }
  )
)
```

### 3. Use in Components

```typescript
function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore()

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}
```

## State Classification

| Type | Storage | Examples |
|------|---------|----------|
| Server State | TanStack Query | posts, comments, users |
| Client State | Zustand | filters, pagination, UI |
| Local State | useState | form inputs, toggle |

## Store Templates

See [STORES.md](STORES.md) for complete store templates.

## Best Practices

See [PATTERNS.md](PATTERNS.md) for advanced patterns.

## Checklist

- [ ] Zustand installed
- [ ] Stores created with TypeScript
- [ ] DevTools enabled
- [ ] Server state NOT in Zustand
