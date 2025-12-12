---
name: code-quality
description: Check code quality, FSD compliance, TypeScript errors, and assignment progress. Use when reviewing code, checking for issues, or verifying assignment completion status.
allowed-tools: Read, Bash, Glob, Grep
---

# Code Quality Checker

Comprehensive code quality and assignment progress verification.

## Quick Checks

### TypeScript Errors
```bash
pnpm tsc --noEmit
```

### Lint Check
```bash
pnpm lint
```

### Build Check
```bash
pnpm build
```

## Quality Checklist

### TypeScript
- [ ] No `any` types
- [ ] All functions have return types
- [ ] Props interfaces defined
- [ ] No TypeScript errors

### FSD Architecture
- [ ] Correct layer structure
- [ ] No upward imports
- [ ] Barrel exports in place
- [ ] Single responsibility

### React Best Practices
- [ ] Components under 100 lines
- [ ] Proper hook dependencies
- [ ] No prop drilling
- [ ] Keys on list items

### State Management
- [ ] Server state in TanStack Query
- [ ] Client state in Zustand
- [ ] No useState for server data

## Assignment Checklist

See [CHECKLIST.md](CHECKLIST.md) for full assignment requirements.

## Common Issues

See [ISSUES.md](ISSUES.md) for common problems and fixes.
