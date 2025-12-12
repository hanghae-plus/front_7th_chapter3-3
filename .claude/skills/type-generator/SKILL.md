---
name: type-generator
description: Generate TypeScript type definitions for domain entities, API responses, and UI state. Use when defining types for Post, Comment, User, Tag entities or any data structures.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# TypeScript Type Generator

Generate comprehensive TypeScript type definitions for FSD architecture.

## Quick Start

### Entity Types Location
```
src/entities/{entity}/model/types.ts
```

### Shared Types Location
```
src/shared/api/types.ts
```

## Type Categories

1. **Entity Types** - Domain objects (Post, Comment, User)
2. **API Types** - Request/Response types
3. **UI Types** - Form data, filter state
4. **Utility Types** - Generic helpers

## Instructions

1. Analyze API responses from DummyJSON
2. Create entity types matching API structure
3. Create request/response wrapper types
4. Add form and UI state types
5. Export through barrel files

See [TYPES.md](TYPES.md) for complete type definitions.

## Type Patterns

See [PATTERNS.md](PATTERNS.md) for advanced TypeScript patterns.
