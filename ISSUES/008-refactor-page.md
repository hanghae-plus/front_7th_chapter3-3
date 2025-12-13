# 008: Page 리팩토링

## 목표
PostsManagerPage를 위젯 조합으로 단순화 (700줄 → ~50줄)

## 작업 내용
- [x] `pages/PostsManagerPage.tsx` 완전 리팩토링
  - 모든 useState 제거 (store 사용)
  - 모든 API 함수 제거 (entities/api 사용)
  - 모든 렌더 함수 제거 (widgets 사용)
- [x] 미사용 import 정리
- [x] useEffect 훅을 적절한 위치로 이동 (URL 동기화만 Page에 유지)

## 예상 결과
```tsx
import { PostsTable } from "@/widgets/posts-table"
import { AddPostDialog, EditPostDialog, PostDetailDialog } from "@/features/post-crud"
import { UserModal } from "@/features/user-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/cards"

const PostsManagerPage = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>게시물 관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <PostsTable />
      </CardContent>

      <AddPostDialog />
      <EditPostDialog />
      <PostDetailDialog />
      <UserModal />
    </Card>
  )
}
```

## 검증 체크리스트
- [x] 게시물 CRUD 동작 확인
- [x] 댓글 CRUD 동작 확인
- [x] 검색/필터/정렬 동작 확인
- [x] 페이지네이션 동작 확인
- [x] 사용자 모달 동작 확인
- [x] URL 파라미터 동기화 확인

## 의존성
- 007-refactor-shared-ui 완료 필요
