# Zustand 상태 관리 가이드

## 📚 학습 목표

이 문서를 읽고 나면 다음을 이해할 수 있습니다:
- Zustand가 무엇인지
- 언제 Zustand를 사용해야 하는지
- Zustand Store를 어떻게 만드는지
- Store를 어떻게 사용하는지
- FSD에서 Zustand를 어디에 두어야 하는지

---

## 🎯 Zustand란?

**Zustand**는 간단하고 가벼운 상태 관리 라이브러리입니다.

### 특징

1. **간단함**: Boilerplate 코드 최소화
2. **가벼움**: 작은 번들 사이즈
3. **유연함**: React와 완벽하게 통합
4. **TypeScript 지원**: 타입 안정성 제공

### 언제 Zustand를 사용하나요?

- ✅ **전역 상태 관리**: 여러 컴포넌트에서 공유하는 상태
- ✅ **Props Drilling 제거**: 깊은 컴포넌트 트리에서 상태 전달
- ✅ **서버 상태와 클라이언트 상태 분리**: 서버 데이터와 UI 상태를 명확히 분리

---

## 🏗️ Zustand Store 구조

### 기본 구조

```typescript
import { create } from "zustand"

interface StoreState {
  // 상태 (State)
  count: number
  name: string
  
  // 액션 (Actions)
  increment: () => void
  decrement: () => void
  setName: (name: string) => void
}

export const useStore = create<StoreState>((set) => ({
  // 초기 상태
  count: 0,
  name: "",
  
  // 액션 구현
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (name: string) => set({ name }),
}))
```

### 핵심 개념

1. **State (상태)**: Store가 관리하는 데이터
2. **Actions (액션)**: 상태를 변경하는 함수
3. **set**: 상태를 업데이트하는 함수
4. **get**: 현재 상태를 읽는 함수

---

## 📍 FSD에서 Zustand Store 위치

### 원칙

1. **엔티티 Store**: `entities/{entity}/model/store.ts`
   - 비즈니스 엔티티의 상태 관리
   - 예: `entities/post/model/store.ts`

2. **전역 UI Store**: `shared/lib/stores/ui-store.ts`
   - UI 상태 관리 (다이얼로그, 모달 등)
   - 예: 다이얼로그 열림/닫힘 상태

### ❌ 절대 하지 말아야 할 것

- Feature나 Widget에 Store를 두지 않음
- Store는 엔티티나 공통 레이어에만 위치

---

## 📝 실제 예시: Post Store

### 1. 타입 정의 (`entities/post/model/types.ts`)

```typescript
// Post 엔티티 타입
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  author?: User
}

// Store 상태 인터페이스
export interface PostState {
  // 데이터 상태
  posts: Post[]
  total: number
  selectedPost: Post | null
  
  // 필터링 및 검색
  searchQuery: string
  selectedTag: string
  tags: string[]
  
  // 정렬
  sortBy: string
  sortOrder: "asc" | "desc"
  
  // 페이지네이션
  skip: number
  limit: number
  
  // 로딩 상태
  loading: boolean
  error: string | null
  
  // 액션
  fetchPosts: (params?: FetchPostsParams) => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  addPost: (post: CreatePostDto) => Promise<void>
  updatePost: (id: number, post: UpdatePostDto) => Promise<void>
  deletePost: (id: number) => Promise<void>
  reset: () => void
}
```

### 2. Store 구현 (`entities/post/model/store.ts`)

