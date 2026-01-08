# 전체 작업 워크플로우

## 📋 개요

이 워크플로우는 FSD 아키텍처로 프로젝트를 리팩토링하기 위한 전체 작업 계획입니다.
각 단계는 순차적으로 진행하며, 이전 단계가 완료되어야 다음 단계로 진행할 수 있습니다.

---

## 🎯 최종 목표

**⚠️ 중요: 이 작업은 리팩토링입니다. 기존 기능과 화면이 절대 깨지면 안 됩니다!**

### 핵심 원칙 (Core Principles)

**모든 작업은 다음 4가지를 최우선으로 합니다:**

1. ⭐⭐⭐ **안정성 (Stability)**: 기존 기능이 절대 깨지지 않아야 함
2. ⚡ **속도 (Speed)**: 빠르게 작업 수행
3. 🎯 **정확성 (Accuracy)**: 왜곡되지 않는 작업, 의도대로 정확한 작업
4. 🔧 **최소한의 작업 (Minimal Work)**: 불필요한 작업 최소화

**참고**: `Rules/core-principles.md` - 핵심 원칙 상세 가이드

### 작업 목표

1. **TypeScript 타입 안정성 확보**: 모든 any 타입 제거 및 명확한 타입 정의
2. **FSD 아키텍처 적용**: entities, features, widgets, shared 레이어 분리
3. **상태 관리 개선**: Zustand를 활용한 전역 상태 관리
4. **API 분리**: entities와 features 레이어별 API 분리
5. **재사용성 향상**: Widget 기반 데이터 재사용 구조
6. **기능 보존**: 모든 기존 기능이 정상적으로 동작해야 함 (회귀 없음)

---

## 📅 전체 작업 단계

### Phase 1: 기초 작업 (Foundation)

**목표**: 타입 정의 및 기본 구조 생성

#### Step 1.1: TypeScript 타입 정의

**참고 문서**: `typescript-types-migration-plan.md`, `Rules/api-response-structure.md`

- [ ] 1.1.1: 기본 엔티티 타입 정의
  - `entities/user/model/types.ts` 생성
    - User, Address, Company 인터페이스 정의
    - `Rules/api-response-structure.md` 참고하여 정확한 구조 작성
  - `entities/post/model/types.ts` 생성
    - Post, Reactions 인터페이스 정의
    - User 타입 import 필요 (의존성 확인)
  - `entities/comment/model/types.ts` 생성
    - Comment 인터페이스 정의
    - User 타입 import 필요 (의존성 확인)

- [ ] 1.1.2: API 응답 타입 정의
  - 각 엔티티별 Response 타입 추가
  - `Rules/api-response-structure.md` 참고

- [ ] 1.1.3: DTO 타입 정의
  - Create, Update DTO 타입 추가

- [ ] 1.1.4: 컴포넌트 타입 정의
  - `shared/ui/` 컴포넌트 타입 적용

**검증 방법:**

1. 타입 체크: `tsc --noEmit` 실행 (가장 빠름, 우선 사용)
   - 오류가 없어야 함
   - 오류 발생 시 해당 타입 정의 수정
   - **참고**: `Rules/performance-optimization-guide.md` - 타입 체크만으로 충분
2. Import 테스트: 각 타입을 다른 파일에서 import 테스트
   ```typescript
   // 테스트 파일 생성 (임시)
   import { Post, User, Comment } from "./entities/post/model/types"
   // 타입 오류가 없으면 성공
   ```
3. index.ts 생성: `Rules/index-export-rules.md` 참고하여 index.ts 생성

**성능 최적화**: 이 단계에서는 `pnpm run build` 불필요. 타입 체크만으로 충분.

---

#### Step 1.2: Entities API 기본 구조 생성

**참고 문서**: `feature-api-separation-plan.md` (1단계), `Rules/api-response-structure.md`

