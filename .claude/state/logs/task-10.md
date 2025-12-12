# Task 10: TanStack Query 마이그레이션 및 기능 복원

## 완료 일시
2025-12-12

## 수행 내용

### 1. TanStack Query 설정
- `@tanstack/react-query`, `@tanstack/react-query-devtools` 설치
- `app/providers/QueryProvider.tsx` 생성
- QueryClient 설정 (retry: 0, refetchOnWindowFocus: false)
- DevTools 설정 (개발 환경에서만 표시)

### 2. Query/Mutation 훅 구현

#### entities/post/model/queries.ts
- `usePostsQuery`: 게시물 목록 조회 (users 데이터 병합)
- `useSearchPostsQuery`: 게시물 검색
- `usePostsByTagQuery`: 태그별 게시물 조회
- `useAddPostMutation`: 게시물 추가 (캐시 직접 업데이트)
- `useUpdatePostMutation`: 게시물 수정 (캐시 직접 업데이트)
- `useDeletePostMutation`: 게시물 삭제 (캐시 직접 업데이트)

#### entities/comment/model/queries.ts
- `useCommentsQuery`: 댓글 목록 조회
- `useAddCommentMutation`: 댓글 추가 (캐시 직접 업데이트)
- `useUpdateCommentMutation`: 댓글 수정 (캐시 직접 업데이트)
- `useDeleteCommentMutation`: 댓글 삭제 (캐시 직접 업데이트)
- `useLikeCommentMutation`: 댓글 좋아요 (캐시 직접 업데이트)

#### entities/tag/model/queries.ts
- `useTagsQuery`: 태그 목록 조회 (staleTime 5분)

#### entities/user/model/queries.ts
- `useUsersQuery`: 사용자 목록 조회
- `useUserQuery`: 사용자 상세 조회

### 3. 누락 기능 복원
- Posts에 Users 데이터 병합 (author 정보 표시)
- 태그별 게시물 필터링 구현
- 검색 기능 TanStack Query 연동
- 정렬 기능 구현 (sortBy, sortOrder)
- URL query params 동기화 복원
- PostDetailModal 열기 기능 수정
- UserProfile에 author prop 전달

### 4. Mock API 대응
- DummyJSON은 실제 데이터를 저장하지 않는 mock API
- `invalidateQueries` 대신 `setQueryData`/`setQueriesData`로 캐시 직접 업데이트
- CRUD 작업 시 클라이언트 캐시에서 데이터 관리

### 5. 프로덕션 배포 설정
- `shared/api/config.ts` 생성
- 개발 환경: `/api` (Vite proxy)
- 프로덕션 환경: `https://dummyjson.com` (직접 호출)
- `vite.config.ts` base path 수정 (`front_7th_chapter3-3`)

## Query Keys 설계
```typescript
// posts
postKeys.all: ["posts"]
postKeys.lists(): ["posts", "list"]
postKeys.list({ limit, skip }): ["posts", "list", { limit, skip }]
postKeys.search(query): ["posts", "search", query]
postKeys.byTag(tag): ["posts", "tag", tag]

// comments
commentKeys.all: ["comments"]
commentKeys.list(postId): ["comments", "list", postId]

// tags
tagKeys.all: ["tags"]

// users
userKeys.all: ["users"]
userKeys.list(): ["users", "list"]
userKeys.detail(id): ["users", "detail", id]
```

## 학습 포인트
- TanStack Query의 캐시 관리 전략
- setQueryData vs invalidateQueries 사용 시점
- Mock API 환경에서의 낙관적 업데이트
- Query Keys 팩토리 패턴
- 환경별 API base URL 설정

## 관련 커밋
- Feat: Task 6~10 진행 - FSD 전체 레이어 구성 및 TanStack Query 적용
- Fix: TanStack Query 캐시 직접 업데이트 및 누락 기능 복원
- Fix: GitHub Pages base path 수정
- Fix: 프로덕션 환경 API base URL 설정
