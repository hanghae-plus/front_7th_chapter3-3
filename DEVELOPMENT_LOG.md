# 개발 로그

## 화면 기능 동작 범위
### origin src
헤더에 있는 [홈, 대시보드, 설정] 버튼 기능 없음
게시물 추가 가능: 게시물 목록 최상단에 노출
검색하면 목록에서 검색값이 있는 게시물만 노출하는 것이 아닌 현재 노출된 게시물의 제목에 검색값이 하이라이트 됨: 로링되는 화면없이 변화(하이라이트)되기 전 화면에서 멈춰있다가 검색값을 찾으면 하이라이트 됨
태그 선택 옵션 가능: 선택한 태그가 있는 게시물만 노출
정렬 기준 옵션 안됨: ID, 제목, 반응 옵션을 눌러도 반응 없음
오름차순/내림차순 옵션 안됨: 반응 없음

게시물 테이블 기능 중...
반응: READ ONLY
작업 내, 댓글/수정/삭제 모두 가능

하단에 게시물 노출 개수와 페이지네이션 모두 가능

### 1차 수정된 src
| origin src 기능에서 안되는 것과 바뀐 기능만 작성
게시물 추가 가능 안됨:
  게시물 추가가 된 후 다시 새로고침을 함(아래 두 api 실행)
    Request URL
    http://localhost:5174/api/posts?limit=10&skip=0
    Request Method
    GET
    Status Code
    304 Not Modified
    Remote Address
    [::1]:5174
    Referrer Policy
    strict-origin-when-cross-origin

    Request URL
    http://localhost:5174/api/users?limit=0&select=username,image
    Request Method
    GET
    Status Code
    304 Not Modified
    Remote Address
    [::1]:5174
    Referrer Policy
    strict-origin-when-cross-origin
검색 할 때, 게시물 목록에 노출되는 것은 동일. 하지만 검색값이 바뀔 때마다 로딩화면이 나옴. 이전에 입력했었던 검색값을 입력하면 그때는 로딩화면 없이 바로 반응함

게시물 테이블 기능 중...
작업 내, 댓글/수정/삭제 모두 안됨: 게시물 추가 기능의 이슈와 동일. 그래서 수정한 후 화면은 안바뀌었지만 다시 수정버튼을 누르면 수정된 내용으로 나오는 것을 확인할 수 있음

### 2차 수정된 src
| 1차 수정된 src 기능에서 안되는 것 수정 및 추가 기능
게시물 추가 이슈 처리

게시물 테이블 기능 중...
작업 내, 댓글/수정/삭제 기능 이슈 처리

추가된 기능
게시물 like/dislike 반응 기능 추가

## 2025-12-12: FSD 아키텍처 적용 및 TanStack Query, Jotai 도입

### 📝 변경 개요
게시물 관리 Admin 코드를 FSD(Feature-Sliced Design) 아키텍처로 리팩토링하고, 전역 상태 관리(Jotai)와 서버 상태 관리(TanStack Query)를 도입하여 코드의 구조화와 유지보수성을 개선했습니다.

### 🎯 수정한 이유
1. **컴포넌트 복잡도**: 기존 PostsManagerPage가 700줄이 넘는 단일 파일로 되어 있어 유지보수가 어려움
2. **타입 안정성**: TypeScript를 사용하지만 타입 처리가 부실하여 런타임 오류 가능성 존재
3. **상태 관리 혼란**: 상태 관리 개념 없이 너무 많은 useState를 사용하여 상태 추적이 어려움
4. **useEffect 남용**: 비동기 처리 로직이 복잡하게 구성되어 있고 useEffect 관리가 안 됨
5. **관심사 미분리**: 비즈니스 로직, UI, API 호출이 한 곳에 섞여 있어 재사용성과 테스트 용이성 저하

### 🔧 수정 내용

#### 1. 프로젝트 구조 변경 (FSD 아키텍처 적용)

**변경 전**:
```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── index.tsx (모든 UI 컴포넌트)
└── pages/
    └── PostsManagerPage.tsx (700+ 줄)
```

