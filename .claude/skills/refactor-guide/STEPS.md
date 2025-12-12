# Refactoring Steps

## Step 1: Foundation Setup

### 1.1 Install Dependencies
```bash
pnpm add zustand @tanstack/react-query @tanstack/react-query-devtools
```

### 1.2 Configure Path Aliases

**tsconfig.app.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**vite.config.ts:**
```typescript
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### 1.3 Create FSD Folder Structure
```bash
mkdir -p src/{app/providers,pages,widgets,features,entities,shared/{ui,api,lib,store}}
mkdir -p src/entities/{post,comment,user,tag}/{model,api,ui}
mkdir -p src/features/{add-post,edit-post,delete-post,post-search,post-filter,pagination}/{api,ui,model}
mkdir -p src/features/{add-comment,edit-comment,delete-comment,like-comment}/{api,ui}
mkdir -p src/widgets/{posts-table,post-detail,user-profile}/ui
```

### Verify
```bash
pnpm dev  # Should start without errors
```

---

## Step 2: Define Types

### 2.1 Post Types
Create `src/entities/post/model/types.ts` with Post, PostsResponse, CreatePostRequest, UpdatePostRequest

### 2.2 Comment Types
Create `src/entities/comment/model/types.ts` with Comment, CommentsResponse, CreateCommentRequest

### 2.3 User Types
Create `src/entities/user/model/types.ts` with User, UsersResponse

### 2.4 Tag Types
Create `src/entities/tag/model/types.ts` with Tag type

### Verify
```bash
pnpm tsc --noEmit  # No type errors
```

---

## Step 3: Setup Shared Layer

### 3.1 Move UI Components
Move from `src/components/index.tsx` to individual files in `src/shared/ui/`:
- Button, Input, Textarea
- Card, Dialog, Table, Select
- Create `src/shared/ui/index.ts` barrel export

### 3.2 Create API Client
Create `src/shared/api/apiClient.ts` with get, post, put, patch, delete methods

### 3.3 Create Query Keys
Create `src/shared/api/queryKeys.ts` with structured query key factory

### 3.4 Create Barrel Exports
Create `src/shared/api/index.ts` and `src/shared/index.ts`

### Verify
```bash
# Import test
import { Button } from '@/shared/ui'
import { apiClient } from '@/shared/api'
```

---

## Step 4: Create Entities

### 4.1 Post Entity
- `src/entities/post/api/postApi.ts` - API functions
- `src/entities/post/api/usePosts.ts` - Query hooks (after Step 6)
- `src/entities/post/ui/PostCard.tsx` - Card component
- `src/entities/post/ui/PostTableRow.tsx` - Table row component
- `src/entities/post/index.ts` - Barrel export

### 4.2 Comment Entity
- `src/entities/comment/api/commentApi.ts`
- `src/entities/comment/ui/CommentItem.tsx`
- `src/entities/comment/index.ts`

### 4.3 User Entity
- `src/entities/user/api/userApi.ts`
- `src/entities/user/ui/UserAvatar.tsx`
- `src/entities/user/index.ts`

### 4.4 Tag Entity
- `src/entities/tag/api/tagApi.ts`
- `src/entities/tag/index.ts`

### Verify
```bash
# Test imports
import { postApi, PostCard } from '@/entities/post'
```

---

## Step 5: Setup Zustand Stores

### 5.1 Filter Store
Create `src/features/post-filter/model/store.ts`:
- searchQuery, selectedTag, sortBy, sortOrder
- Actions: setSearchQuery, setSelectedTag, etc.

### 5.2 Pagination Store
Create `src/features/pagination/model/store.ts`:
- skip, limit
- Actions: setSkip, setLimit, nextPage, prevPage

### 5.3 UI Store
Create `src/shared/store/useUIStore.ts`:
- Dialog states (showAddDialog, showEditDialog, etc.)
- Selected items (selectedPost, selectedComment)
- Actions: openAddDialog, closeAddDialog, etc.

### Verify
```typescript
const { searchQuery, setSearchQuery } = useFilterStore()
```

---

## Step 6: Setup TanStack Query

### 6.1 Create QueryProvider
Create `src/app/providers/QueryProvider.tsx`

### 6.2 Wrap App
Update `src/main.tsx` to wrap with QueryProvider

### 6.3 Create Query Hooks
- `src/entities/post/api/usePosts.ts`
- `src/entities/post/api/useSearchPosts.ts`
- `src/entities/comment/api/useComments.ts`
- `src/entities/user/api/useUser.ts`
- `src/entities/tag/api/useTags.ts`

### Verify
```bash
# Check DevTools visible in browser
pnpm dev
```

---

## Step 7: Create Features

### 7.1 CRUD Features
- `src/features/add-post/` - useAddPost hook, AddPostDialog
- `src/features/edit-post/` - useUpdatePost hook, EditPostDialog
- `src/features/delete-post/` - useDeletePost hook
- `src/features/add-comment/` - useAddComment, AddCommentDialog
- `src/features/edit-comment/` - useUpdateComment, EditCommentDialog
- `src/features/delete-comment/` - useDeleteComment
- `src/features/like-comment/` - useLikeComment (optimistic update)

### 7.2 Filter Features
- `src/features/post-search/ui/PostSearchBar.tsx`
- `src/features/post-filter/ui/PostFilters.tsx`
- `src/features/pagination/ui/Pagination.tsx`

### Verify
```typescript
const { mutate, isPending } = useAddPost()
```

---

## Step 8: Create Widgets

### 8.1 PostsTable Widget
Create `src/widgets/posts-table/ui/PostsTable.tsx`:
- Uses usePosts hook
- Renders PostTableRow for each post
- Connects to UI store for actions

### 8.2 PostDetail Widget
Create `src/widgets/post-detail/ui/PostDetail.tsx`:
- Uses useComments hook
- Renders CommentItem for each comment
- Includes AddCommentDialog

### 8.3 UserProfile Widget
Create `src/widgets/user-profile/ui/UserProfile.tsx`:
- Uses useUser hook
- Displays full user information

### Verify
```typescript
<PostsTable />  // Should render independently
```

---

## Step 9: Simplify Page

### 9.1 Refactor PostsManagerPage
Transform to composition only (~100 lines):

```typescript
// src/pages/posts-manager/ui/PostsManagerPage.tsx
export function PostsManagerPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1>Posts Manager</h1>
        <AddPostButton />
      </div>

      <div className="flex gap-4 mb-4">
        <PostSearchBar />
        <PostFilters />
      </div>

      <PostsTable />

      <Pagination />

      {/* Dialogs */}
      <AddPostDialog />
      <EditPostDialog />
      <PostDetailDialog />
      <UserModal />
    </div>
  )
}
```

### 9.2 Clean Up
- Remove old PostsManagerPage.tsx
- Update App.tsx to use new page

### Final Verify
```bash
pnpm dev        # Works correctly
pnpm build      # No errors
pnpm tsc --noEmit  # No type errors
```

---

## Completion Checklist

- [ ] All 23 useState replaced with stores/queries
- [ ] All fetch calls replaced with TanStack Query
- [ ] PostsManagerPage under 150 lines
- [ ] No TypeScript errors
- [ ] All features working
- [ ] Optimistic updates for like-comment