- [ ] 1.2.1: Post API 생성
  - `entities/post/api/post-api.ts` 생성
  - 기본 CRUD 함수 구현:
    - `fetchPosts(params?: FetchPostsParams): Promise<PostsResponse>`
    - `fetchPostById(id: number): Promise<PostResponse>`
    - `addPost(post: CreatePostDto): Promise<PostResponse>`
    - `updatePost(id: number, post: UpdatePostDto): Promise<PostResponse>`
    - `deletePost(id: number): Promise<void>`
  - `entities/post/api/index.ts` 생성 (`Rules/index-export-rules.md` 참고)

- [ ] 1.2.2: Comment API 생성
  - `entities/comment/api/comment-api.ts` 생성
  - 기본 CRUD 함수 구현:
    - `fetchComments(postId: number): Promise<CommentsResponse>`
    - `addComment(comment: CreateCommentDto): Promise<CommentResponse>`
    - `updateComment(id: number, comment: UpdateCommentDto): Promise<CommentResponse>`
    - `deleteComment(id: number): Promise<void>`
  - `entities/comment/api/index.ts` 생성

- [ ] 1.2.3: User API 생성
  - `entities/user/api/user-api.ts` 생성
  - 기본 조회 함수 구현:
    - `fetchUsers(params?: FetchUsersParams): Promise<UsersResponse>`
    - `fetchUserById(id: number): Promise<UserResponse>`
  - `entities/user/api/index.ts` 생성

**검증 방법:**

1. 타입 체크: `tsc --noEmit` 실행 (가장 빠름, 우선 사용)
   - 모든 함수의 파라미터와 반환 타입이 올바른지 확인
   - **참고**: `Rules/performance-optimization-guide.md` - 타입 체크만으로 충분
2. API 함수 시그니처 확인:
   ```typescript
   // 각 함수가 올바른 타입을 사용하는지 확인
   import { fetchPosts } from "./entities/post/api"
   const result: PostsResponse = await fetchPosts() // 타입 오류 없어야 함
   ```
3. 에러 처리 확인: 모든 함수에 try-catch 및 에러 처리 포함 확인

**성능 최적화**: 이 단계에서는 `pnpm run build` 불필요. 타입 체크만으로 충분.

---

### Phase 2: 상태 관리 (State Management)

**목표**: Zustand Store 생성 및 상태 분리

#### Step 2.1: Post Store 생성

**참고 문서**: `state-management-plan.md` (1-3단계), `Rules/coding-rules.md`

- [ ] 2.1.1: Post Store 기본 구조
  - `entities/post/model/store.ts` 생성
  - 기본 상태 및 액션 정의:
    - PostState 인터페이스 정의
    - usePostStore 생성 (Zustand create 사용)
    - 기본 상태: posts, total, loading, error
    - 기본 액션: fetchPosts

- [ ] 2.1.2: Post Store 필터링/검색 상태
  - 검색, 필터링, 정렬 상태 추가:
    - searchQuery, selectedTag, tags, sortBy, sortOrder 상태
    - setSearchQuery, setSelectedTag, setSortBy, setSortOrder 액션

- [ ] 2.1.3: Post Store CRUD 액션
  - addPost, updatePost, deletePost 구현
  - 각 액션에 에러 처리 포함

- [ ] 2.1.4: index.ts 업데이트
  - `entities/post/model/index.ts`에 usePostStore export 추가

**검증 방법:**

1. 타입 체크: `tsc --noEmit` 실행 (가장 빠름, 우선 사용)
   - **참고**: `Rules/performance-optimization-guide.md` - 타입 체크만으로 충분
2. Store 접근 테스트:

   ```typescript
   // 테스트 코드 (임시 파일)
   import { usePostStore } from "./entities/post/model/store"

   // Store 상태 접근 가능한지 확인
   const posts = usePostStore.getState().posts // 타입 오류 없어야 함
   const fetchPosts = usePostStore.getState().fetchPosts // 함수 존재 확인
   ```

3. 컴포넌트에서 사용 테스트:
   ```typescript
   // 간단한 테스트 컴포넌트 생성
   const TestComponent = () => {
     const posts = usePostStore((state) => state.posts)
     const { fetchPosts } = usePostStore()
     // 타입 오류 없어야 함
   }
   ```

**성능 최적화**: 이 단계에서는 `pnpm run build` 불필요. 타입 체크만으로 충분.

