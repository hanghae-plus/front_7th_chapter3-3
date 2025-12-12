---
name: entity-generator
description: Generate complete FSD entity slices with types, API, UI components, and exports. Use when creating Post, Comment, User, Tag entities or any new business domain object.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Entity Generator

Generate complete FSD entity structures with all required files.

## Quick Start

To create an entity, specify the entity name:
- `post` - Blog post entity
- `comment` - Comment entity
- `user` - User entity
- `tag` - Tag entity

## Entity Structure

```
src/entities/{entity}/
├── index.ts              # Public API
├── model/
│   ├── types.ts          # TypeScript types
│   └── index.ts
├── api/
│   ├── {entity}Api.ts    # API functions
│   ├── use{Entity}.ts    # Query hooks
│   └── index.ts
├── ui/
│   ├── {Entity}Card.tsx  # Card component
│   ├── {Entity}Item.tsx  # List item
│   └── index.ts
└── lib/
    └── index.ts
```

## Instructions

1. Create entity folder structure
2. Generate types from DummyJSON API response
3. Create API functions
4. Create TanStack Query hooks
5. Create UI components
6. Setup barrel exports

## Entity Templates

See [TEMPLATES.md](TEMPLATES.md) for complete code templates.

## DummyJSON API Reference

See [API.md](API.md) for endpoint details and response types.