**변경 후**:
```
src/
├── app/
│   └── providers/
│       └── QueryProvider.tsx
├── pages/
│   └── posts-manager/
│       └── ui/
│           └── PostsManagerPage.tsx
├── widgets/
│   ├── post-table/ui/PostTable.tsx
│   ├── post-detail/ui/PostDetail.tsx
│   └── user-modal/ui/UserModal.tsx
├── features/
│   ├── post-add/ui/PostAddDialog.tsx
│   ├── post-edit/ui/PostEditDialog.tsx
│   ├── post-search/
│   │   ├── model/store.ts
│   │   └── ui/PostSearchBar.tsx
│   ├── comment-add/ui/CommentAddDialog.tsx
│   └── comment-edit/ui/CommentEditDialog.tsx
├── entities/
│   ├── post/
│   │   ├── api/index.ts
│   │   ├── model/usePost.ts
│   │   └── ui/PostCard.tsx
│   ├── comment/
│   │   ├── api/index.ts
│   │   ├── model/useComment.ts
│   │   └── ui/CommentItem.tsx
│   ├── user/
│   │   ├── api/index.ts
│   │   └── model/useUser.ts
│   └── tag/
│       ├── api/index.ts
│       └── model/useTag.ts
└── shared/
    ├── api/client.ts
    ├── lib/highlight.tsx
    ├── types/index.ts
    └── ui/
        ├── index.tsx (공통 UI 컴포넌트)
        ├── Header.tsx
        └── Footer.tsx
```

#### 2. 라이브러리 추가

**설치한 패키지**:
```bash
pnpm add jotai @tanstack/react-query
pnpm add -D @types/node
```

- **jotai**: 전역 상태 관리 (검색어, 필터, 정렬, 페이지네이션)
- **@tanstack/react-query**: 서버 상태 관리 (API 호출, 캐싱, 동기화)
- **@types/node**: path 모듈 타입 정의

#### 3. shared 레이어 구현

**src/shared/types/index.ts** (신규):
```typescript
// 엔티티별 타입 정의
export interface User { ... }
export interface Post { ... }
export interface Comment { ... }
export interface Tag { ... }

// DTO 타입 정의
export interface CreatePostDto { ... }
export interface UpdatePostDto { ... }
```

**src/shared/api/client.ts** (신규):
```typescript
export const apiClient = {
  async get<T>(url: string): Promise<T> { ... },
  async post<T>(url: string, data: unknown): Promise<T> { ... },
  async put<T>(url: string, data: unknown): Promise<T> { ... },
  async patch<T>(url: string, data: unknown): Promise<T> { ... },
  async delete(url: string): Promise<void> { ... },
}
```

**src/shared/lib/highlight.tsx** (신규):
- 검색어 하이라이트 기능을 공통 유틸로 분리

**src/shared/ui/index.tsx**:
- 기존 components/index.tsx를 TypeScript 타입과 함께 개선
- Button, Input, Card, Table, Dialog, Select 등 공통 UI 컴포넌트

#### 4. entities 레이어 구현

각 엔티티(Post, Comment, User, Tag)별로 api, model, ui 분리:

**Post Entity 예시**:
```typescript
// entities/post/api/index.ts
export const postApi = {
  async getPosts(params): Promise<PostsResponse> { ... },
  async searchPosts(query: string): Promise<PostsResponse> { ... },
  async getPostsByTag(tag: string): Promise<PostsResponse> { ... },
  async createPost(data: CreatePostDto): Promise<Post> { ... },
  async updatePost(id: number, data: UpdatePostDto): Promise<Post> { ... },
  async deletePost(id: number): Promise<void> { ... },
}

// entities/post/model/usePost.ts
export const useQueryPosts = (params) => useQuery({ ... })
export const useQueryPostsSearch = (query) => useQuery({ ... })
export const useQueryPostsByTag = (tag) => useQuery({ ... })
export const useMutationPostAdd = () => useMutation({ ... })
export const useMutationPostUpdate = () => useMutation({ ... })
export const useMutationPostDelete = () => useMutation({ ... })
```

#### 5. features 레이어 구현

사용자 행동(이벤트 처리) 중심으로 분리:

**features/post-search/model/store.ts** (신규):
```typescript
import { atom } from "jotai"

export const searchQueryAtom = atom<string>("")
export const selectedTagAtom = atom<string>("")
export const sortByAtom = atom<string>("")
export const sortOrderAtom = atom<"asc" | "desc">("asc")
export const paginationAtom = atom({ skip: 0, limit: 10 })
```

- PostAddDialog: 게시물 추가 기능
- PostEditDialog: 게시물 수정 기능
- PostSearchBar: 검색 기능
- CommentAddDialog: 댓글 추가 기능
- CommentEditDialog: 댓글 수정 기능

