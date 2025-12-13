# 004: Entities 레이어 - UI 컴포넌트 분리

## 목표
엔티티별 재사용 가능한 프레젠테이션 컴포넌트 분리

## 작업 내용
- [ ] `entities/post/ui/PostRow.tsx`
  - 게시물 테이블 행 (ID, 제목, 태그, 작성자, 반응, 액션 버튼)
  - renderPostTable 내부 로직 추출 (335-412줄)
- [ ] `entities/comment/ui/CommentItem.tsx`
  - 댓글 아이템 (작성자, 내용, 좋아요, 수정/삭제 버튼)
  - renderComments 내부 로직 추출 (415-460줄)
- [ ] `entities/user/ui/UserAvatar.tsx`
  - 사용자 아바타 + 이름 (클릭 시 모달 열기)
- [ ] `entities/tag/ui/TagBadge.tsx`
  - 태그 뱃지 (선택 상태 스타일링)

## 의존성
- 003-feat-entities-zustand-stores 완료 필요
