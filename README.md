# Chapter3-3. 기능 중심 아키텍처와 프로젝트 폴더구조

## [3주차] 기본과제

여러분은 게시판을 관리할 수 있는 Admin 코드를 인수인계 받았습니다. 다행히 못 알아볼 정도의 더티코드는 아니고 적당히 잘 만든 것 같지만 정리가 된 것 같지 않은 아주 현실감 있는 익숙한 느낌의 코드였습니다.

우리는 지금까지 배웠던 내용을 토대로 해당 코드들을 클린하게 정돈하고 FSD 아키텍쳐를 활용해서 정리해보려고 합니다.

**여러분들은 해당 코드를 분석해보니 다음과 같은 문제점들을 발견할 수 있었습니다.**

1. 컴포넌트가 너무 크고 복잡하다.
2. Typescript를 사용하고 있지만 Type처리가 부실하다.
3. 상태관리의 개념없이 너무 많은 상태를 가지고 있다.
4. useEffect 관리가 안되고 있다.
5. 비동기 처리 로직이 복잡하게 구성되어 있다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. Typescript를 확실히 사용해서 코드의 이해와 리팩토링에 대한 안정성을 확보합니다.
2. 컴포넌트에 단일 책임 원칙을 부여하여 작게 만들고자 합니다.
3. 적절한 관심사의 분리를 통해서 폴더구조를 만드려고 합니다.
4. 이때 배웠던 FSD를 한번 적용해보려고 합니다.

**Basic 과제**

상태관리를 사용하여 관심리를 분리하고 FSD 폴더 구조를 적용하기

```markdown
목표:
전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기

- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기

- FSD(Feature-Sliced Design)에 대한 이해

- FSD를 통한 관심사의 분리에 대한 이해
 - 단일책임과 역할이란 무엇인가?
 - 관심사를 하나만 가지고 있는가?
 - 어디에 무엇을 넣어야 하는가?


체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요? (기능별로 필요시)
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?
```



## [3주차] 심화과제

여러분들은 비동기 코드가 들어가고 서버와 통신을 하기 시작하니 상태관리가 엄청나게 복잡해진다는 것을 알았습니다. 그래서 서버상태관리를 도입을 하면 보다 함수형 패러다임으로 선언적으로 비동기를 관리할 수 있다는 사실을 알게 되었습니다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. TanstackQuery를 이해하고 적용해보자.
2. api의 관리를 잘 할 수 있는 표준을 만들자.
3. 기존에 만들어진 코드를 통해 낙관적인 업데이트를 적용해보자.

**Advanced 과제**

TanstackQuery를 이용하여 코드를 개선하기

```markdown
목표:
서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

체크포인트
- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?
- [x] 낙관적인 업데이트가 적용되었는가?
- [ ] 에러 핸들링이 적절히 구현되었는가? (추후 개선 필요)
- [x] 서버 상태와 클라이언트 상태가 명확히 분리되었는가?
- [x] 코드가 간결하고 유지보수가 용이한 구조로 작성되었는가?
- [ ] TanStack Query의 Devtools가 정상적으로 작동하는가? (미설정)
```


## [3주차] 최종 과제

FSD는 하나의 제안이지만, 여러분들은 FSD를 적용해보고 나면 조금 더 나은 구조를 만들 수 있다는 것을 알게 되었습니다. 
그래서 여러분들은 FSD를 적용해보고 나서 다음과 같은 추가적인 목표를 세웠습니다.

**조금 더 현대적이면서도 기능 중심의 폴더 구조를 만들 수 있지 않을까?**

최종 목표는 다음과 같습니다.
FSD가 아닌 자신만의 기능 중심의 폴더 구조를 만들어보세요.

꼭 기억할 점
1. 자신만의 기능 중심의 폴더라고 했지만, 그 모습이 상당히 유니크하고 독창적이지는 않을 거에요. 아마 적절한 모법사례의 조합으로 수렴될 거에요.
2. 그리고 그게 잘하는 거에요. 좋은 코드는? 자신보돠 남들에게 모두에게 이해하기 쉬운 코드니까요.

---

## 📁 FSD 아키텍처 설계

### 🎯 개요

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 적용하여 700줄 이상의 단일 컴포넌트를 체계적으로 분리하고, 명확한 책임 분리와 유지보수성을 확보했습니다.

**핵심 성과:**
- PostsManagerPage: 700+ 줄 → 230 줄 (67% 감소)
- 컴포넌트 재사용성 향상
- 단일 책임 원칙 준수
- Props Drilling 최소화
- 서버 상태와 클라이언트 상태 명확히 분리

