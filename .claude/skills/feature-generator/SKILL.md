---
name: feature-generator
description: Generate complete FSD feature slices for user actions like CRUD operations, search, filter, pagination, or optimistic updates. Use when creating new features or extracting user actions from components.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Feature Generator

Generate complete FSD feature structures for user actions and business logic.

## Quick Start

Available features to generate:
- `add-post` - Create new post
- `edit-post` - Edit existing post
- `delete-post` - Delete post
- `post-search` - Search functionality
- `post-filter` - Tag and sort filtering
- `add-comment` - Create comment
- `edit-comment` - Edit comment
- `delete-comment` - Delete comment
- `like-comment` - Like with optimistic update
- `pagination` - Page navigation

## Feature Structure

```
src/features/{feature-name}/
├── index.ts              # Public API
├── model/
│   ├── types.ts          # Feature types
│   ├── store.ts          # Zustand store (if needed)
│   └── index.ts
├── api/
│   ├── use{Feature}.ts   # Mutation hook
│   └── index.ts
├── ui/
│   ├── {Feature}Dialog.tsx
│   ├── {Feature}Button.tsx
│   └── index.ts
└── lib/
    └── index.ts
```

## Feature Types

1. **CRUD Features** - add-post, edit-post, delete-post
2. **Filter Features** - post-filter, post-search
3. **Pagination Feature** - pagination
4. **Optimistic Update Features** - like-comment

## Instructions

1. Identify feature type
2. Create folder structure
3. Generate mutation hook or store
4. Create UI components
5. Setup barrel exports

See [TEMPLATES.md](TEMPLATES.md) for complete code templates.