```typescript
import { create } from "zustand"
import type { Post, PostState, FetchPostsParams } from "./types"
import { fetchPosts as fetchPostsAPI, addPost as addPostAPI } from "../api"

// 초기 상태
const initialState = {
  posts: [],
  total: 0,
  selectedPost: null,
  searchQuery: "",
  selectedTag: "all",
  tags: [],
  sortBy: "id",
  sortOrder: "desc" as const,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
}

// Store 생성
export const usePostStore = create<PostState>((set, get) => ({
  ...initialState,
  
  // 게시물 목록 조회
  fetchPosts: async (params?: FetchPostsParams) => {
    set({ loading: true, error: null })
    
    try {
      const state = get()
      const response = await fetchPostsAPI({
        limit: params?.limit ?? state.limit,
        skip: params?.skip ?? state.skip,
      })
      
      set({
        posts: response.posts,
        total: response.total,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 조회 실패",
      })
    }
  },
  
  // 검색어 설정
  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },
  
  // 선택된 태그 설정
  setSelectedTag: (tag: string) => {
    set({ selectedTag: tag })
  },
  
  // 게시물 추가
  addPost: async (post: CreatePostDto) => {
    set({ loading: true, error: null })
    
    try {
      const newPost = await addPostAPI(post)
      const state = get()
      
      set({
        posts: [newPost, ...state.posts],
        total: state.total + 1,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 추가 실패",
      })
      throw error
    }
  },
  
  // 상태 초기화
  reset: () => {
    set(initialState)
  },
}))
```

### 3. Export (`entities/post/model/index.ts`)

```typescript
export { usePostStore } from "./store"
export type { PostState } from "./store"
export type { Post, PostResponse } from "./types"
```

---

## 🎨 Store 사용 방법

### 1. 기본 사용

```typescript
// 컴포넌트에서 전체 Store 사용
function PostList() {
  const { posts, loading, fetchPosts } = usePostStore()
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  if (loading) return <div>로딩 중...</div>
  
  return (
    <div>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  )
}
```

### 2. 선택적 구독 (성능 최적화) ⚡

```typescript
// 필요한 상태만 선택적으로 구독
function PostList() {
  // ✅ 좋은 방법: 필요한 상태만 구독
  const posts = usePostStore((state) => state.posts)
  const loading = usePostStore((state) => state.loading)
  
  // ❌ 나쁜 방법: 전체 Store 구독 (불필요한 리렌더링 발생)
  // const { posts, loading, error, total, searchQuery, ... } = usePostStore()
}
```

### 3. 액션만 사용

```typescript
// 액션만 사용하고 상태는 구독하지 않음
function SearchInput() {
  // 상태 구독 없이 액션만 사용
  const setSearchQuery = usePostStore((state) => state.setSearchQuery)
  
  return (
    <input
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="검색..."
    />
  )
}
```

### 4. getState() 사용 (컴포넌트 외부)

```typescript
// 컴포넌트 외부에서 상태 접근 (이벤트 핸들러 등)
function handleClick() {
  // Store의 현재 상태를 가져옴
  const { posts, selectedPost } = usePostStore.getState()
  
  console.log("현재 게시물 수:", posts.length)
  console.log("선택된 게시물:", selectedPost)
}
```

---

## 🎯 Store 설계 원칙

### 1. 단일 책임 원칙

**✅ 좋은 예시**:
```typescript
// Post Store는 Post 관련 상태만 관리
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => { /* ... */ },
}))
```

**❌ 나쁜 예시**:
```typescript
// Post Store가 Comment 상태까지 관리 (단일 책임 원칙 위반)
export const usePostStore = create((set) => ({
  posts: [],
  comments: [], // ❌ Comment는 별도 Store로 분리해야 함
}))
```

### 2. 상태와 액션 분리

**✅ 좋은 예시**:
```typescript
interface PostState {
  // 상태
  posts: Post[]
  loading: boolean
  
  // 액션
  fetchPosts: () => Promise<void>
  addPost: (post: Post) => Promise<void>
}
```

### 3. 타입 안정성

**✅ 좋은 예시**:
```typescript
interface PostState {
  posts: Post[]  // 명시적 타입
  fetchPosts: () => Promise<void>  // 반환 타입 명시
}

export const usePostStore = create<PostState>((set) => ({
  // ...
}))
```

### 4. 초기 상태 분리

