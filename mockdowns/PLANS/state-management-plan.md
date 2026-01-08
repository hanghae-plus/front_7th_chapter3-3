# 상태 관리 계획서 (Zustand)

## 📋 목차
1. [상태 관리 목표](#상태-관리-목표)
2. [Zustand Store 구조](#zustand-store-구조)
3. [엔티티별 Store 설계](#엔티티별-store-설계)
4. [전역 Store 설계](#전역-store-설계)
5. [마이그레이션 계획](#마이그레이션-계획)
6. [Store 사용 가이드](#store-사용-가이드)

---

## 상태 관리 목표

### 🎯 목표
1. **Props Drilling 제거**: 컴포넌트 간 상태 전달 최소화
2. **관심사 분리**: UI 로직과 상태 관리 로직 분리
3. **재사용성 향상**: 여러 컴포넌트에서 동일한 상태 공유
4. **타입 안정성**: TypeScript를 활용한 타입 안전한 상태 관리
5. **FSD 원칙 준수**: 각 레이어별 적절한 상태 관리 위치

### 📊 현재 상태 관리 문제점
- `PostsManagerPage.tsx`에 20개 이상의 `useState`가 집중
- 상태가 컴포넌트 내부에 하드코딩되어 재사용 불가
- Props Drilling으로 인한 복잡한 컴포넌트 구조
- 상태 업데이트 로직이 UI 로직과 혼재

---

## Zustand Store 구조

### 📁 폴더 구조

```
src/
├── entities/
│   ├── post/
│   │   └── model/
│   │       ├── types.ts          # Post 타입 정의
│   │       ├── store.ts          # Post Zustand store
│   │       └── index.ts          # Export
│   ├── comment/
│   │   └── model/
│   │       ├── types.ts          # Comment 타입 정의
│   │       ├── store.ts          # Comment Zustand store
│   │       └── index.ts          # Export
│   └── user/
│       └── model/
│           ├── types.ts          # User 타입 정의
│           ├── store.ts          # User Zustand store
│           └── index.ts          # Export
└── shared/
    └── lib/
        └── stores/
            ├── ui-store.ts       # UI 전역 상태 (다이얼로그, 모달 등)
            └── index.ts          # Export
```

### 🏗️ Store 설계 원칙

1. **엔티티별 분리**: 각 도메인 엔티티(Post, Comment, User)는 독립적인 store
2. **단일 책임**: 각 store는 하나의 엔티티 상태만 관리
3. **타입 안정성**: 모든 상태와 액션에 TypeScript 타입 적용
4. **선택적 구독**: 필요한 상태만 선택적으로 구독하여 성능 최적화

---

## 엔티티별 Store 설계

### 1. Post Store (`entities/post/model/store.ts`)

#### 상태 (State)
```typescript
interface PostState {
  // 데이터
  posts: Post[]
  total: number
  selectedPost: Post | null
  
  // 필터링 및 검색
  searchQuery: string
  selectedTag: string
  tags: string[]
  
  // 정렬
  sortBy: string
  sortOrder: 'asc' | 'desc'
  
  // 페이지네이션
  skip: number
  limit: number
  
  // 로딩 상태
  loading: boolean
  error: string | null
}
```

#### 액션 (Actions)
```typescript
interface PostActions {
  // 데이터 조회
  fetchPosts: () => Promise<void>
  fetchPostById: (id: number) => Promise<void>
  searchPosts: (query: string) => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  
  // CRUD
  addPost: (post: CreatePostDto) => Promise<void>
  updatePost: (id: number, post: UpdatePostDto) => Promise<void>
  deletePost: (id: number) => Promise<void>
  
  // 필터링 및 정렬
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  
  // 페이지네이션
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  
  // 선택
  setSelectedPost: (post: Post | null) => void
  
  // 태그 관리
  fetchTags: () => Promise<void>
  
  // 리셋
  reset: () => void
}
```

#### 사용 예시
```typescript
// 컴포넌트에서 사용
const { posts, loading, fetchPosts, setSearchQuery } = usePostStore()

// 선택적 구독 (성능 최적화)
const posts = usePostStore((state) => state.posts)
const loading = usePostStore((state) => state.loading)
```

---

### 2. Comment Store (`entities/comment/model/store.ts`)

#### 상태 (State)
```typescript
interface CommentState {
  // 데이터 (postId를 키로 하는 맵)
  comments: Record<number, Comment[]>
  
  // 선택된 댓글
  selectedComment: Comment | null
  
  // 로딩 상태
  loading: boolean
  error: string | null
}
```

#### 액션 (Actions)
```typescript
interface CommentActions {
  // 데이터 조회
  fetchComments: (postId: number) => Promise<void>
  
  // CRUD
  addComment: (comment: CreateCommentDto) => Promise<void>
  updateComment: (id: number, comment: UpdateCommentDto) => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  
  // 좋아요
  likeComment: (id: number, postId: number) => Promise<void>
  
  // 선택
  setSelectedComment: (comment: Comment | null) => void
  
  // 리셋
  reset: () => void
}
```

#### 사용 예시
```typescript
// 특정 게시물의 댓글 가져오기
const comments = useCommentStore((state) => state.comments[postId] || [])
const { fetchComments, addComment } = useCommentStore()
```

---

### 3. User Store (`entities/user/model/store.ts`)

#### 상태 (State)
```typescript
interface UserState {
  // 데이터
  users: User[]
  selectedUser: User | null
  
  // 로딩 상태
  loading: boolean
  error: string | null
}
```

#### 액션 (Actions)
```typescript
interface UserActions {
  // 데이터 조회
  fetchUsers: () => Promise<void>
  fetchUserById: (id: number) => Promise<void>
  
  // 선택
  setSelectedUser: (user: User | null) => void
  
  // 리셋
  reset: () => void
}
```

---

## 전역 Store 설계

### UI Store (`shared/lib/stores/ui-store.ts`)

#### 상태 (State)
```typescript
interface UIState {
  // 다이얼로그 상태
  showAddPostDialog: boolean
  showEditPostDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean
  
  // 기타 UI 상태
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}
```

#### 액션 (Actions)
```typescript
interface UIActions {
  // 다이얼로그 제어
  openAddPostDialog: () => void
  closeAddPostDialog: () => void
  openEditPostDialog: () => void
  closeEditPostDialog: () => void
  openPostDetailDialog: () => void
  closePostDetailDialog: () => void
  openAddCommentDialog: () => void
  closeAddCommentDialog: () => void
  openEditCommentDialog: () => void
  closeEditCommentDialog: () => void
  openUserModal: () => void
  closeUserModal: () => void
  
  // 기타 UI 제어
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}
```

#### 사용 예시
```typescript
const { showAddPostDialog, openAddPostDialog, closeAddPostDialog } = useUIStore()
```

---

## 마이그레이션 계획

### 📅 단계별 마이그레이션

#### 1단계: Post Store 생성 및 기본 상태 마이그레이션
- [ ] `entities/post/model/types.ts` 생성 (Post 타입 정의)
- [ ] `entities/post/model/store.ts` 생성
- [ ] 기본 상태(posts, total, loading) 마이그레이션
- [ ] `fetchPosts` 액션 구현
- [ ] `PostsManagerPage`에서 useState 제거하고 store 사용

#### 2단계: Post 필터링 및 검색 상태 마이그레이션
- [ ] 검색 상태(searchQuery) 마이그레이션
- [ ] 태그 필터링(selectedTag, tags) 마이그레이션
- [ ] 정렬(sortBy, sortOrder) 마이그레이션
- [ ] 페이지네이션(skip, limit) 마이그레이션
- [ ] 관련 액션 구현

#### 3단계: Post CRUD 액션 마이그레이션
- [ ] `addPost` 액션 구현
- [ ] `updatePost` 액션 구현
- [ ] `deletePost` 액션 구현
- [ ] 컴포넌트에서 직접 API 호출 제거

#### 4단계: Comment Store 생성 및 마이그레이션
- [ ] `entities/comment/model/types.ts` 생성
- [ ] `entities/comment/model/store.ts` 생성
- [ ] 댓글 상태 및 액션 마이그레이션
- [ ] 댓글 CRUD 로직을 store로 이동

#### 5단계: User Store 생성 및 마이그레이션
- [ ] `entities/user/model/types.ts` 생성
- [ ] `entities/user/model/store.ts` 생성
- [ ] 사용자 상태 및 액션 마이그레이션

#### 6단계: UI Store 생성 및 마이그레이션
- [ ] `shared/lib/stores/ui-store.ts` 생성
- [ ] 모든 다이얼로그 상태를 UI Store로 이동
- [ ] 컴포넌트에서 다이얼로그 상태 제거

#### 7단계: 최적화 및 정리
- [ ] 불필요한 useState 제거 확인
- [ ] Props Drilling 제거 확인
- [ ] 성능 최적화 (선택적 구독 적용)
- [ ] 타입 안정성 검증

---

## Store 사용 가이드

### ✅ Best Practices

#### 1. 선택적 구독 사용
```typescript
// ❌ 나쁜 예: 전체 store 구독
const store = usePostStore()

// ✅ 좋은 예: 필요한 상태만 구독
const posts = usePostStore((state) => state.posts)
const loading = usePostStore((state) => state.loading)
```

#### 2. 액션은 한 번만 가져오기
```typescript
// ✅ 좋은 예: 액션은 한 번만 가져오기
const { fetchPosts, addPost } = usePostStore()

// 또는
const fetchPosts = usePostStore((state) => state.fetchPosts)
```

#### 3. 타입 안정성 확보
```typescript
// ✅ 타입을 명시적으로 지정
const posts: Post[] = usePostStore((state) => state.posts)
```

#### 4. 에러 처리
```typescript
// Store 내부에서 에러 처리
const fetchPosts = async () => {
  set({ loading: true, error: null })
  try {
    const data = await postApi.fetchPosts()
    set({ posts: data.posts, total: data.total, loading: false })
  } catch (error) {
    set({ error: error.message, loading: false })
  }
}
```

### 🔄 컴포넌트에서 Store 사용 예시

#### Before (useState 사용)
```typescript
const PostsManager = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  useEffect(() => {
    // API 호출 로직...
  }, [])
  
  // ...
}
```

#### After (Zustand Store 사용)
```typescript
const PostsManager = () => {
  // 상태 구독
  const posts = usePostStore((state) => state.posts)
  const loading = usePostStore((state) => state.loading)
  const searchQuery = usePostStore((state) => state.searchQuery)
  
  // 액션 가져오기
  const { fetchPosts, setSearchQuery } = usePostStore()
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  // ...
}
```

### 🎯 Store 구조 예시

```typescript
import { create } from 'zustand'
import { Post, CreatePostDto, UpdatePostDto } from './types'
import * as postApi from '../api/post-api'

interface PostState {
  // 상태
  posts: Post[]
  total: number
  selectedPost: Post | null
  searchQuery: string
  selectedTag: string
  tags: string[]
  sortBy: string
  sortOrder: 'asc' | 'desc'
  skip: number
  limit: number
  loading: boolean
  error: string | null
  
  // 액션
  fetchPosts: () => Promise<void>
  fetchPostById: (id: number) => Promise<void>
  searchPosts: (query: string) => Promise<void>
  addPost: (post: CreatePostDto) => Promise<void>
  updatePost: (id: number, post: UpdatePostDto) => Promise<void>
  deletePost: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSelectedPost: (post: Post | null) => void
  fetchTags: () => Promise<void>
  reset: () => void
}

const initialState = {
  posts: [],
  total: 0,
  selectedPost: null,
  searchQuery: '',
  selectedTag: '',
  tags: [],
  sortBy: '',
  sortOrder: 'asc' as const,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
}

export const usePostStore = create<PostState>((set, get) => ({
  ...initialState,
  
  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      const { skip, limit, searchQuery, selectedTag, sortBy, sortOrder } = get()
      const data = await postApi.fetchPosts({
        skip,
        limit,
        search: searchQuery,
        tag: selectedTag,
        sortBy,
        sortOrder,
      })
      set({ posts: data.posts, total: data.total, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  addPost: async (post: CreatePostDto) => {
    set({ loading: true, error: null })
    try {
      const newPost = await postApi.addPost(post)
      set((state) => ({
        posts: [newPost, ...state.posts],
        total: state.total + 1,
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query, skip: 0 })
  },
  
  reset: () => {
    set(initialState)
  },
  
  // ... 나머지 액션들
}))
```

---

## 체크리스트

### 기본 요구사항
- [ ] Zustand 설치 완료
- [ ] 각 엔티티별 store 생성
- [ ] 타입 정의 완료
- [ ] 기본 CRUD 액션 구현
- [ ] 에러 처리 구현
- [ ] 로딩 상태 관리

### FSD 원칙 준수
- [ ] entities 레이어에 store 배치
- [ ] shared/lib/stores에 전역 store 배치
- [ ] 각 store가 단일 책임 원칙 준수
- [ ] 타입과 API가 같은 엔티티 폴더에 위치

### 코드 품질
- [ ] Props Drilling 제거
- [ ] 불필요한 useState 제거
- [ ] 선택적 구독 적용
- [ ] 타입 안정성 확보
- [ ] 에러 핸들링 완료

---

## 마무리

이 계획서는 **Zustand를 활용한 상태 관리 마이그레이션 로드맵**입니다.

각 단계를 순차적으로 진행하여 점진적으로 상태 관리를 개선하고, FSD 아키텍처 원칙을 준수하면서도 효율적인 상태 관리를 구현합니다.

**다음 단계**: 1단계부터 순차적으로 마이그레이션을 시작합니다.