---

#### Step 2.2: Comment Store 생성

**참고 문서**: `state-management-plan.md` (4단계)

- [ ] 2.2.1: Comment Store 생성
  - `entities/comment/model/store.ts` 생성
  - 댓글 상태 및 액션 구현

**검증**: Store가 정상적으로 동작하는지 테스트

---

#### Step 2.3: User Store 생성

**참고 문서**: `state-management-plan.md` (5단계)

- [ ] 2.3.1: User Store 생성
  - `entities/user/model/store.ts` 생성
  - 사용자 상태 및 액션 구현

**검증**: Store가 정상적으로 동작하는지 테스트

---

#### Step 2.4: UI Store 생성

**참고 문서**: `state-management-plan.md` (6단계)

- [ ] 2.4.1: UI Store 생성
  - `shared/lib/stores/ui-store.ts` 생성
  - 다이얼로그 상태 관리

**검증**: UI 상태가 정상적으로 관리되는지 확인

---

### Phase 3: Features 분리 (Feature Separation)

**목표**: 사용자 기능별로 코드 분리

#### Step 3.1: Post Features 생성

**참고 문서**: `fsd-migration-plan.md` (3. features 레이어)

- [ ] 3.1.1: Post Search Feature
  - `features/post-search/` 생성
  - UI, Model, API 분리

- [ ] 3.1.2: Post Filter Feature
  - `features/post-filter/` 생성
  - UI, Model, API 분리

- [ ] 3.1.3: Post CRUD Features
  - `features/post-create/` 생성
  - `features/post-edit/` 생성
  - `features/post-delete/` 생성

- [ ] 3.1.4: Post Pagination Feature
  - `features/post-pagination/` 생성

**검증**: 각 feature가 독립적으로 동작하는지 확인

---

#### Step 3.2: Comment Features 생성

**참고 문서**: `fsd-migration-plan.md` (3. features 레이어)

- [ ] 3.2.1: Comment CRUD Features
  - `features/comment-create/` 생성
  - `features/comment-edit/` 생성
  - `features/comment-delete/` 생성

- [ ] 3.2.2: Comment Like Feature
  - `features/comment-like/` 생성

**검증**: 각 feature가 독립적으로 동작하는지 확인

---

#### Step 3.3: User Feature 생성

**참고 문서**: `fsd-migration-plan.md` (3. features 레이어)

- [ ] 3.3.1: User View Feature
  - `features/user-view/` 생성

**검증**: Feature가 정상적으로 동작하는지 확인

---

#### Step 3.4: Features API 분리

**참고 문서**: `feature-api-separation-plan.md` (2-5단계)

- [ ] 3.4.1: Post Search API
  - `features/post-search/api/post-search-api.ts` 생성

- [ ] 3.4.2: Post Filter API
  - `features/post-filter/api/post-filter-api.ts` 생성

- [ ] 3.4.3: Comment Like API
  - `features/comment-like/api/comment-like-api.ts` 생성

- [ ] 3.4.4: User View API
  - `features/user-view/api/user-view-api.ts` 생성

**검증**: Feature API가 정상적으로 동작하는지 확인

---

### Phase 4: Widgets 생성 (Widget Creation)

**목표**: 재사용 가능한 UI 블록 생성

#### Step 4.1: Comment List Widget

**참고 문서**: `widget-data-reusability-plan.md` (1단계)

- [ ] 4.1.1: Comment List Model
  - `widgets/comment-list/model/useCommentList.ts` 생성

- [ ] 4.1.2: Comment List UI
  - `widgets/comment-list/ui/CommentList.tsx` 생성

**검증**: Widget이 독립적으로 동작하는지 확인

---

#### Step 4.2: Post List Widget

**참고 문서**: `widget-data-reusability-plan.md` (2단계)

- [ ] 4.2.1: Post List Model
  - `widgets/post-list/model/usePostList.ts` 생성

- [ ] 4.2.2: Post List UI
  - `widgets/post-list/ui/PostList.tsx` 생성

**검증**: Widget이 독립적으로 동작하는지 확인

---

#### Step 4.3: Post Detail Widget