### 📂 프로젝트 폴더 구조

```
src/
├── app/                      # 애플리케이션 진입점 및 전역 설정
│   └── providers/
│       └── QueryProvider.tsx # TanStack Query 설정
│
├── pages/                    # 페이지 레벨 컴포넌트
│   └── posts-manager/
│       └── ui/
│           └── PostsManagerPage.tsx
│
├── widgets/                  # 복합 UI 블록 (재사용 가능한 컴포넌트 조합)
│   ├── post-table/
│   │   └── ui/
│   │       └── PostTable.tsx
│   ├── post-detail/
│   │   └── ui/
│   │       └── PostDetail.tsx
│   └── user-modal/
│       └── ui/
│           └── UserModal.tsx
│
├── features/                 # 사용자 행동 및 비즈니스 로직
│   ├── post-add/
│   │   └── ui/
│   │       └── PostAddDialog.tsx
│   ├── post-edit/
│   │   └── ui/
│   │       └── PostEditDialog.tsx
│   ├── post-search/
│   │   ├── model/
│   │   │   └── store.ts      # 검색/필터 상태 (Jotai atoms)
│   │   └── ui/
│   │       └── PostSearchBar.tsx
│   ├── comment-add/
│   │   └── ui/
│   │       └── CommentAddDialog.tsx
│   └── comment-edit/
│       └── ui/
│           └── CommentEditDialog.tsx
│
├── entities/                 # 비즈니스 엔티티 (도메인 모델)
│   ├── post/
│   │   ├── api/
│   │   │   └── index.ts      # Post API 함수
│   │   ├── model/
│   │   │   └── usePost.ts    # Post Query/Mutation 훅
│   │   └── ui/
│   │       └── PostCard.tsx
│   ├── comment/
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   └── useComment.ts
│   │   └── ui/
│   │       └── CommentCard.tsx
│   ├── user/
│   │   ├── api/
│   │   │   └── index.ts
│   │   └── model/
│   │       └── useUser.ts
│   └── tag/
│       └── model/
│           └── useTag.ts
│
└── shared/                   # 공통 유틸리티 및 인프라
    ├── api/
    │   └── client.ts         # REST API 클라이언트
    ├── types/
    │   └── index.ts          # 공통 타입 정의
    ├── ui/                   # 기본 UI 컴포넌트
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Dialog.tsx
    │   ├── Table.tsx
    │   └── ...
    └── lib/
        └── highlight.tsx     # 유틸리티 함수
```

### 🏗️ 레이어별 설계 원칙과 의도

#### 1️⃣ **app** - 애플리케이션 레이어

**역할:** 애플리케이션 진입점 및 전역 설정 관리

**구현 내용:**
- `QueryProvider.tsx`: TanStack Query 클라이언트 설정
  - `staleTime: 60초` - 1분간 데이터를 신선하게 유지
  - `retry: 1` - 실패 시 1번만 재시도
  - `refetchOnWindowFocus: false` - 윈도우 포커스 시 자동 갱신 비활성화

**설계 의도:**
- 애플리케이션 전역에서 사용되는 Provider를 한 곳에서 관리
- 서버 상태 관리 정책을 중앙화하여 일관성 확보
- 향후 ErrorBoundary, Router 등 다른 Provider 추가 시 확장 용이

#### 2️⃣ **pages** - 페이지 레이어

**역할:** 라우팅 단위의 최상위 컴포넌트 (데이터 조합 및 레이아웃 구성)

**구현 내용:**
- `PostsManagerPage.tsx` (230줄)
  - widgets(PostTable, PostDetail, UserModal) 조합
  - features(PostSearchBar, PostAddDialog) 배치
  - 페이지네이션, 검색, 태그 필터 상태 관리 (Jotai)
  - URL 쿼리 파라미터와 상태 동기화

**설계 의도:**
- **조합(Composition)에만 집중**: 직접적인 비즈니스 로직이나 API 호출 없음
- **데이터 흐름 제어**: 어떤 위젯과 기능을 어떻게 배치할지 결정
- **단일 책임**: "이 페이지가 무엇을 보여주는가"에만 집중
- 기존 700줄 코드가 여러 레이어로 분리되면서 페이지는 230줄로 축소

#### 3️⃣ **widgets** - 위젯 레이어

**역할:** 재사용 가능한 복합 UI 블록 (여러 entities와 features 조합)

