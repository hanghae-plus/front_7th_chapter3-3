# FSD 레이어별 분리 기준

## 📚 학습 목표

이 문서를 읽고 나면 다음을 이해할 수 있습니다:
- 각 레이어에 무엇을 넣어야 하는지
- 새로운 기능을 추가할 때 어느 레이어에 넣어야 하는지
- 레이어 간 차이점과 분리 기준

---

## 🤔 "이 코드는 어디에 둬야 하지?"

FSD를 처음 사용할 때 가장 어려운 부분은 **"이 코드를 어느 레이어에 넣어야 하는가?"**입니다.

이 문서는 각 레이어에 무엇을 넣어야 하는지 **명확한 기준**을 제공합니다.

---

## 📋 레이어별 분리 기준 (의사결정 트리)

### 1단계: "이것이 여러 프로젝트에서 재사용 가능한가?"

**YES** → `shared/` 레이어
- Button, Input 같은 기본 UI 컴포넌트
- 날짜 포맷팅, 텍스트 처리 같은 유틸리티 함수
- API 클라이언트 설정

**NO** → 2단계로 이동

---

### 2단계: "이것이 비즈니스 도메인의 핵심 개념인가?" (Post, Comment, User 등)

**YES** → `entities/` 레이어
- 도메인 모델의 타입 정의
- 도메인 모델의 API 함수
- 도메인 모델의 전역 상태 (Zustand Store)

**NO** → 3단계로 이동

---

### 3단계: "이것이 사용자가 수행하는 구체적인 행동/기능인가?"

**YES** → `features/` 레이어
- 게시물 검색, 필터링, 생성, 수정, 삭제
- 댓글 생성, 수정, 삭제, 좋아요
- 사용자 정보 보기

**NO** → 4단계로 이동

---

### 4단계: "이것이 여러 feature를 조합한 완성된 UI 블록인가?"

**YES** → `widgets/` 레이어
- 게시물 목록 (검색 + 필터 + 정렬 + 목록)
- 게시물 상세 (게시물 + 댓글 목록)
- 댓글 목록

**NO** → 5단계로 이동

---

### 5단계: "이것이 라우팅과 연결된 페이지인가?"

**YES** → `pages/` 레이어
- PostsManagerPage
- UserProfilePage

**NO** → 다시 생각해보세요! 😅

---

## 📁 상세 분리 기준

### `shared/` - 공통 리소스

#### ✅ 넣어야 할 것

1. **기본 UI 컴포넌트**
   - Button, Input, Textarea
   - Card, Dialog, Select
   - Table, Modal
   - **기준**: 비즈니스 로직과 무관한 순수 UI 컴포넌트

2. **유틸리티 함수**
   - 텍스트 처리: `highlightText`, `truncateText`
   - 날짜 포맷팅: `formatDate`, `formatDateTime`
   - URL 파라미터 처리: `parseQuery`, `buildQuery`
   - **기준**: 입력값을 받아 처리 결과만 반환하는 순수 함수

3. **API 클라이언트**
   - fetch 래퍼
   - 에러 핸들링 공통 로직
   - **기준**: 프로젝트 전역에서 사용하는 API 설정

4. **상수**
   - API 엔드포인트
   - 공통 설정값

#### ❌ 넣으면 안 되는 것

- 비즈니스 로직이 포함된 컴포넌트
- 특정 도메인에 종속된 코드
- 상태 관리 로직 (Zustand Store는 entities에)

---

### `entities/` - 비즈니스 엔티티

#### ✅ 넣어야 할 것

1. **타입 정의** (`model/types.ts`)
   - 엔티티 인터페이스: `Post`, `Comment`, `User`
   - API 응답 타입: `PostResponse`, `PostsResponse`
   - DTO 타입: `CreatePostDto`, `UpdatePostDto`

2. **상태 관리** (`model/store.ts`)
   - Zustand Store
   - 엔티티 관련 전역 상태
   - 엔티티 관련 액션 (fetch, add, update, delete)

3. **API 함수** (`api/`)
   - 엔티티 CRUD API
   - 엔티티 조회 API
   - **기준**: 엔티티 자체에 대한 기본적인 데이터 조작

#### 📝 예시: Post Entity

```typescript
// entities/post/model/types.ts
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
}

// entities/post/model/store.ts
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => { /* ... */ },
  addPost: async (post) => { /* ... */ },
}))

// entities/post/api/post-api.ts
export async function fetchPosts(): Promise<PostsResponse> {
  // API 호출
}
```

#### ❌ 넣으면 안 되는 것

- 특정 기능(검색, 필터링)에 특화된 로직 → `features/`
- 여러 엔티티를 조합한 로직 → `features/` 또는 `widgets/`

---

### `features/` - 사용자 기능

#### ✅ 넣어야 할 것

1. **사용자 행동 중심의 기능**
   - `post-search`: 게시물 검색 기능
   - `post-filter`: 게시물 필터링 기능
   - `post-create`: 게시물 생성 기능
   - `post-edit`: 게시물 수정 기능
   - `comment-like`: 댓글 좋아요 기능

2. **구조**
   ```
   features/
   ├── post-search/
   │   ├── ui/              # 검색 입력 UI
   │   ├── model/           # 검색 로직 (Hook)
   │   └── api/             # 검색 API (필요 시)
   ```