**참고 문서**: `widget-data-reusability-plan.md` (3단계)

- [ ] 4.3.1: Post Detail Model
  - `widgets/post-detail/model/usePostDetail.ts` 생성

- [ ] 4.3.2: Post Detail UI
  - `widgets/post-detail/ui/PostDetailDialog.tsx` 생성

**검증**: Widget이 독립적으로 동작하는지 확인

---

#### Step 4.4: Post Filter Widget

**참고 문서**: `widget-data-reusability-plan.md` (4단계)

- [ ] 4.4.1: Post Filter Model
  - `widgets/post-filter/model/usePostFilter.ts` 생성

- [ ] 4.4.2: Post Filter UI
  - `widgets/post-filter/ui/PostFilter.tsx` 생성

**검증**: Widget이 독립적으로 동작하는지 확인

---

### Phase 5: Shared 정리 (Shared Organization)

**목표**: 공통 컴포넌트 및 로직 분리

#### Step 5.1: Shared UI 이동

**참고 문서**: `fsd-migration-plan.md` (1. shared 레이어), `Rules/file-migration-guide.md`

- [ ] 5.1.1: 작업 전 커밋
  - 현재 상태 저장 (`Rules/rollback-guide.md` 참고)

- [ ] 5.1.2: UI 컴포넌트 이동
  - `components/index.tsx` → `shared/ui/index.tsx`
  - 타입 정의 적용 (`typescript-types-migration-plan.md` 4단계 참고)

- [ ] 5.1.3: Import 경로 업데이트
  - `Rules/file-migration-guide.md` 참고
  - grep으로 모든 import 경로 찾기
  - 일괄 변경 또는 수동 변경

- [ ] 5.1.4: index.ts 생성
  - `shared/ui/index.ts` 생성 (`Rules/index-export-rules.md` 참고)

**검증 방법:**

1. Import 경로 확인:
   ```bash
   # 아직 components를 import하는 파일이 있는지 확인
   grep -r "from.*components" src/
   # 결과가 없어야 함
   ```
2. 타입 체크: `tsc --noEmit` 실행 (우선)
3. 컴파일 확인: `pnpm run build` 실행 (필수 - 파일 이동이므로)
   - **📋 pnpm 작업 요청**: 사용자에게 `pnpm run build` 실행 요청
   - 사용자 확인 후 다음 단계 진행
4. 브라우저 테스트: `pnpm run dev` 실행 후 UI가 정상 렌더링되는지 확인
   - **📋 브라우저 테스트 요청**: 사용자에게 `pnpm run dev` 실행 및 기능 확인 요청

**성능 최적화**: 파일 이동은 중요한 변경이므로 빌드 확인 필수. 하지만 타입 체크를 먼저 통과한 후에만 빌드 실행.

**pnpm 작업 협업**: `Rules/pnpm-workflow-guide.md` 참고 - pnpm 명령어는 사용자에게 요청하고 확인을 받은 후 진행.

---

#### Step 5.2: Shared Lib 생성

**참고 문서**: `fsd-migration-plan.md` (1. shared 레이어)

- [ ] 5.2.1: 유틸리티 함수 분리
  - `shared/lib/text-utils.ts` 생성 (highlightText)
  - `shared/lib/url-utils.ts` 생성 (URL 파라미터 처리)

**검증**: 유틸리티 함수가 정상적으로 동작하는지 확인

---

#### Step 5.3: Shared API 클라이언트

**참고 문서**: `fsd-migration-plan.md` (1. shared 레이어)

- [ ] 5.3.1: API 클라이언트 설정
  - `shared/api/client.ts` 생성 (선택적)

**검증**: API 클라이언트가 정상적으로 동작하는지 확인

---

### Phase 6: Pages 리팩토링 (Page Refactoring)

**목표**: PostsManagerPage를 Widget 조합으로 변경

#### Step 6.1: PostsManagerPage 리팩토링

**⚠️ 매우 주의: 이 단계는 가장 위험합니다. 모든 기능이 정상 동작해야 합니다!**

**참고 문서**:

- `fsd-migration-plan.md` (5. pages 레이어)
- `widget-data-reusability-plan.md` (6단계)
- `Rules/refactoring-safety-guide.md` (필수 참고!)

**작업 전 준비:**

- [ ] 현재 PostsManagerPage의 모든 기능 동작 확인
- [ ] Git 커밋 (현재 상태 저장)
- [ ] `Rules/refactoring-safety-guide.md`의 "기존 기능 목록" 확인

**작업 단계:**

- [ ] 6.1.1: 직접 API 호출 제거
  - 모든 `fetch()` 호출을 feature 훅으로 대체
  - **하나씩 교체하고 각각 검증**

- [ ] 6.1.2: useState 최소화
  - Store로 상태 관리 이전
  - **기존 useState는 주석 처리 후 새 Store 사용, 검증 후 제거**

- [ ] 6.1.3: Widget 조합
  - PostList, PostFilter, CommentList 등 Widget 사용
  - **기존 UI는 주석 처리 후 새 Widget 사용, 검증 후 제거**

- [ ] 6.1.4: Feature 훅 사용
  - 각 기능별 feature 훅 사용

**검증 방법 (필수!):**

1. 타입 체크: `tsc --noEmit` 실행 (Agent 직접 실행 가능)
2. 컴파일 확인: `pnpm run build` 실행
   - **📋 pnpm 작업 요청**: 사용자에게 `pnpm run build` 실행 요청
   - 사용자 확인 후 다음 단계 진행
3. **기능 회귀 테스트 (매우 중요!):**
   - `Rules/refactoring-safety-guide.md`의 "리팩토링 후 검증 체크리스트" 모두 확인
   - 게시물 CRUD, 댓글 CRUD, 검색, 필터링, 정렬, 페이지네이션 모두 테스트
   - **📋 브라우저 테스트 요청**: 사용자에게 `pnpm run dev` 실행 및 기능 확인 요청
4. 화면 확인: 화면이 깨지지 않았는지 확인
5. Props Drilling 제거 확인
6. 코드 간결성 확인 (700줄 → 200줄 이하 목표)

**pnpm 작업 협업**: `Rules/pnpm-workflow-guide.md` 참고 - pnpm 명령어는 사용자에게 요청하고 확인을 받은 후 진행.

---

### Phase 7: 최종 정리 및 검증 (Final Cleanup)

**목표**: 전체 프로젝트 검증 및 최적화

#### Step 7.1: 타입 검증

**참고 문서**: `typescript-types-migration-plan.md` (6단계)

- [ ] 7.1.1: TypeScript 컴파일 오류 확인
  - `tsc --noEmit` 실행

- [ ] 7.1.2: any 타입 제거 확인
  - 모든 any 타입이 제거되었는지 확인

- [ ] 7.1.3: 타입 단언 최소화
  - 불필요한 `as` 사용 제거

**검증**: 타입 오류 없음 확인

---

#### Step 7.2: 코드 품질 검증

- [ ] 7.2.1: ESLint 오류 확인
  - **📋 pnpm 작업 요청**: 사용자에게 `pnpm run lint` 실행 요청
  - 사용자 확인 후 결과 확인

- [ ] 7.2.2: Props Drilling 제거 확인
  - 모든 컴포넌트에서 Props Drilling이 없는지 확인

- [ ] 7.2.3: 불필요한 useState 제거 확인
  - 모든 상태가 Store로 관리되는지 확인

**검증**: 코드 품질 기준 통과

---

#### Step 7.3: 기능 검증 (회귀 테스트)

**⚠️ 중요: 모든 기존 기능이 정상 동작해야 합니다!**

**참고 문서**: `Rules/refactoring-safety-guide.md`의 "기존 기능 목록" 및 "리팩토링 후 검증 체크리스트"

**게시물 기능 테스트:**

- [ ] 7.3.1: 게시물 목록 조회 (페이지네이션 포함)
- [ ] 7.3.2: 게시물 검색
- [ ] 7.3.3: 게시물 필터링 (태그별)
- [ ] 7.3.4: 게시물 정렬 (ID, 제목, 반응 등)
- [ ] 7.3.5: 게시물 추가
- [ ] 7.3.6: 게시물 수정
- [ ] 7.3.7: 게시물 삭제
- [ ] 7.3.8: 게시물 상세 보기 (다이얼로그)

