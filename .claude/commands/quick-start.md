# Quick Start Guide

You are a helpful onboarding assistant. Your task is to help the user understand and start the refactoring project.

## Project Overview

This is a React + TypeScript project that needs to be refactored from a monolithic structure to FSD (Feature-Sliced Design) architecture.

### Current State
- Single monolithic component: `src/pages/PostsManagerPage.tsx` (708 lines)
- No state management library
- Manual fetch calls with useState
- Minimal TypeScript types
- No architectural pattern

### Target State
- FSD architecture with proper layer separation
- Zustand for client state management
- TanStack Query for server state management
- Full TypeScript coverage
- Clean, maintainable code structure

## Available Commands

Here are the slash commands available to help with this project:

### Planning & Analysis
| Command | Description |
|---------|-------------|
| `/fsd-plan` | Create a detailed FSD refactoring plan |
| `/check-progress` | Check progress against assignment checklist |
| `/review-fsd` | Review current code for FSD compliance |

### Implementation
| Command | Description |
|---------|-------------|
| `/define-types` | Create TypeScript type definitions |
| `/setup-state` | Setup Zustand state management |
| `/setup-tanstack-query` | Setup TanStack Query |
| `/setup-api-layer` | Create organized API layer |
| `/decompose-component` | Break down large components |

### Creation Helpers
| Command | Description |
|---------|-------------|
| `/create-entity` | Create a new entity with full structure |
| `/create-feature` | Create a new feature with full structure |
| `/refactor-step` | Step-by-step refactoring guide |

### Utilities
| Command | Description |
|---------|-------------|
| `/fix-types` | Find and fix TypeScript errors |

## Recommended Workflow

### Phase 1: Basic Assignment (State Management + FSD)

1. **Start Planning**
   ```
   /fsd-plan
   ```
   Get a detailed plan for the refactoring

2. **Setup Foundation**
   ```
   /refactor-step
   ```
   Follow step-by-step instructions

3. **Define Types**
   ```
   /define-types
   ```
   Create all necessary TypeScript types

4. **Setup State Management**
   ```
   /setup-state
   ```
   Configure Zustand stores

5. **Create Entities**
   ```
   /create-entity
   ```
   Create Post, Comment, User, Tag entities

6. **Create Features**
   ```
   /create-feature
   ```
   Create CRUD and filter features

7. **Decompose Components**
   ```
   /decompose-component
   ```
   Break down PostsManagerPage

8. **Check Progress**
   ```
   /check-progress
   ```
   Verify all basic requirements are met

### Phase 2: Advanced Assignment (TanStack Query)

9. **Setup TanStack Query**
    ```
    /setup-tanstack-query
    ```
    Configure queries and mutations

10. **Setup API Layer**
    ```
    /setup-api-layer
    ```
    Organize API calls

11. **Final Review**
    ```
    /review-fsd
    /check-progress
    ```
    Ensure everything is properly structured

## Quick Tips

1. **Don't skip types** - Define types first, they help catch errors early
2. **Small steps** - Complete one step fully before moving to the next
3. **Test frequently** - Run `pnpm dev` after each major change
4. **Use `/check-progress`** - Track what's done and what's left
5. **Fix TypeScript errors** - Use `/fix-types` when you see red squiggles

## Getting Started

Ready to begin? Start with:
```
/fsd-plan
```

This will analyze your codebase and create a detailed refactoring plan.

Or if you want to jump right in:
```
/refactor-step
```

This will guide you through each step of the refactoring process.

Good luck with your assignment!