**구현 내용:**
- `PostTable.tsx`: 게시물 목록 테이블
  - Post 엔티티 목록 렌더링
  - Like/Dislike 버튼 (useMutationPostLike/Dislike)
  - Edit/Delete 액션 버튼
  - 검색어 하이라이팅
  - 태그 필터링

- `PostDetail.tsx`: 게시물 상세 및 댓글
  - 선택된 Post 표시
  - Comment 목록 렌더링
  - 댓글 CRUD 기능 통합

- `UserModal.tsx`: 사용자 정보 모달
  - User 정보 표시
  - 해당 사용자의 게시물 목록

**설계 의도:**
- **재사용성**: 다른 페이지에서도 동일한 위젯 사용 가능
- **독립성**: props만으로 동작하며 외부 상태에 의존하지 않음
- **데이터 조합**: 여러 entities의 데이터를 의미 있는 형태로 결합
- **단일 책임**: 특정 UI 영역의 완전한 기능 제공

**widgets vs features 구분 기준:**
- **widgets**: 여러 엔티티를 조합하여 "보여주는" 것에 집중 (PostTable, PostDetail)
- **features**: 사용자의 "행동"을 처리 (PostAdd, PostEdit, CommentAdd)

#### 4️⃣ **features** - 피처 레이어

**역할:** 사용자 행동 및 인터랙션 처리 (비즈니스 로직)

**구현 내용:**

**A. Post 관련 기능**
- `PostAddDialog.tsx`: 게시물 생성 다이얼로그
  - `useMutationPostAdd()` 사용
  - 폼 검증 및 제출 처리

- `PostEditDialog.tsx`: 게시물 수정 다이얼로그
  - `useMutationPostUpdate()` 사용
  - 기존 데이터 로드 및 수정

**B. Comment 관련 기능**
- `CommentAddDialog.tsx`: 댓글 작성
- `CommentEditDialog.tsx`: 댓글 수정

**C. 검색 및 필터링**
- `PostSearchBar.tsx`: 검색 UI
- `store.ts` (Jotai atoms):
  ```typescript
  searchQueryAtom      // 검색어
  selectedTagAtom      // 선택된 태그
  paginationAtom       // 페이지네이션 상태
  sortOrderAtom        // 정렬 순서
  ```

**설계 의도:**
- **사용자 중심 설계**: 각 기능이 하나의 사용자 행동을 담당
- **상태 관리 분리**:
  - **전역 상태(Jotai)**: UI 상태 (검색어, 필터, 페이지)
  - **서버 상태(TanStack Query)**: API 데이터 (게시물, 댓글)
- **재사용성**: 다른 페이지에서 동일한 기능 재사용 가능
- **단일 책임**: 하나의 기능만 담당하여 테스트와 유지보수 용이

#### 5️⃣ **entities** - 엔티티 레이어

**역할:** 비즈니스 엔티티의 데이터 모델, API, UI 표현

**구조: api / model / ui 3단 분리**

**구현 내용:**

**A. Post 엔티티**
```
entities/post/
├── api/index.ts          # POST API 함수 (getPosts, createPost, updatePost...)
├── model/usePost.ts      # TanStack Query 훅 (useQueryPosts, useMutationPostAdd...)
└── ui/PostCard.tsx       # Post 단일 UI 컴포넌트
```

- **api**: REST API 호출 함수
  - `getPosts()`, `searchPosts()`, `getPostsByTag()`
  - `createPost()`, `updatePost()`, `deletePost()`
  - `likePost()`, `dislikePost()`

- **model**: TanStack Query 훅 (src/entities/post/model/usePost.ts:7-189)
  - `useQueryPosts()` - 게시물 목록 조회
  - `useQueryPostsSearch()` - 검색
  - `useQueryPostsByTag()` - 태그 필터링
  - `useMutationPostAdd()` - 생성 (캐시 직접 업데이트)
  - `useMutationPostUpdate()` - 수정 (캐시 직접 업데이트)
  - `useMutationPostDelete()` - 삭제 (캐시 직접 업데이트)
  - `useMutationPostLike()` - 좋아요 (낙관적 업데이트)
  - `useMutationPostDislike()` - 싫어요 (낙관적 업데이트)

- **ui**: Post 표현 컴포넌트

**B. Comment, User, Tag 엔티티**
- 동일한 api/model/ui 구조
- 각 엔티티의 고유한 비즈니스 로직 캡슐화

