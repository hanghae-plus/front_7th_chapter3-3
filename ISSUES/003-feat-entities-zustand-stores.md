# 003: Entities 레이어 - Zustand Stores 추가

## 목표
엔티티별 전역 상태 스토어 생성으로 Props Drilling 제거

## 작업 내용
- [ ] `entities/post/model/store.ts`
  - posts, total, selectedPost, loading
  - actions: setPosts, setSelectedPost, addPost, updatePost, deletePost
- [ ] `entities/comment/model/store.ts`
  - comments (postId별 Map), selectedComment
  - actions: setComments, addComment, updateComment, deleteComment, likeComment
- [ ] `entities/user/model/store.ts`
  - selectedUser
  - actions: setSelectedUser
- [ ] `entities/tag/model/store.ts`
  - tags, selectedTag
  - actions: setTags, setSelectedTag
- [ ] `shared/model/uiStore.ts`
  - skip, limit, searchQuery, sortBy, sortOrder
  - showAddDialog, showEditDialog, showPostDetailDialog 등
  - actions: 각 상태 setter

## 의존성
- 002-refactor-entities-types-api 완료 필요
