# 006: Widgets 레이어 - 독립적 UI 블록 분리

## 목표
features와 entities를 조합한 재사용 가능한 위젯 생성

## 작업 내용
### posts-table
- [ ] `widgets/posts-table/ui/PostsTable.tsx`
  - SearchInput + TagFilter + SortControls 조합
  - PostRow 목록 렌더링
  - Pagination 컨트롤
- [ ] `widgets/posts-table/index.ts`

### comments-section
- [ ] `widgets/comments-section/ui/CommentsSection.tsx`
  - CommentItem 목록 렌더링
  - 댓글 추가 버튼
- [ ] `widgets/comments-section/index.ts`

### pagination (선택적)
- [ ] `widgets/pagination/ui/Pagination.tsx` (534-558줄)
- [ ] `widgets/pagination/index.ts`

## 의존성
- 005-refactor-features 완료 필요
