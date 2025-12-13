# 005: Features 레이어 - 사용자 액션 분리

## 목표
사용자 행동(이벤트 처리) 중심의 기능을 features 레이어로 분리

## 작업 내용
### post-crud
- [ ] `features/post-crud/ui/AddPostDialog.tsx` (562-589줄)
- [ ] `features/post-crud/ui/EditPostDialog.tsx` (591-612줄)
- [ ] `features/post-crud/ui/PostDetailDialog.tsx` (648-659줄)
- [ ] `features/post-crud/index.ts`

### comment-crud
- [ ] `features/comment-crud/ui/AddCommentDialog.tsx` (614-630줄)
- [ ] `features/comment-crud/ui/EditCommentDialog.tsx` (632-647줄)
- [ ] `features/comment-crud/index.ts`

### search-posts
- [ ] `features/search-posts/ui/SearchInput.tsx` (476-488줄)
- [ ] `features/search-posts/ui/TagFilter.tsx` (489-508줄)
- [ ] `features/search-posts/ui/SortControls.tsx` (509-529줄)
- [ ] `features/search-posts/index.ts`

### user-modal
- [ ] `features/user-modal/ui/UserModal.tsx` (661-693줄)
- [ ] `features/user-modal/index.ts`

## 의존성
- 004-refactor-entities-ui 완료 필요