**설계 의도:**
- **도메인 중심 설계**: 비즈니스 엔티티를 중심으로 코드 조직화
- **응집도**: 관련된 api, model, ui가 한 곳에 모여 있어 찾기 쉬움
- **재사용성**: 어디서든 동일한 방식으로 엔티티 사용
- **타입 안정성**: 각 엔티티의 타입이 명확히 정의됨
- **독립성**: 엔티티 간 의존성 최소화

**중요한 설계 결정: api/model 분리 이유**
- **api**: 순수한 HTTP 통신 (fetch, axios 등)
- **model**: 데이터 관리 로직 (캐싱, 상태, 동기화)
- 이렇게 분리하면 나중에 API 클라이언트를 교체하거나 캐싱 전략을 변경해도 서로 영향을 주지 않음

#### 6️⃣ **shared** - 공유 레이어

**역할:** 프로젝트 전역에서 사용되는 공통 코드

**구현 내용:**

**A. types** - 타입 정의
```typescript
// 모든 엔티티 타입과 DTO 정의
User, Post, Comment, Tag
CreatePostDto, UpdatePostDto, CreateCommentDto, UpdateCommentDto
PostsResponse, CommentsResponse, UsersResponse
```

**B. api/client** - REST API 클라이언트
```typescript
export const apiClient = {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data?: unknown): Promise<T>
  put<T>(url: string, data?: unknown): Promise<T>
  patch<T>(url: string, data?: unknown): Promise<T>
  delete(url: string): Promise<void>
}
```

**C. ui** - 기본 UI 컴포넌트
- Button, Input, Textarea
- Dialog, Card, Table
- Select, Pagination
- 모두 Headless UI 스타일 (비즈니스 로직 없음)

**D. lib** - 유틸리티 함수
- `highlightText()`: 검색어 하이라이팅

**설계 의도:**
- **재사용성**: 프로젝트 어디서든 import 가능
- **의존성 방향**: shared는 다른 레이어에 의존하지 않음 (의존성 최하위)
- **변경 최소화**: 한 번 작성하면 거의 수정하지 않음
- **도메인 독립성**: 비즈니스 로직 없이 순수 기술적 유틸리티만 포함

### 🔄 상태 관리 전략

**핵심 원칙: 서버 상태와 클라이언트 상태 명확히 분리**

#### 1. 서버 상태 (TanStack Query)
**대상:** API로부터 가져오는 모든 데이터
- Posts, Comments, Users, Tags
- CRUD 작업 결과

**전략:**
- `useQuery`: 데이터 조회 및 캐싱
- `useMutation`: 데이터 변경
- 쿼리 키 설계:
  ```typescript
  ["posts", limit, skip]           // 페이지네이션
  ["posts", "search", query]       // 검색
  ["posts", "tag", tag]            // 태그 필터
  ["comments", postId]             // 특정 게시물의 댓글
  ["users"]                        // 사용자 목록
  ```

#### 2. 클라이언트 상태 (Jotai)
**대상:** UI 상태 및 사용자 인터랙션 상태
- 검색어 (`searchQueryAtom`)
- 선택된 태그 (`selectedTagAtom`)
- 페이지네이션 (`paginationAtom`)
- 정렬 순서 (`sortOrderAtom`)

**장점:**
- Props Drilling 완전히 제거
- 전역 상태를 필요한 컴포넌트에서만 구독
- Atom 단위로 세밀한 리렌더링 제어

#### 3. URL 상태 (선택적)
- URL 쿼리 파라미터로 검색/필터 상태 동기화
- 새로고침 시에도 상태 유지
- 공유 가능한 링크 생성

**왜 이렇게 분리했는가?**
1. **책임 분리**: 각 도구가 가장 잘하는 일만 담당
2. **성능 최적화**: TanStack Query의 자동 캐싱/동기화 활용
3. **개발자 경험**: 서버 데이터는 선언적으로, UI 상태는 간단하게
4. **유지보수성**: 상태의 출처가 명확하여 디버깅 용이

### ⚡ TanStack Query 캐시 최적화 전략

#### 문제 상황
Mock API 환경에서는 실제 데이터베이스가 없어 서버 응답을 신뢰할 수 없음.
`invalidateQueries`로 refetch하면 변경 사항이 반영되지 않은 기존 데이터를 다시 가져옴.

#### 해결 방법: `setQueryData`를 이용한 직접 캐시 갱신

