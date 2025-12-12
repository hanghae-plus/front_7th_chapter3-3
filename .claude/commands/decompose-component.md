# Component Decomposition Agent

You are a React component architecture expert. Your task is to decompose the monolithic component into smaller, focused components following single responsibility principle.

## Tasks to Perform

### 1. Analyze Current Component
Read `src/pages/PostsManagerPage.tsx` (708 lines) and identify:
- All UI sections that can be extracted
- Event handlers that belong to specific features
- JSX blocks that can become separate components

### 2. Identify Component Boundaries
Based on UI structure, identify these components:

**Page Level:**
- `PostsManagerPage` - Main page (composition only)

**Widget Level (Complex, reusable blocks):**
- `PostsTable` - Table displaying posts with actions
- `PostDetail` - Post detail view with comments
- `UserProfile` - User profile modal

**Feature Level (User action components):**
- `AddPostDialog` - Dialog for creating new post
- `EditPostDialog` - Dialog for editing post
- `AddCommentDialog` - Dialog for adding comment
- `EditCommentDialog` - Dialog for editing comment
- `PostSearchBar` - Search input with button
- `PostFilters` - Tag selector and sort options
- `Pagination` - Page navigation controls

**Entity Level (Pure display components):**
- `PostCard` - Single post display
- `PostTableRow` - Table row for post
- `CommentItem` - Single comment display
- `UserAvatar` - User image with name
- `TagBadge` - Tag display chip

### 3. Props Interface Design
For each component, define clear props:

```typescript
// Example: PostTableRow
interface PostTableRowProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onViewDetail: (post: Post) => void
  onViewUser: (userId: number) => void
}

// Example: PostFilters
interface PostFiltersProps {
  tags: Tag[]
  selectedTag: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (order: 'asc' | 'desc') => void
}
```

### 4. File Structure
Organize by FSD layers:

```
src/
├── pages/
│   └── posts-manager/
│       └── ui/
│           └── PostsManagerPage.tsx  (composition only)
├── widgets/
│   ├── posts-table/
│   │   └── ui/
│   │       └── PostsTable.tsx
│   ├── post-detail/
│   │   └── ui/
│   │       └── PostDetail.tsx
│   └── user-profile/
│       └── ui/
│           └── UserProfile.tsx
├── features/
│   ├── add-post/
│   │   └── ui/
│   │       └── AddPostDialog.tsx
│   ├── edit-post/
│   │   └── ui/
│   │       └── EditPostDialog.tsx
│   ├── post-search/
│   │   └── ui/
│   │       └── PostSearchBar.tsx
│   ├── post-filter/
│   │   └── ui/
│   │       └── PostFilters.tsx
│   └── pagination/
│       └── ui/
│           └── Pagination.tsx
├── entities/
│   ├── post/
│   │   └── ui/
│   │       ├── PostCard.tsx
│   │       └── PostTableRow.tsx
│   ├── comment/
│   │   └── ui/
│   │       └── CommentItem.tsx
│   └── user/
│       └── ui/
│           └── UserAvatar.tsx
```

### 5. Decomposition Strategy

**Phase 1: Extract Pure UI Components (entities)**
- Start with components that have no side effects
- PostTableRow, CommentItem, UserAvatar

**Phase 2: Extract Feature Components**
- Components with event handlers but no state
- PostFilters, PostSearchBar, Pagination

**Phase 3: Extract Widget Components**
- Complex components with local state
- PostsTable, PostDetail

**Phase 4: Refactor Page Component**
- PostsManagerPage becomes pure composition
- All logic moved to features/widgets

## Important Notes
- Each component should have ONE responsibility
- Props should be minimal and well-typed
- Avoid prop drilling (use stores for global state)
- Keep components under 100 lines ideally
- Export components through index.ts barrel files

## Output

Create each component file with:
1. TypeScript interface for props
2. Component implementation
3. Export statement

Now analyze PostsManagerPage.tsx and start decomposing components.
