---
name: fsd-setup
description: Setup and configure FSD (Feature-Sliced Design) architecture for React projects. Use when initializing FSD folder structure, configuring path aliases, or planning layer organization.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# FSD Architecture Setup

Setup complete FSD (Feature-Sliced Design) folder structure for React/TypeScript projects.

## Quick Start

### 1. Create FSD Folder Structure

```bash
mkdir -p src/{app,pages,widgets,features,entities,shared}/{ui,api,model,lib}
```

### 2. Configure Path Aliases

**tsconfig.app.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      "@/pages/*": ["src/pages/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/features/*": ["src/features/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

**vite.config.ts:**
```typescript
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

## FSD Layer Structure

```
src/
├── app/              # App initialization layer
│   ├── providers/    # Context providers (Query, Router, Theme)
│   ├── styles/       # Global styles
│   └── index.tsx     # App entry composition
│
├── pages/            # Page layer (route components)
│   └── {page-name}/
│       ├── ui/       # Page components
│       └── index.ts  # Public API
│
├── widgets/          # Widget layer (complex UI blocks)
│   └── {widget-name}/
│       ├── ui/       # Widget components
│       ├── model/    # Widget state
│       └── index.ts  # Public API
│
├── features/         # Feature layer (user actions)
│   └── {feature-name}/
│       ├── ui/       # Feature UI (dialogs, forms)
│       ├── api/      # Mutations, feature-specific queries
│       ├── model/    # Feature state (stores)
│       └── index.ts  # Public API
│
├── entities/         # Entity layer (business objects)
│   └── {entity-name}/
│       ├── ui/       # Entity UI components
│       ├── api/      # Entity API, query hooks
│       ├── model/    # Types, entity logic
│       └── index.ts  # Public API
│
└── shared/           # Shared layer (infrastructure)
    ├── ui/           # UI kit components
    ├── api/          # API client, query keys
    ├── lib/          # Utilities, helpers
    ├── store/        # Shared stores
    └── index.ts      # Public API
```

## Layer Dependencies

**Rule:** Lower layers NEVER import from higher layers.

```
app     ← imports from all layers
  ↑
pages   ← widgets, features, entities, shared
  ↑
widgets ← features, entities, shared
  ↑
features ← entities, shared
  ↑
entities ← shared only
  ↑
shared  ← no internal imports
```

## Barrel Exports Pattern

Each slice should export through `index.ts`:

```typescript
// src/entities/post/index.ts
export type { Post, PostsResponse } from './model/types'
export { postApi } from './api/postApi'
export { usePosts } from './api/usePosts'
export { PostCard } from './ui/PostCard'
```

## Instructions

1. Create the folder structure using bash commands
2. Configure path aliases in tsconfig and vite.config
3. Move existing shared UI components to `src/shared/ui/`
4. Create barrel export files for each slice
5. Verify imports work with `pnpm dev`

## Checklist

- [ ] FSD folders created (app, pages, widgets, features, entities, shared)
- [ ] Path aliases configured in tsconfig.app.json
- [ ] Path aliases configured in vite.config.ts
- [ ] Shared UI components moved to src/shared/ui/
- [ ] Barrel exports created for each slice
