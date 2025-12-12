---
name: tanstack-query-setup
description: Setup and configure TanStack Query (React Query) for server state management. Use when installing, configuring QueryProvider, creating query hooks, or implementing optimistic updates.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# TanStack Query Setup

Setup complete TanStack Query configuration for React applications.

## Quick Start

### 1. Install Dependencies

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Create QueryProvider

```typescript
// src/app/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,      // 1 minute
      gcTime: 1000 * 60 * 5,     // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 3. Wrap App

```typescript
// src/main.tsx
import { QueryProvider } from '@/app/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
)
```

### 4. Create Query Keys

```typescript
// src/shared/api/queryKeys.ts
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: (params: { skip: number; limit: number }) =>
      ['posts', 'list', params] as const,
    search: (query: string) =>
      ['posts', 'search', query] as const,
    byTag: (tag: string) =>
      ['posts', 'tag', tag] as const,
    detail: (id: number) =>
      ['posts', 'detail', id] as const,
  },
  comments: {
    all: ['comments'] as const,
    byPost: (postId: number) =>
      ['comments', 'post', postId] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: number) =>
      ['users', 'detail', id] as const,
  },
  tags: {
    all: ['tags'] as const,
  },
}
```

## Hook Patterns

See [HOOKS.md](HOOKS.md) for query and mutation hook templates.

## Optimistic Updates

See [OPTIMISTIC.md](OPTIMISTIC.md) for optimistic update patterns.

## Checklist

- [ ] Dependencies installed
- [ ] QueryProvider created
- [ ] App wrapped with QueryProvider
- [ ] Query keys defined
- [ ] DevTools visible in browser