**1. CRUD 작업 (Post/Comment 생성, 수정, 삭제)**
```typescript
// 예: Post 추가 시 (src/entities/post/model/usePost.ts:31-56)
onSuccess: (newPost) => {
  // 모든 posts 관련 쿼리 캐시를 가져옴
  const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

  // 각 캐시에 새 게시물 추가
  queries.forEach(([key, oldData]) => {
    if (!oldData) return
    const old = oldData as PostsResponse

    queryClient.setQueryData(key, {
      ...old,
      posts: [newPost, ...old.posts],  // 맨 앞에 추가
      total: old.total + 1,             // 총 개수 증가
    })
  })
}
```

**장점:**
- ✅ 즉각적인 UI 업데이트 (refetch 불필요)
- ✅ 네트워크 요청 최소화
- ✅ 모든 관련 쿼리(검색, 태그 필터, 페이지네이션) 동시 업데이트

**2. 낙관적 업데이트 (Like/Dislike)**
```typescript
// 예: Like 버튼 클릭 시 (src/entities/post/model/usePost.ts:106-145)
onMutate: async (variables) => {
  // 진행 중인 refetch 취소
  await queryClient.cancelQueries({ queryKey: [POST_QUERY_KEY] })

  // UI를 먼저 업데이트 (API 응답 기다리지 않음)
  const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

  queries.forEach(([key, oldData]) => {
    if (!oldData) return
    const old = oldData as PostsResponse

    queryClient.setQueryData(key, {
      ...old,
      posts: old.posts.map((post) =>
        post.id === variables.id
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                likes: (post.reactions?.likes || 0) + 1,  // 즉시 증가
              },
            }
          : post
      ),
    })
  })
}
// onSuccess, onError 제거 - Mock 환경에서는 서버 응답 무시
```

**장점:**
- ✅ 즉각적인 사용자 피드백 (버튼 클릭 즉시 숫자 증가)
- ✅ 네트워크 지연 무관하게 빠른 UI 반응
- ✅ 더 나은 사용자 경험 (UX)

**3. 전체 캐시 전략 요약**

| 작업 | 전략 | 이유 |
|------|------|------|
| Post/Comment 조회 | `useQuery` | 자동 캐싱 및 중복 제거 |
| Post/Comment 생성 | `setQueryData` | Mock API 환경에서 즉시 반영 |
| Post/Comment 수정 | `setQueryData` | Mock API 환경에서 즉시 반영 |
| Post/Comment 삭제 | `setQueryData` | Mock API 환경에서 즉시 반영 |
| Like/Dislike | 낙관적 업데이트 | 즉각적인 사용자 피드백 |
| User 조회 | `useQuery` + 5분 캐시 | 변경 빈도 낮아 재사용 |

### ✅ 이 설계로 달성한 것들

#### 1. 코드 품질 개선
- ✅ **컴포넌트 크기 감소**: 700줄 → 230줄 (67% 감소)
- ✅ **단일 책임 원칙**: 각 컴포넌트가 하나의 명확한 역할만 수행
- ✅ **높은 응집도**: 관련 코드가 한 곳에 모여 있음
- ✅ **낮은 결합도**: 레이어 간 의존성 최소화

#### 2. 개발자 경험 개선
- ✅ **직관적인 구조**: 파일 위치만 봐도 역할 파악 가능
- ✅ **쉬운 네비게이션**: `@/*` path alias로 import 간결화
- ✅ **명확한 명명 규칙**: `useQuery*`, `useMutation*` 패턴 일관성
- ✅ **타입 안정성**: TypeScript로 모든 데이터 타입 정의

#### 3. 유지보수성 향상
- ✅ **변경 영향 최소화**: 한 레이어 수정이 다른 레이어에 영향 안 줌
- ✅ **쉬운 테스트**: 각 레이어를 독립적으로 테스트 가능
- ✅ **재사용성**: widgets, features를 다른 페이지에서 재사용 가능

#### 4. 성능 최적화
- ✅ **스마트 캐싱**: TanStack Query로 불필요한 API 호출 제거
- ✅ **세밀한 리렌더링**: Jotai atom 단위로 필요한 부분만 리렌더링
- ✅ **낙관적 업데이트**: 네트워크 지연 없는 즉각적인 UI 반응

#### 5. 확장성 확보
- ✅ **새 기능 추가 용이**: 새로운 entity나 feature 추가 시 기존 코드 영향 없음
- ✅ **레이어 독립성**: API 클라이언트 교체, 상태 관리 라이브러리 변경 가능
- ✅ **팀 협업 친화적**: 레이어별로 작업 분담 가능

### 📚 참고 자료
- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [Jotai 공식 문서](https://jotai.org/)
- [DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md) - 상세 개발 과정 기록