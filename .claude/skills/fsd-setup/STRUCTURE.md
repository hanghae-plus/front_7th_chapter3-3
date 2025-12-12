# FSD Structure Reference

## Complete Project Structure

```
src/
├── app/
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── RouterProvider.tsx
│   │   └── index.ts
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── index.ts
│
├── pages/
│   └── posts-manager/
│       ├── ui/
│       │   └── PostsManagerPage.tsx
│       └── index.ts
│
├── widgets/
│   ├── posts-table/
│   │   ├── ui/
│   │   │   └── PostsTable.tsx
│   │   └── index.ts
│   ├── post-detail/
│   │   ├── ui/
│   │   │   └── PostDetail.tsx
│   │   └── index.ts
│   └── user-profile/
│       ├── ui/
│       │   └── UserProfile.tsx
│       └── index.ts
│
├── features/
│   ├── add-post/
│   │   ├── ui/
│   │   │   └── AddPostDialog.tsx
│   │   ├── api/
│   │   │   └── useAddPost.ts
│   │   └── index.ts
│   ├── edit-post/
│   │   ├── ui/
│   │   │   └── EditPostDialog.tsx
│   │   ├── api/
│   │   │   └── useUpdatePost.ts
│   │   └── index.ts
│   ├── delete-post/
│   │   ├── api/
│   │   │   └── useDeletePost.ts
│   │   └── index.ts
│   ├── post-search/
│   │   ├── ui/
│   │   │   └── PostSearchBar.tsx
│   │   └── index.ts
│   ├── post-filter/
│   │   ├── ui/
│   │   │   └── PostFilters.tsx
│   │   ├── model/
│   │   │   └── store.ts
│   │   └── index.ts
│   ├── pagination/
│   │   ├── ui/
│   │   │   └── Pagination.tsx
│   │   ├── model/
│   │   │   └── store.ts
│   │   └── index.ts
│   ├── add-comment/
│   │   ├── ui/
│   │   │   └── AddCommentDialog.tsx
│   │   ├── api/
│   │   │   └── useAddComment.ts
│   │   └── index.ts
│   ├── edit-comment/
│   │   ├── ui/
│   │   │   └── EditCommentDialog.tsx
│   │   ├── api/
│   │   │   └── useUpdateComment.ts
│   │   └── index.ts
│   ├── delete-comment/
│   │   ├── api/
│   │   │   └── useDeleteComment.ts
│   │   └── index.ts
│   └── like-comment/
│       ├── ui/
│       │   └── LikeButton.tsx
│       ├── api/
│       │   └── useLikeComment.ts
│       └── index.ts
│
├── entities/
│   ├── post/
│   │   ├── ui/
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostTableRow.tsx
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── postApi.ts
│   │   │   ├── usePosts.ts
│   │   │   ├── useSearchPosts.ts
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── comment/
│   │   ├── ui/
│   │   │   ├── CommentItem.tsx
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── commentApi.ts
│   │   │   ├── useComments.ts
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── ui/
│   │   │   ├── UserAvatar.tsx
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── userApi.ts
│   │   │   ├── useUser.ts
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── tag/
│       ├── api/
│       │   ├── tagApi.ts
│       │   ├── useTags.ts
│       │   └── index.ts
│       ├── model/
│       │   ├── types.ts
│       │   └── index.ts
│       └── index.ts
│
└── shared/
    ├── ui/
    │   ├── button/
    │   │   └── Button.tsx
    │   ├── input/
    │   │   └── Input.tsx
    │   ├── dialog/
    │   │   └── Dialog.tsx
    │   ├── table/
    │   │   └── Table.tsx
    │   ├── select/
    │   │   └── Select.tsx
    │   ├── card/
    │   │   └── Card.tsx
    │   └── index.ts
    ├── api/
    │   ├── apiClient.ts
    │   ├── queryKeys.ts
    │   └── index.ts
    ├── lib/
    │   ├── cn.ts
    │   └── index.ts
    ├── store/
    │   ├── useUIStore.ts
    │   └── index.ts
    └── index.ts
```

## File Counts by Layer

| Layer | Folders | Files |
|-------|---------|-------|
| shared | 4 | ~15 |
| entities | 4 | ~20 |
| features | 10 | ~25 |
| widgets | 3 | ~6 |
| pages | 1 | ~2 |
| app | 2 | ~5 |

## Migration Path

1. **shared** - Move UI components first
2. **entities** - Define types and basic UI
3. **features** - Extract user actions
4. **widgets** - Compose complex UI blocks
5. **pages** - Simplify to composition only
6. **app** - Setup providers
