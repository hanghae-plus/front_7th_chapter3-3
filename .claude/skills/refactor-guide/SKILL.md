---
name: refactor-guide
description: Step-by-step guide for refactoring the PostsManagerPage component to FSD architecture. Use when starting the refactoring process or when stuck on a specific step.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Refactoring Guide

Complete step-by-step guide for refactoring PostsManagerPage.tsx (708 lines) to FSD architecture.

## Overview

Transform a monolithic 708-line component into a clean FSD architecture with:
- 4 entities (Post, Comment, User, Tag)
- 10 features (CRUD, search, filter, pagination)
- 3 widgets (PostsTable, PostDetail, UserProfile)
- 1 page (PostsManagerPage - composition only)

## Quick Start

1. Start with Step 1 (Foundation)
2. Complete each step before moving on
3. Test after each major change
4. Use `/check-progress` to verify

## Steps

See [STEPS.md](STEPS.md) for detailed step-by-step instructions.

## Migration Order

```
1. Foundation (deps, aliases, folders)
        ↓
2. Types (entity types)
        ↓
3. Shared (UI, API client)
        ↓
4. Entities (types, API, UI)
        ↓
5. State (Zustand stores)
        ↓
6. TanStack Query (hooks)
        ↓
7. Features (mutations, dialogs)
        ↓
8. Widgets (composition)
        ↓
9. Page (final composition)
```

## Time Estimate

- Steps 1-3: Setup foundation
- Steps 4-6: Core infrastructure
- Steps 7-8: Feature extraction
- Step 9: Final assembly

## Checklist

- [ ] Step 1: Foundation setup
- [ ] Step 2: Types defined
- [ ] Step 3: Shared layer ready
- [ ] Step 4: Entities created
- [ ] Step 5: Zustand stores ready
- [ ] Step 6: TanStack Query hooks
- [ ] Step 7: Features extracted
- [ ] Step 8: Widgets composed
- [ ] Step 9: Page simplified