#### 6. widgets 레이어 구현

재사용 가능한 복잡한 UI 블록:

- **PostTable**: 게시물 목록 테이블 (게시물 카드, 편집/삭제 버튼 포함)
- **PostDetail**: 게시물 상세 및 댓글 목록
- **UserModal**: 사용자 정보 모달

#### 7. pages 레이어 구현

**src/pages/posts-manager/ui/PostsManagerPage.tsx**:

**변경 전**: 700+ 줄의 단일 파일
**변경 후**: 230줄로 축소, 비즈니스 로직은 각 레이어로 분리

```typescript
const PostsManagerPage = () => {
  // Jotai atoms 사용
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  // TanStack Query hooks 사용
  const { data: tagsData } = useQueryTags()
  const { data: postsData, isLoading } = useQueryPosts({ ...pagination })

  // 위젯 조합
  return (
    <Card>
      <PostSearchBar onSearch={handleSearch} />
      <PostTable posts={posts} ... />
      <PostDetail post={selectedPost} ... />
      <UserModal userId={selectedUserId} ... />
    </Card>
  )
}
```

#### 8. app 레이어 구현

**src/app/providers/QueryProvider.tsx** (신규):
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1분
    },
  },
})

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)
```

**src/App.tsx** 수정:
```typescript
const App = () => (
  <QueryProvider>
    <Router>
      <Header />
      <PostsManagerPage />
      <Footer />
    </Router>
  </QueryProvider>
)
```

#### 9. 설정 파일 수정

**tsconfig.app.json**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "vite-env.d.ts"]
}
```

