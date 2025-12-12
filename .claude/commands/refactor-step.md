# Step-by-Step Refactoring Agent

You are a refactoring expert. Your task is to guide the user through the refactoring process one step at a time, ensuring each step is completed before moving to the next.

## Refactoring Steps

Execute these steps IN ORDER. Each step should be completed and verified before moving to the next.

### Step 1: Setup Foundation
**Prerequisites:** None

Tasks:
1. Install dependencies: `pnpm add zustand @tanstack/react-query @tanstack/react-query-devtools`
2. Setup path aliases in `tsconfig.app.json` and `vite.config.ts`
3. Create FSD folder structure:
   ```
   src/
   ├── app/
   ├── pages/
   ├── widgets/
   ├── features/
   ├── entities/
   └── shared/
   ```
4. Move existing UI components from `src/components/index.tsx` to `src/shared/ui/`

**Verification:**
- [ ] Dependencies installed
- [ ] Path aliases working
- [ ] Folder structure created
- [ ] `npm run dev` still works

---

### Step 2: Define Types
**Prerequisites:** Step 1 completed

Tasks:
1. Create `src/entities/post/model/types.ts` - Post types
2. Create `src/entities/comment/model/types.ts` - Comment types
3. Create `src/entities/user/model/types.ts` - User types
4. Create `src/entities/tag/model/types.ts` - Tag types
5. Create `src/shared/api/types.ts` - Common API types

**Verification:**
- [ ] All entity types defined
- [ ] No TypeScript errors
- [ ] Types match DummyJSON API response

---

### Step 3: Create API Layer
**Prerequisites:** Step 2 completed

Tasks:
1. Create `src/shared/api/apiClient.ts` - Base fetch client
2. Create `src/shared/api/queryKeys.ts` - Query key factory
3. Create `src/entities/post/api/postApi.ts` - Post API functions
4. Create `src/entities/comment/api/commentApi.ts` - Comment API functions
5. Create `src/entities/user/api/userApi.ts` - User API functions

**Verification:**
- [ ] API client created
- [ ] Entity APIs created
- [ ] Test one API call manually

---

### Step 4: Setup TanStack Query
**Prerequisites:** Step 3 completed

Tasks:
1. Create `src/app/providers/QueryProvider.tsx`
2. Wrap App with QueryProvider in `src/main.tsx`
3. Create query hooks for each entity:
   - `src/entities/post/api/usePosts.ts`
   - `src/entities/comment/api/useComments.ts`
   - `src/entities/user/api/useUser.ts`
4. Create `src/entities/tag/api/useTags.ts`

**Verification:**
- [ ] QueryProvider wraps app
- [ ] DevTools visible in browser
- [ ] Query hooks created

---

### Step 5: Setup State Management
**Prerequisites:** Step 1 completed

Tasks:
1. Create `src/shared/store/useFilterStore.ts` - Filter state
2. Create `src/shared/store/usePaginationStore.ts` - Pagination state
3. Create `src/shared/store/useUIStore.ts` - UI/Modal state

**Verification:**
- [ ] Stores created
- [ ] DevTools work (if using zustand devtools)
- [ ] Types are correct

---

### Step 6: Create Entity UI Components
**Prerequisites:** Step 2 completed

Tasks:
1. Create `src/entities/post/ui/PostTableRow.tsx`
2. Create `src/entities/comment/ui/CommentItem.tsx`
3. Create `src/entities/user/ui/UserAvatar.tsx`
4. Export through barrel files

**Verification:**
- [ ] Components render correctly
- [ ] Props are properly typed
- [ ] No visual regressions

---

### Step 7: Create Feature Components
**Prerequisites:** Steps 4, 5, 6 completed

Tasks:
1. Create `src/features/add-post/` - Add post feature
2. Create `src/features/edit-post/` - Edit post feature
3. Create `src/features/post-search/` - Search feature
4. Create `src/features/post-filter/` - Filter feature
5. Create `src/features/pagination/` - Pagination feature
6. Create comment features (add, edit, delete, like)

**Verification:**
- [ ] Features work independently
- [ ] Mutations invalidate correct queries
- [ ] UI states handled properly

---

### Step 8: Create Widgets
**Prerequisites:** Steps 6, 7 completed

Tasks:
1. Create `src/widgets/posts-table/ui/PostsTable.tsx`
2. Create `src/widgets/post-detail/ui/PostDetail.tsx`
3. Create `src/widgets/user-profile/ui/UserProfile.tsx`

**Verification:**
- [ ] Widgets compose entities and features
- [ ] Data flows correctly
- [ ] No prop drilling

---

### Step 9: Refactor Page Component
**Prerequisites:** All previous steps completed

Tasks:
1. Refactor `PostsManagerPage.tsx` to use:
   - TanStack Query hooks instead of useState/fetch
   - Zustand stores instead of useState
   - Widget components instead of inline JSX
2. Page should be ~100 lines (composition only)

**Verification:**
- [ ] Page is composition only
- [ ] All features still work
- [ ] No regressions

---

### Step 10: Implement Optimistic Updates
**Prerequisites:** Step 9 completed

Tasks:
1. Add optimistic update to like comment
2. Add optimistic update to delete operations
3. Handle rollback on errors

**Verification:**
- [ ] UI updates immediately
- [ ] Rolls back on error
- [ ] Final state matches server

---

## How to Use This Agent

1. Check current progress using `/check-progress`
2. Identify which step to work on
3. Execute tasks for that step
4. Verify completion
5. Move to next step

## Current Step Detection

Analyze the codebase to determine which step the user is currently on:
- No FSD folders → Start at Step 1
- No types → Start at Step 2
- No API layer → Start at Step 3
- No TanStack Query → Start at Step 4
- And so on...

Now analyze the current state and tell the user which step to work on next.
