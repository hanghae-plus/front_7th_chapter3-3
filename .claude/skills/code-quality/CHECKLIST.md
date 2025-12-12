# Assignment Checklist

## Basic Assignment (기본과제)

### Global State Management
| Item | Check |
|------|-------|
| State management library used (Zustand/Jotai/Context) | [ ] |
| Props drilling minimized | [ ] |
| State separated by concern | [ ] |

### Shared Layer (shared/)
| Item | Check |
|------|-------|
| Common UI components in `src/shared/ui/` | [ ] |
| Common logic in `src/shared/lib/` | [ ] |
| API client in `src/shared/api/` | [ ] |

### Entities Layer (entities/)
| Item | Check |
|------|-------|
| Types defined in `src/entities/*/model/types.ts` | [ ] |
| Entity UI components in `src/entities/*/ui/` | [ ] |
| Entity API functions in `src/entities/*/api/` | [ ] |

### Features Layer (features/)
| Item | Check |
|------|-------|
| User actions separated by feature | [ ] |
| Feature UI components (dialogs, forms) | [ ] |
| Feature API/mutation hooks | [ ] |

### Widgets Layer (widgets/)
| Item | Check |
|------|-------|
| Reusable complex UI blocks | [ ] |
| Widgets compose entities and features | [ ] |

---

## Advanced Assignment (심화과제)

### TanStack Query Migration
| Item | Check |
|------|-------|
| TanStack Query installed | [ ] |
| QueryProvider wraps app | [ ] |
| All GET requests use `useQuery` | [ ] |
| All mutations use `useMutation` | [ ] |
| Query keys properly structured | [ ] |
| Optimistic updates implemented | [ ] |
| Loading/error states declarative | [ ] |

---

## Verification Commands

```bash
# Check folder structure
ls -la src/
ls -la src/entities/
ls -la src/features/
ls -la src/widgets/
ls -la src/shared/

# Check for state management
grep -r "create(" src/ --include="*.ts" | grep zustand
grep -r "useContext" src/ --include="*.tsx"

# Check for TanStack Query
grep -r "useQuery" src/ --include="*.ts" --include="*.tsx"
grep -r "useMutation" src/ --include="*.ts" --include="*.tsx"

# Check entity types
find src/entities -name "types.ts"

# Check barrel exports
find src -name "index.ts"

# Check component sizes
wc -l src/**/*.tsx | sort -n

# TypeScript check
pnpm tsc --noEmit

# Check for any types
grep -r ": any" src/ --include="*.ts" --include="*.tsx"
```

---

## Progress Scoring

### Basic (15 points)
- State management setup: 3 points
- Shared layer: 3 points
- Entities layer: 3 points
- Features layer: 3 points
- Widgets layer: 3 points

### Advanced (7 points)
- TanStack Query setup: 2 points
- Query/Mutation hooks: 2 points
- Optimistic updates: 2 points
- Clean code: 1 point

### Total: 22 points