**vite.config.ts**:
```typescript
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**vite-env.d.ts**:
```typescript
declare module "*.css" {
  const content: Record<string, string>
  export default content
}
```

### ✅ 장점

1. **코드 가독성 향상**
   - 700줄 단일 파일 → 역할별로 분리된 작은 파일들
   - 각 파일이 단일 책임 원칙을 준수

2. **재사용성 증가**
   - 공통 UI 컴포넌트를 shared/ui로 분리
   - entities, features, widgets를 다른 페이지에서도 재사용 가능

3. **타입 안정성 확보**
   - 모든 엔티티에 대한 타입 정의
   - API 응답 타입 명시로 런타임 오류 감소

4. **상태 관리 개선**
   - Jotai로 전역 상태 관리 (검색, 필터, 정렬)
   - TanStack Query로 서버 상태 관리 (캐싱, 리페칭, 낙관적 업데이트)
   - useEffect 의존성 문제 해결

5. **비동기 처리 간소화**
   - useQuery/useMutation으로 선언적 비동기 처리
   - 로딩, 에러 상태 자동 관리
   - 중복 API 호출 방지 (캐싱)

6. **유지보수성 향상**
   - 관심사의 분리로 수정 영향 범위 최소화
   - 각 레이어의 역할이 명확해 디버깅 용이

7. **테스트 용이성**
   - 각 레이어를 독립적으로 테스트 가능
   - Mock 데이터 주입이 쉬움

### ⚠️ 단점 및 고려사항

1. **초기 학습 곡선**
   - FSD 아키텍처 이해 필요
   - TanStack Query, Jotai 학습 필요
   - 폴더 구조가 복잡해 보일 수 있음

2. **파일 수 증가**
   - 단일 파일 → 50+ 파일로 증가
   - 작은 프로젝트에서는 오히려 복잡도 증가 가능

3. **번들 크기 증가**
   - @tanstack/react-query: ~50KB
   - jotai: ~5KB
   - 총 ~55KB 증가

4. **마이그레이션 비용**
   - 기존 코드를 완전히 재작성
   - 기존 사용처가 있다면 breaking change 발생

### 🐛 발생 가능한 이슈

#### Issue 1: TypeScript 빌드 에러 (index.css 타입 선언 누락)
**원인**:
- tsc가 index.css의 타입 선언을 찾지 못해 실패
- tsconfig.app.json의 include에 vite-env.d.ts가 빠져 있어 *.css 모듈 선언을 못 읽음

**해결방법**:
```json
// tsconfig.app.json
{
  "include": ["src", "vite-env.d.ts"]
}
```

```typescript
// vite-env.d.ts
declare module "*.css" {
  const content: Record<string, string>
  export default content
}
```

#### Issue 2: Query Key 중복으로 인한 캐시 충돌
**원인**:
- 동일한 queryKey를 다른 용도로 사용
- 예: `['posts']`를 검색, 태그 필터, 일반 조회에 모두 사용

**해결방법**:
```typescript
// 구체적인 queryKey 사용
useQuery({ queryKey: ['posts', 'search', query] })
useQuery({ queryKey: ['posts', 'tag', tag] })
useQuery({ queryKey: ['posts', limit, skip] })
```

#### Issue 3: Atom 초기화 타이밍 문제
**원인**:
- URL 파라미터에서 초기값을 읽어야 하는데 atom이 먼저 초기화됨

**해결방법**:
```typescript
// useEffect에서 URL 파라미터 동기화
useEffect(() => {
  const params = new URLSearchParams(location.search)
  setSearchQuery(params.get("search") || "")
  setSelectedTag(params.get("tag") || "")
}, [location.search])
```

### 🔍 테스트 체크리스트

- [ ] 게시물 목록 정상 로드
- [ ] 검색 기능 정상 동작
- [ ] 태그 필터링 정상 동작
- [ ] 정렬 기능 (ID, 제목, 반응) 정상 동작
- [ ] 페이지네이션 (이전/다음) 정상 동작
- [ ] 게시물 추가 기능 정상 동작
- [ ] 게시물 수정 기능 정상 동작
- [ ] 게시물 삭제 기능 정상 동작
- [ ] 게시물 상세 보기 및 댓글 목록 표시
- [ ] 댓글 추가 기능 정상 동작
- [ ] 댓글 수정 기능 정상 동작
- [ ] 댓글 삭제 기능 정상 동작
- [ ] 댓글 좋아요 기능 정상 동작
- [ ] 사용자 정보 모달 정상 표시
- [ ] URL 파라미터 동기화 정상 동작
- [ ] 로딩 상태 표시
- [ ] 에러 처리 정상 동작

### 📚 참고 자료

- **FSD 아키텍처 공식 문서**: https://feature-sliced.design/
- **TanStack Query 문서**: https://tanstack.com/query/latest
- **Jotai 문서**: https://jotai.org/
- **과제 가이드**: `8주차_과제_FSD_설계.md`

**주요 파일 경로**:
- 프로젝트 설정:
  - `tsconfig.app.json` (18-20줄: path aliases)
  - `vite.config.ts` (8-12줄: path aliases)
  - `vite-env.d.ts` (3-6줄: CSS 타입 선언)

- App 레이어:
  - `src/app/providers/QueryProvider.tsx`
  - `src/App.tsx`

- Shared 레이어:
  - `src/shared/types/index.ts`
  - `src/shared/api/client.ts`
  - `src/shared/lib/highlight.tsx`
  - `src/shared/ui/index.tsx`

- Entities 레이어:
  - `src/entities/post/api/index.ts`
  - `src/entities/post/model/usePost.ts`
  - `src/entities/comment/api/index.ts`
  - `src/entities/comment/model/useComment.ts`

- Features 레이어:
  - `src/features/post-search/model/store.ts`
  - `src/features/post-add/ui/PostAddDialog.tsx`
  - `src/features/post-edit/ui/PostEditDialog.tsx`

- Widgets 레이어:
  - `src/widgets/post-table/ui/PostTable.tsx`
  - `src/widgets/post-detail/ui/PostDetail.tsx`
  - `src/widgets/user-modal/ui/UserModal.tsx`

- Pages 레이어:
  - `src/pages/posts-manager/ui/PostsManagerPage.tsx`

### 🔄 후속 작업

- [ ] 단위 테스트 작성 (Vitest)
- [ ] E2E 테스트 작성
- [ ] 에러 바운더리 추가
- [ ] 로딩 스켈레톤 UI 개선
- [ ] 무한 스크롤 적용 검토
- [ ] React Query DevTools 추가
- [ ] 성능 모니터링 설정
- [ ] Storybook 설정 및 컴포넌트 문서화
- [ ] 접근성(a11y) 개선
- [ ] 다크 모드 지원

---

## 2025-12-13: React Query 캐시 처리 및 댓글 기능 개선

### 📝 변경 개요
React Query를 사용한 댓글 관련 API 처리 방식과 UI 반응 문제를 개선했습니다.  
`invalidateQueries` 대신 `setQueryData`를 사용하여 캐시를 직접 갱신하고, 댓글 좋아요는 낙관적 업데이트를 적용하여 UI를 즉시 반영하도록 변경했습니다.

### 🎯 수정한 이유
1. **UI 즉시 반영 필요**: 기존 `invalidateQueries` 사용 시 mock 데이터 환경에서 전체 재요청 발생, UI가 원래 데이터로 돌아가거나 반영되지 않음.
2. **좋아요 기능 문제**: 서버 mock 환경에서 `onSuccess` 기반 업데이트는 payload 중복 증가 혹은 화면 반영 불가.
3. **일관된 캐시 관리**: 댓글 추가/수정/삭제/좋아요 모두 캐시를 직접 갱신하여 데이터 신뢰성을 높임.

### 🔧 수정 내용

#### 1. 댓글 좋아요
**변경 전**:
```typescript
return useMutation({
  mutationFn: ({ id, likes, postId }) => commentApi.likeComment(id, likes),
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({
      queryKey: [COMMENT_QUERY_KEY, variables.postId],
      refetchType: 'all'
    })
  },
})
```

**변경 후 (낙관적 업데이트):**:
```typescript
return useMutation({
  mutationFn: ({ id, likes, postId }) => commentApi.likeComment(id, likes),
  onMutate: async (variables) => {
    await queryClient.cancelQueries({ queryKey: [COMMENT_QUERY_KEY, variables.postId] })

    queryClient.setQueryData<CommentsResponse>(
      [COMMENT_QUERY_KEY, variables.postId],
      (old) => {
        if (!old) return old

        return {
          ...old,
          comments: old.comments.map((comment) =>
            comment.id === variables.id
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          ),
        }
      }
    )
  },
})
```
* 서버 응답을 무시하고 UI를 먼저 갱신 (mock 데이터 환경 고려)
* onSuccess 제거

#### 2. 댓글 추가 / 수정 / 삭제
변경 전: invalidateQueries 사용
```typscript
queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEY, postId] })
```
변경 후: setQueryData 사용, 캐시 직접 갱신
```typescript
queryClient.setQueryData<CommentsResponse>(
  [COMMENT_QUERY_KEY, postId],
  (old) => {
    if (!old) return old
    return {
      ...old,
      comments: [
        ...old.comments,
        newComment // 추가 예시
      ]
    }
  }
)
```
* 댓글 수정 시: 댓글 리스트에서 해당 id만 갱신
* 댓글 삭제 시: 해당 id 제거

✅ 장점
UI 즉시 반영: 좋아요, 댓글 추가/수정/삭제 시 화면에서 즉시 반영
불필요한 API 호출 감소: mock 데이터 환경에서도 새로고침 없이 반영
일관된 캐시 관리: React Query 캐시를 직접 갱신하여 데이터 일관성 유지

⚠️ 단점 및 고려사항
서버 상태와 캐시 불일치 가능성: 실제 서버 환경에서는 낙관적 업데이트 실패 시 롤백 필요
복잡도 증가: 캐시 직접 갱신 로직이 추가되어 코드 가독성 다소 감소

🐛 발생 가능한 이슈
**Issue 1: 좋아요 클릭 시 payload 중복 증가**
원인: 기존 API 호출 시 onSuccess에서 기존 likes 값과 서버 반환값 중복 반영
해결방법:
낙관적 업데이트만 사용하고 onSuccess 제거
```typescript
onMutate: (variables) => {
  queryClient.setQueryData(..., ...)
}
```
**Issue 2: 댓글 삭제 후 UI 반영되지 않음**
원인: invalidateQueries 사용 시 mock 데이터 재요청으로 삭제 데이터 복원
해결방법:
setQueryData를 사용하여 삭제한 댓글만 캐시에서 제거

🔍 테스트 체크리스트
 댓글 추가 시 UI에 즉시 표시
 댓글 수정 시 UI에 변경 내용 즉시 반영
 댓글 삭제 시 UI에서 즉시 제거
 좋아요 클릭 시 UI에서 likes 수 즉시 증가
 서버 호출이 정상적으로 수행되는지 확인

📚 참고 자료
파일 경로:
 - src/hooks/comment.ts (10-100줄)
 - src/components/comment/CommentItem.tsx (5-50줄)
 - src/components/comment/CommentAddDialog.tsx (10-60줄)
- React Query 문서: https://tanstack.com/query/latest

🔄 후속 작업
 실제 서버 환경에서 낙관적 업데이트 실패 시 롤백 처리 로직 구현
 단위 테스트 작성 및 QA 진행