**댓글 기능 테스트:**

- [ ] 7.3.9: 댓글 목록 조회 (게시물별)
- [ ] 7.3.10: 댓글 추가
- [ ] 7.3.11: 댓글 수정
- [ ] 7.3.12: 댓글 삭제
- [ ] 7.3.13: 댓글 좋아요

**사용자 기능 테스트:**

- [ ] 7.3.14: 사용자 정보 보기 (모달)

**UI 기능 테스트:**

- [ ] 7.3.15: 다이얼로그 열기/닫기
- [ ] 7.3.16: URL 파라미터 동기화 (skip, limit, search, sortBy, sortOrder, tag)
- [ ] 7.3.17: 로딩 상태 표시
- [ ] 7.3.18: 에러 처리

**화면 확인:**

- [ ] 7.3.19: 화면이 깨지지 않았는지 확인
- [ ] 7.3.20: 스타일이 동일하게 적용되는지 확인

**검증**: 모든 기능이 정상적으로 동작하고 화면이 깨지지 않았는지 확인

**pnpm 작업 협업**:

- Lint 검증: **📋 pnpm 작업 요청** - 사용자에게 `pnpm run lint` 실행 요청
- 빌드 확인: **📋 pnpm 작업 요청** - 사용자에게 `pnpm run build` 실행 요청
- 브라우저 테스트: **📋 브라우저 테스트 요청** - 사용자에게 `pnpm run dev` 실행 및 기능 확인 요청
- 사용자 확인 후 다음 단계 진행

---

#### Step 7.4: 체크리스트 확인

**참고 문서**: `.github/pull_request_template.md`

- [ ] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [ ] Props Drilling을 최소화했나요?
- [ ] shared 공통 컴포넌트를 분리했나요?
- [ ] shared 공통 로직을 분리했나요?
- [ ] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [ ] entities를 중심으로 ui를 분리했나요?
- [ ] entities를 중심으로 api를 분리했나요?
- [ ] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [ ] feature를 중심으로 ui를 분리했나요?
- [ ] feature를 중심으로 api를 분리했나요?
- [ ] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?

---

## 🔄 작업 흐름도

```
Phase 1: 기초 작업
  ├─ Step 1.1: TypeScript 타입 정의
  └─ Step 1.2: Entities API 기본 구조 생성

Phase 2: 상태 관리
  ├─ Step 2.1: Post Store 생성
  ├─ Step 2.2: Comment Store 생성
  ├─ Step 2.3: User Store 생성
  └─ Step 2.4: UI Store 생성

Phase 3: Features 분리
  ├─ Step 3.1: Post Features 생성
  ├─ Step 3.2: Comment Features 생성
  ├─ Step 3.3: User Feature 생성
  └─ Step 3.4: Features API 분리

Phase 4: Widgets 생성
  ├─ Step 4.1: Comment List Widget
  ├─ Step 4.2: Post List Widget
  ├─ Step 4.3: Post Detail Widget
  └─ Step 4.4: Post Filter Widget

Phase 5: Shared 정리
  ├─ Step 5.1: Shared UI 이동
  ├─ Step 5.2: Shared Lib 생성
  └─ Step 5.3: Shared API 클라이언트

Phase 6: Pages 리팩토링
  └─ Step 6.1: PostsManagerPage 리팩토링

Phase 7: 최종 정리 및 검증
  ├─ Step 7.1: 타입 검증
  ├─ Step 7.2: 코드 품질 검증
  ├─ Step 7.3: 기능 검증
  └─ Step 7.4: 체크리스트 확인
```

---

## ⚠️ 주의사항

### 작업 순서 준수

- 각 Phase는 순차적으로 진행해야 합니다
- 이전 Phase가 완료되지 않으면 다음 Phase로 진행하지 마세요
- 각 Step 내의 작업도 순서대로 진행하세요

### 검증 필수

