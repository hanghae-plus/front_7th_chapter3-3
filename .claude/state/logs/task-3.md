# Task 3 완료 로그: entities 레이어 구성

## 완료 일시
- **시작**: 2025-12-10
- **완료**: 2025-12-11
- **소요 시간**: 약 1일

## 작업 내용

### 1. 도메인별 폴더 구조 구성

각 도메인(Post, User, Comment, Tag)을 독립적인 entities로 분리하고, FSD 아키텍처의 segment 구조(model, api, ui, index) 적용

```
src/entities/
├── post/
│   ├── model/types.ts
│   ├── api/index.ts
│   └── index.ts
├── user/
│   ├── model/types.ts
│   ├── api/index.ts
│   └── index.ts
├── comment/
│   ├── model/types.ts
│   ├── api/index.ts
│   └── index.ts
└── tag/
    ├── model/types.ts
    ├── api/index.ts
    └── index.ts
```

### 2. model/types.ts - 도메인별 타입 정의

#### Post (src/entities/post/model/types.ts)
- `Post`: 기본 게시물 타입
- `PostsData`: 게시물 목록 응답 타입 (Data 상속)
- `NewPost`: 게시물 생성용 타입 (Pick 유틸리티 활용)

#### User (src/entities/user/model/types.ts)
- `User`: 기본 사용자 타입
- `UsersData`: 사용자 목록 응답 타입 (Data 상속)

#### Comment (src/entities/comment/model/types.ts)
- `Comment`: 기본 댓글 타입 (중첩된 user 정보 포함)
- `CommentsData`: 댓글 목록 응답 타입 (Data 상속)
- `NewComment`: 댓글 생성용 타입

#### Tag (src/entities/tag/model/types.ts)
- `Tag`: 태그 타입 (name, url, slug 포함)
- `TagsData`: 태그 목록 응답 타입 (배열 형태)

### 3. api/index.ts - 도메인별 API 함수 분리

#### Post API (src/entities/post/api/index.ts)
- `fetchPosts`: 게시물 목록 조회
- `addPost`: 게시물 추가
- `deletePost`: 게시물 삭제
- `searchPosts`: 게시물 검색

#### User API (src/entities/user/api/index.ts)
- `fetchUsers`: 사용자 목록 조회

#### Comment API (src/entities/comment/api/index.ts)
- `fetchComments`: 댓글 목록 조회
- `addComment`: 댓글 추가
- `updateComment`: 댓글 수정
- `deleteComment`: 댓글 삭제
- `fetchCommentsByPostId`: 특정 게시물의 댓글 조회

#### Tag API (src/entities/tag/api/index.ts)
- `fetchTags`: 태그 목록 조회

### 4. index.ts - Public API Export

각 entities의 index.ts에서 model, api를 재export하여 외부에서 사용할 수 있도록 구성

```typescript
// src/entities/post/index.ts 예시
export * from "./model/types"
export * from "./api"
```

### 5. PostsManagerPage.tsx import 경로 수정

기존 경로에서 새로운 entities 경로로 변경:
```typescript
// Before
import { Post, User, Comment } from "@/shared/types"

// After
import { Post, PostsData, NewPost } from "@/entities/post"
import { User, UsersData } from "@/entities/user"
import { Comment, CommentsData, NewComment } from "@/entities/comment"
import { Tag } from "@/entities/tag"
```

## 생성/수정된 파일 목록

### 새로 생성된 파일
- `src/entities/post/model/types.ts`
- `src/entities/post/api/index.ts`
- `src/entities/post/index.ts`
- `src/entities/user/model/types.ts`
- `src/entities/user/api/index.ts`
- `src/entities/user/index.ts`
- `src/entities/comment/model/types.ts`
- `src/entities/comment/api/index.ts`
- `src/entities/comment/index.ts`
- `src/entities/tag/model/types.ts`
- `src/entities/tag/api/index.ts`
- `src/entities/tag/index.ts`

### 수정된 파일
- `src/pages/PostsManagerPage.tsx` - import 경로 변경
- `src/shared/api/types.ts` - Data 타입 유지 (공통 응답 타입)

## 주요 결정 사항

### 1. Data 타입 위치: shared/api/types.ts
- **이유**: 모든 도메인의 응답 구조에 공통으로 사용되는 타입
- **장점**: DRY 원칙 준수, 응답 구조 변경 시 한 곳에서 관리
- **FSD 준수**: shared 레이어는 공통 타입/유틸 제공 목적에 부합

### 2. PostWithAuthor 타입 제거 결정
- **현재 상태**: 아직 정의하지 않음
- **이유**: features 레이어에서 Post와 User를 조합하여 사용할 예정
- **위치**: 필요 시 features/posts/model 또는 widgets 레이어에서 정의

### 3. API 함수의 순수성 유지
- **entities/api**: 순수 HTTP 요청/응답만 처리
- **features/api**: 상태 업데이트, 에러 핸들링, 비즈니스 로직 포함
- **분리 기준**: entities는 데이터 계층, features는 동작 계층

### 4. ui segment는 Task 4 이후 처리
- **현재**: api, model만 분리 완료
- **계획**: features 레이어 구성 후 표현 컴포넌트 분리
- **순서**: features → widgets → entities/ui 순으로 정리

## FSD 의존성 방향 검증

```
pages → features → entities → shared
  ↓         ↓          ↓          ↓
 (X)       (X)        (O)        (O)
```

- entities는 shared만 의존
- entities 간 상호 의존 없음
- PostsManagerPage는 entities를 직접 import (Task 4에서 features로 전환 예정)

## 다음 단계 (Task 4)

1. features 레이어 구성
   - 사용자 행동(이벤트 처리) 분리
   - feature별 ui 분리
   - feature별 api 분리 (entities/api 활용)

2. PostsManagerPage 리팩토링
   - features로 로직 이동
   - 상태 관리 및 이벤트 핸들러 분리

## 배운 점

1. **타입 설계의 중요성**: 공통 타입(Data)과 도메인 타입을 분리하여 재사용성 향상
2. **API 계층 분리**: entities는 데이터 접근만, features는 비즈니스 로직 처리
3. **FSD 아키텍처 실전 적용**: segment(model, api, ui) 구조로 명확한 책임 분리
4. **점진적 리팩토링**: ui는 나중에 정리하고 먼저 model, api 분리로 진행

## 특이사항

- Comment 타입의 중첩된 user 정보는 API 응답 구조 그대로 유지
- 태그별 게시물 조회 등 복합 기능은 features 레이어에서 처리 예정
- updatePost는 주석 처리 (features 레이어에서 재구현 예정)
