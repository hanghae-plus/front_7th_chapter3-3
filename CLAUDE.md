# Project Context for Claude

## Project Overview

This is a React/TypeScript learning project focused on refactoring a monolithic component into FSD (Feature-Sliced Design) architecture.

**Current State:** A single 708-line PostsManagerPage.tsx with 23 useState hooks and manual fetch calls.

**Target State:** Clean FSD architecture with Zustand for client state and TanStack Query for server state.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 (dev server, build)
- Zustand (client state management)
- TanStack Query (server state management)
- Radix UI (Dialog, Select components)
- Lucide React (icons)

## API

Using DummyJSON API (proxied to `/api` in development):
- Posts: `/api/posts`, `/api/posts/tags`, `/api/posts/search`
- Comments: `/api/comments/post/{id}`
- Users: `/api/users/{id}`

## Assignment Requirements

### Basic Assignment (기본과제)
1. Use global state management (Zustand) to separate concerns
2. Apply FSD folder structure
3. Minimize props drilling
4. Separate shared components and logic
5. Define types centered around entities
6. Separate entity UI and API
7. Separate features (user actions)
8. Create reusable widgets

### Advanced Assignment (심화과제)
1. Migrate all API calls to TanStack Query
2. Structure query keys properly
3. Implement optimistic updates
4. Handle loading/error states declaratively

## FSD Layer Structure

```
src/
├── app/          # Providers, routing, initialization
├── pages/        # Route pages (composition only)
├── widgets/      # Complex UI blocks (PostsTable, PostDetail)
├── features/     # User actions (add-post, edit-post, search)
├── entities/     # Domain objects (post, comment, user, tag)
└── shared/       # UI kit, API client, utilities
```

**Import Rule:** Lower layers NEVER import from higher layers.
```
app → pages → widgets → features → entities → shared
```

## Available Resources

### Skills (Auto-activated reference)
- `fsd-setup` - FSD folder structure and configuration
- `entity-generator` - Entity creation templates
- `feature-generator` - Feature creation templates
- `tanstack-query-setup` - Query/mutation patterns
- `zustand-setup` - Store patterns
- `type-generator` - TypeScript type patterns
- `code-quality` - Checklist and common issues
- `refactor-guide` - Step-by-step refactoring guide

### Agents (Auto-delegated for complex tasks)
- `fsd-architect` - Architecture planning
- `type-definer` - Type definitions
- `state-manager` - Zustand setup
- `tanstack-query-expert` - TanStack Query setup
- `api-organizer` - API layer organization
- `component-decomposer` - Component extraction
- `code-reviewer` - Code quality review
- `progress-checker` - Assignment progress check
- `entity-creator` - Create entity slices
- `feature-creator` - Create feature slices

### Commands (Manual invocation)
- `/fsd-plan` - Create FSD refactoring plan
- `/check-progress` - Check assignment progress
- `/define-types` - Generate type definitions
- `/setup-state` - Setup Zustand stores
- `/setup-tanstack-query` - Setup TanStack Query
- `/create-entity` - Create entity slice
- `/create-feature` - Create feature slice
- `/refactor-step` - Step-by-step guide
- `/quick-start` - Project overview

## Code Conventions

### File Naming
- Components: PascalCase (`PostCard.tsx`)
- Hooks: camelCase with `use` prefix (`usePosts.ts`)
- Stores: camelCase with `use` prefix (`useFilterStore.ts`)
- Types: PascalCase (`types.ts` containing `Post`, `Comment`)
- API: camelCase (`postApi.ts`)

### Barrel Exports
Every slice exports through `index.ts`:
```typescript
// src/entities/post/index.ts
export type { Post, PostsResponse } from './model/types'
export { postApi } from './api/postApi'
export { usePosts } from './api/usePosts'
export { PostCard } from './ui/PostCard'
```

### Import Paths
Use path aliases for clean imports:
```typescript
import { Button } from '@/shared/ui'
import { Post, usePosts } from '@/entities/post'
import { useAddPost } from '@/features/add-post'
```

## Current Progress Tracking

When working on this project:
1. Use TodoWrite to track tasks
2. Complete one step before moving to next
3. Run `pnpm dev` after major changes
4. Run `pnpm tsc --noEmit` to check types
5. Use `/check-progress` to verify completion

## Key Files to Know

- `src/pages/PostsManagerPage.tsx` - Main file to refactor (708 lines)
- `src/components/index.tsx` - UI components to move to shared/
- `vite.config.ts` - API proxy configuration
- `tsconfig.app.json` - TypeScript path aliases

## Domain Entities

### Post
```typescript
interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
}
```

### Comment
```typescript
interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: { id: number; username: string; fullName: string }
}
```

### User
```typescript
interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  phone: string
  address: { address: string; city: string; state: string }
  company: { name: string; title: string; department: string }
}
```

## State Classification

| Type | Storage | Examples |
|------|---------|----------|
| Server State | TanStack Query | posts, comments, users, tags |
| Client State | Zustand | filters, pagination, UI state |
| Local State | useState | form inputs, temporary values |

## Common Patterns

### Query Hook
```typescript
export function usePosts(params: { skip: number; limit: number }) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => postApi.getPosts(params),
  })
}
```

### Mutation Hook
```typescript
export function useAddPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

### Zustand Store
```typescript
export const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    searchQuery: '',
    setSearchQuery: (searchQuery) => set({ searchQuery }),
  }))
)
```

## Reminders

- Always check types before committing
- Keep components under 100 lines
- Use stores for shared state, not prop drilling
- Server data belongs in TanStack Query, not Zustand
- Each slice should have single responsibility
- Export only public API through index.ts