- 각 Step 완료 후 반드시 검증을 수행하세요
- 검증 실패 시 `Rules/rollback-guide.md` 참고하여 롤백하세요
- 검증 방법은 각 Step의 "검증 방법" 섹션을 참고하세요

### 점진적 마이그레이션

- 한 번에 모든 것을 변경하지 마세요
- 작은 단위로 나누어 점진적으로 마이그레이션하세요
- 각 변경 후 테스트를 수행하세요

### 기능 보존 (가장 중요!)

- **⚠️ 이 작업은 리팩토링입니다. 기존 기능과 화면이 절대 깨지면 안 됩니다!**
- 각 Step 완료 후 `Rules/refactoring-safety-guide.md`의 회귀 테스트 체크리스트 확인
- 기능이 깨지면 즉시 롤백하고 작은 단계로 재시도
- Phase 6 (Pages 리팩토링)은 특히 주의 깊게 진행

### Git 커밋 전략

- 각 Step 완료 후 커밋 (`Rules/rollback-guide.md` 참고)
- 의미 있는 커밋 메시지 작성
- 문제 발생 시 빠르게 롤백 가능하도록 작은 단위로 커밋

---

## 📚 참고 문서

### 계획서 문서

- `fsd-migration-plan.md`: FSD 구조 분리 계획
- `state-management-plan.md`: Zustand 상태 관리 계획
- `typescript-types-migration-plan.md`: TypeScript 타입 정의 계획
- `feature-api-separation-plan.md`: Feature API 분리 계획
- `widget-data-reusability-plan.md`: Widget 데이터 재사용성 계획

### 규칙 및 가이드 문서

- `Rules/coding-rules.md`: 코딩 규칙
- `Rules/agent-guidelines.md`: Agent 작업 가이드라인
- `Rules/pnpm-workflow-guide.md`: **pnpm 작업 워크플로우 (필수!)** ⭐
- `Rules/refactoring-safety-guide.md`: **리팩토링 안전 가이드 (필수!)** ⭐
- `Rules/performance-optimization-guide.md`: **성능 최적화 가이드 (권장!)** ⚡
- `Rules/api-response-structure.md`: API 응답 구조 (타입 정의 시 필수 참고)
- `Rules/index-export-rules.md`: index.ts 생성 규칙
- `Rules/rollback-guide.md`: 롤백 방법 가이드
- `Rules/file-migration-guide.md`: 파일 이동 및 Import 업데이트 가이드
- `Rules/agent-validation-report.md`: Agent 검증 보고서

---

## 🎯 성공 기준

1. **타입 안정성**: 모든 any 타입 제거, 타입 오류 없음
2. **FSD 구조**: entities, features, widgets, shared 레이어 명확히 분리
3. **상태 관리**: Zustand Store로 모든 전역 상태 관리
4. **Props Drilling 제거**: 컴포넌트 간 props 전달 최소화
5. **재사용성**: Widget과 Feature가 독립적으로 재사용 가능
6. **코드 품질**: ESLint 오류 없음, 코드 간결성 향상

---

## 🚀 시작하기

### 필수 읽기 (작업 시작 전)

1. **`Rules/core-principles.md`** ⭐⭐⭐ **가장 중요!**
   - 핵심 원칙: 안정성, 속도, 정확성, 최소한의 작업

2. **`Rules/refactoring-safety-guide.md`** ⭐
   - 기능 보존 가이드 (리팩토링 안전)

3. **`Rules/pnpm-workflow-guide.md`** ⭐
   - pnpm 작업 협업 방법

4. **`Rules/performance-optimization-guide.md`** ⚡
   - 성능 최적화 방법

### 작업 진행

1. Phase 1부터 순차적으로 진행하세요
2. 각 Step 완료 후 체크리스트를 업데이트하세요
3. **핵심 원칙 준수**: 안정성 → 정확성 → 속도 → 최소한의 작업
4. **pnpm 작업은 사용자에게 요청하고 확인을 받은 후 진행하세요**
5. 문제가 발생하면 이전 단계로 돌아가서 확인하세요

**핵심 원칙을 지키면 안전하고 빠르고 정확하며 효율적인 작업이 가능합니다! 🚀**
