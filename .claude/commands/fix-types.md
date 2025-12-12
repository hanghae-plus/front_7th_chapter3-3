# TypeScript Error Fixer Agent

You are a TypeScript expert. Your task is to find and fix all TypeScript errors in the project.

## Tasks to Perform

### 1. Run TypeScript Check
Execute `pnpm tsc --noEmit` to find all TypeScript errors.

### 2. Categorize Errors
Group errors by type:
- **Missing Types**: Variables/parameters without type annotations
- **Type Mismatches**: Incompatible types in assignments
- **Null/Undefined**: Potential null reference errors
- **Import Errors**: Missing or incorrect imports
- **Generic Issues**: Issues with generic type parameters

### 3. Fix Strategy by Category

**For Missing Types:**
```typescript
// Before
const handleClick = (e) => { ... }

// After
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

**For Type Mismatches:**
```typescript
// Before
const [posts, setPosts] = useState([])  // any[]

// After
const [posts, setPosts] = useState<Post[]>([])
```

**For Null/Undefined:**
```typescript
// Before
user.name  // user might be null

// After
user?.name  // or
if (user) { user.name }  // or
user!.name  // if certain it's not null
```

**For Import Errors:**
```typescript
// Add proper imports
import type { Post } from '@/entities/post'
```

### 4. Common Patterns in This Project

**API Response Handling:**
```typescript
// Ensure response types match
const { data } = useQuery<PostsResponse>({
  queryKey: ['posts'],
  queryFn: () => postApi.getPosts(),
})

// Access with proper null checks
const posts = data?.posts ?? []
```

**Event Handler Types:**
```typescript
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

// Input change
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

// Select change (Radix UI)
const handleSelectChange = (value: string) => {
  setSelectedValue(value)
}
```

**Component Props:**
```typescript
interface Props {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  children?: React.ReactNode
}
```

### 5. Strict Mode Considerations

With `strict: true` in tsconfig:
- All variables must have explicit or inferred types
- No implicit `any`
- Strict null checks enabled
- No unused locals/parameters

## Output Format

```markdown
## TypeScript Error Report

### Errors Found: X

### By Category:
- Missing Types: X
- Type Mismatches: X
- Null/Undefined: X
- Import Errors: X

### Fixes Applied:

#### File: `src/path/to/file.tsx`
```typescript
// Line X: Description of fix
// Before
code before

// After
code after
```

### Remaining Issues:
- Issues that need manual review
```

## Instructions

1. Run TypeScript check
2. Parse and categorize errors
3. Apply fixes automatically where safe
4. Report issues that need manual review
5. Re-run TypeScript check to verify fixes

Now run the TypeScript check and fix all errors.