**✅ 좋은 예시**:
```typescript
const initialState = {
  posts: [],
  loading: false,
  error: null,
}

export const usePostStore = create<PostState>((set) => ({
  ...initialState,  // 초기 상태 재사용
  reset: () => set(initialState),  // 리셋 시 재사용
}))
```

---

## 🔄 Store 간 상호작용

### 시나리오: Post를 삭제한 후 Comment Store도 업데이트

```typescript
// entities/post/model/store.ts
export const usePostStore = create<PostState>((set, get) => ({
  deletePost: async (id: number) => {
    await deletePostAPI(id)
    
    // Post Store 업데이트
    const state = get()
    set({
      posts: state.posts.filter(post => post.id !== id),
      total: state.total - 1,
    })
    
    // Comment Store도 업데이트 (필요한 경우)
    const { removeCommentsByPostId } = useCommentStore.getState()
    removeCommentsByPostId(id)
  },
}))
```

---

## 🎨 UI Store (전역 UI 상태)

### UI Store 위치

`shared/lib/stores/ui-store.ts`

### UI Store 예시

```typescript
import { create } from "zustand"

interface UIState {
  // 다이얼로그 상태
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  
  // 액션
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  
  setShowAddDialog: (show: boolean) => set({ showAddDialog: show }),
  setShowEditDialog: (show: boolean) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show: boolean) => set({ showPostDetailDialog: show }),
}))
```

### UI Store 사용 예시

```typescript
// Feature에서 UI Store 사용
export function usePostCreate() {
  const { showAddDialog, setShowAddDialog } = useUIStore()
  
  const openAddDialog = () => {
    setShowAddDialog(true)
  }
  
  return { showAddDialog, openAddDialog }
}
```

---

## ⚠️ 주의사항

### 1. Props Drilling vs Zustand

**❌ Zustand를 남용하지 마세요**:
```typescript
// 부모-자식 간 전달만 필요한 경우는 Props 사용
function Parent() {
  const data = usePostStore((state) => state.posts)  // ❌ 불필요한 전역 상태
  return <Child data={data} />  // Props로 전달하면 되는 경우
}
```

**✅ Props Drilling이 3단계 이상인 경우만 Zustand 사용**:
```typescript
// 3단계 이상 Props 전달이 필요한 경우
<GrandParent>
  <Parent>  {/* 1단계 */}
    <Child>  {/* 2단계 */}
      <GrandChild />  {/* 3단계 - 여기서 Zustand 사용 고려 */}
    </Child>
  </Parent>
</GrandParent>
```

### 2. 서버 상태 vs 클라이언트 상태

**서버 상태 (Server State)**:
- API에서 가져온 데이터
- 예: posts, comments, users
- **위치**: `entities/{entity}/model/store.ts`

**클라이언트 상태 (Client State)**:
- UI 상태, 폼 상태 등
- 예: 다이얼로그 열림/닫힘, 검색어 입력
- **위치**: `entities/{entity}/model/store.ts` 또는 `shared/lib/stores/ui-store.ts`

---

## 📖 체크리스트

새로운 Store를 만들 때 다음을 확인하세요:

- [ ] Store가 엔티티 또는 shared 레이어에 있는가?
- [ ] Store가 단일 책임 원칙을 따르는가?
- [ ] 상태와 액션이 명확히 분리되어 있는가?
- [ ] TypeScript 타입이 명시되어 있는가?
- [ ] 초기 상태가 분리되어 있는가?
- [ ] 선택적 구독을 사용하여 성능을 최적화했는가?

---

## 🔗 관련 문서

- **FSD 아키텍처 개요**: 전체적인 구조 이해
- **FSD 레이어별 분리 기준**: Store를 어디에 두어야 하는지
- **실제 코드 예시**: 실제 프로젝트 적용 사례

---

**상태 관리가 복잡해지면 항상 "이 상태가 정말 전역적으로 필요한가?"를 먼저 생각해보세요! 🚀**