3. **비즈니스 로직** (`model/use-*.ts`)
   - 사용자 행동을 처리하는 Hook
   - 상태 관리 Store를 활용
   - **기준**: "사용자가 ~를 할 수 있다"는 기능

#### 📝 예시: Post Search Feature

```typescript
// features/post-search/model/use-post-search.ts
export function usePostSearch() {
  const { setSearchQuery, searchQuery } = usePostStore()
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    // 검색 로직 실행
  }
  
  return { handleSearch, searchQuery }
}

// features/post-search/ui/post-search.tsx
export function PostSearch() {
  const { handleSearch, searchQuery } = usePostSearch()
  
  return (
    <Input
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="게시물 검색..."
    />
  )
}
```

#### ❌ 넣으면 안 되는 것

- 여러 feature를 조합한 완성된 UI 블록 → `widgets/`
- 기본 UI 컴포넌트 → `shared/`

---

### `widgets/` - 독립적인 UI 블록

#### ✅ 넣어야 할 것

1. **여러 feature를 조합한 완성된 UI 블록**
   - `post-list`: 검색 + 필터 + 정렬 + 목록 표시
   - `post-detail`: 게시물 상세 + 댓글 목록
   - `comment-list`: 댓글 목록 + 댓글 추가/수정/삭제

2. **특징**
   - 페이지에서 바로 사용 가능
   - 독립적으로 동작
   - 여러 feature와 entity를 조합

#### 📝 예시: Post List Widget

```typescript
// widgets/post-list/ui/post-list.tsx
export function PostList() {
  // 여러 feature와 entity를 조합
  const { posts } = usePostStore()
  const { handleSearch } = usePostSearch()
  const { handleFilter } = usePostFilter()
  const { openEditDialog } = usePostEdit()
  
  return (
    <Table>
      {/* 게시물 목록 렌더링 */}
    </Table>
  )
}
```

#### ❌ 넣으면 안 되는 것

- 단일 기능만 수행하는 컴포넌트 → `features/`
- 페이지 컴포넌트 → `pages/`

---

### `pages/` - 페이지 컴포넌트

#### ✅ 넣어야 할 것

1. **라우팅과 연결된 페이지 컴포넌트**
   - Widget과 Feature를 조합
   - 최소한의 로직만 포함

#### 📝 예시: Posts Manager Page

```typescript
// pages/PostsManagerPage.tsx
export default function PostsManagerPage() {
  const { fetchPosts } = usePostStore()
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  return (
    <Card>
      <PostSearch />      {/* Feature */}
      <PostFilter />      {/* Feature */}
      <PostList />        {/* Widget */}
      <PostPagination />  {/* Feature */}
    </Card>
  )
}
```

#### ❌ 넣으면 안 되는 것

- 복잡한 비즈니스 로직 → `features/` 또는 `entities/`
- 재사용 가능한 UI 블록 → `widgets/`

---

## 🎯 실전 결정 가이드

### 시나리오 1: "게시물 검색 기능을 추가하고 싶어요"

**의사결정**:
1. 비즈니스 도메인 핵심 개념? → NO (검색은 Post의 기능)
2. 사용자 행동? → YES (사용자가 검색을 수행)
3. 여러 feature 조합? → NO (검색만 수행)

**결론**: `features/post-search/`

---

### 시나리오 2: "게시물 목록을 표시하는 컴포넌트를 만들고 싶어요"

**의사결정**:
1. 비즈니스 도메인 핵심 개념? → NO
2. 사용자 행동? → NO (표시만 하는 것)
3. 여러 feature 조합? → YES (검색 + 필터 + 목록)

**결론**: `widgets/post-list/`

---

### 시나리오 3: "날짜를 포맷팅하는 함수를 만들고 싶어요"

**의사결정**:
1. 여러 프로젝트에서 재사용 가능? → YES (순수 함수)

**결론**: `shared/lib/format-date.ts`

---

### 시나리오 4: "댓글 좋아요 기능을 추가하고 싶어요"

**의사결정**:
1. 비즈니스 도메인 핵심 개념? → NO (좋아요는 Comment의 기능)
2. 사용자 행동? → YES (사용자가 좋아요를 클릭)
3. 여러 feature 조합? → NO (좋아요만 수행)

**결론**: `features/comment-like/`

---

## 📖 체크리스트

새로운 코드를 작성할 때 다음을 확인하세요:

- [ ] 이 코드가 여러 프로젝트에서 재사용 가능한가? → `shared/`
- [ ] 이 코드가 비즈니스 도메인 핵심 개념인가? → `entities/`
- [ ] 이 코드가 사용자 행동/기능인가? → `features/`
- [ ] 이 코드가 여러 feature를 조합한 완성된 UI 블록인가? → `widgets/`
- [ ] 이 코드가 라우팅과 연결된 페이지인가? → `pages/`

---

## 🔗 관련 문서

- **FSD 아키텍처 개요**: 전체적인 구조 이해
- **Zustand 상태 관리 가이드**: 상태 관리 방법
- **실제 코드 예시**: 실제 프로젝트 적용 사례

---

**혼란스러울 때는 항상 "이 코드의 목적이 무엇인가?"를 먼저 생각해보세요! 🚀**

