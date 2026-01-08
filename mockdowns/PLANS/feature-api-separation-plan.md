# Feature API 분리 계획서

## 📋 목차

1. [Feature API 분리의 목적](#feature-api-분리의-목적)
2. [현재 API 호출 현황 분석](#현재-api-호출-현황-분석)
3. [Feature API 분리 원칙](#feature-api-분리-원칙)
4. [Feature별 API 분리 계획](#feature별-api-분리-계획)
5. [단계별 마이그레이션 계획](#단계별-마이그레이션-계획)
6. [API 호출 패턴 및 예시](#api-호출-패턴-및-예시)
7. [체크리스트](#체크리스트)

---

## Feature API 분리의 목적

### 🎯 목표

1. **관심사 분리**: 각 feature의 API 호출 로직을 독립적으로 관리
2. **재사용성 향상**: feature별 API 로직을 다른 곳에서도 재사용 가능
3. **테스트 용이성**: feature별 API 로직을 독립적으로 테스트 가능
4. **유지보수성 향상**: API 변경 시 해당 feature만 수정하면 됨
5. **FSD 원칙 준수**: entities의 기본 API와 features의 기능별 API 분리

### 📊 Entities API vs Features API

#### Entities API (`entities/{entity}/api/`)

- **역할**: 기본 CRUD 작업 (범용적인 API 호출)
- **예시**:
  - `entities/post/api/post-api.ts` → `fetchPosts()`, `fetchPostById()`, `addPost()`, `updatePost()`, `deletePost()`
  - `entities/comment/api/comment-api.ts` → `fetchComments()`, `addComment()`, `updateComment()`, `deleteComment()`
- **특징**: 엔티티의 기본적인 데이터 조작만 담당

#### Features API (`features/{feature}/api/`)

- **역할**: 특정 기능에 특화된 API 호출 (비즈니스 로직 포함)
- **예시**:
  - `features/post-search/api/post-search-api.ts` → `searchPosts(query: string)`
  - `features/post-filter/api/post-filter-api.ts` → `fetchPostsByTag(tag: string)`, `fetchTags()`
  - `features/comment-like/api/comment-like-api.ts` → `likeComment(id: number, postId: number)`
- **특징**: 기능별 특수한 요구사항이나 추가 로직이 필요한 API 호출

---

## 현재 API 호출 현황 분석

### 🔴 PostsManagerPage.tsx의 API 호출 현황

#### Post 관련 API 호출

```typescript
// 1. 기본 게시물 조회
fetchPosts() → GET /api/posts?limit=${limit}&skip=${skip}
              + GET /api/users?limit=0&select=username,image
              → posts와 users를 조합하여 postsWithUsers 생성

// 2. 게시물 검색
searchPosts() → GET /api/posts/search?q=${searchQuery}

// 3. 태그별 게시물 조회
fetchPostsByTag(tag) → GET /api/posts/tag/${tag}
                      + GET /api/users?limit=0&select=username,image
                      → posts와 users를 조합

// 4. 태그 목록 조회
fetchTags() → GET /api/posts/tags

// 5. 게시물 추가
addPost() → POST /api/posts/add

// 6. 게시물 수정
updatePost() → PUT /api/posts/${selectedPost.id}

// 7. 게시물 삭제
deletePost(id) → DELETE /api/posts/${id}
```

#### Comment 관련 API 호출

```typescript
// 1. 댓글 조회
fetchComments(postId) → GET /api/comments/post/${postId}

// 2. 댓글 추가
addComment() → POST /api/comments/add

// 3. 댓글 수정
updateComment() → PUT /api/comments/${selectedComment.id}

// 4. 댓글 삭제
deleteComment(id, postId) → DELETE /api/comments/${id}

// 5. 댓글 좋아요
likeComment(id, postId) → PATCH /api/comments/${id}
                         → body: { likes: comments[postId].find(...).likes + 1 }
```

#### User 관련 API 호출

```typescript
// 1. 사용자 정보 조회
openUserModal(user) → GET /api/users/${user.id}
```

### 📊 API 호출 분류

#### Entities API로 이동할 것들 (기본 CRUD)

- `fetchPosts()` → `entities/post/api/post-api.ts`
- `addPost()` → `entities/post/api/post-api.ts`
- `updatePost()` → `entities/post/api/post-api.ts`
- `deletePost()` → `entities/post/api/post-api.ts`
- `fetchComments()` → `entities/comment/api/comment-api.ts`
- `addComment()` → `entities/comment/api/comment-api.ts`
- `updateComment()` → `entities/comment/api/comment-api.ts`
- `deleteComment()` → `entities/comment/api/comment-api.ts`
- `fetchUserById()` → `entities/user/api/user-api.ts`

#### Features API로 이동할 것들 (기능별 특화)

- `searchPosts()` → `features/post-search/api/post-search-api.ts`
- `fetchPostsByTag()` → `features/post-filter/api/post-filter-api.ts`
- `fetchTags()` → `features/post-filter/api/post-filter-api.ts`
- `likeComment()` → `features/comment-like/api/comment-like-api.ts`
- `openUserModal()` → `features/user-view/api/user-view-api.ts`

---

## Feature API 분리 원칙

### 🏗️ 분리 기준

#### 1. **기본 CRUD는 Entities API**

- 단순한 생성, 조회, 수정, 삭제 작업
- 엔티티의 기본 데이터 조작
- 예: `addPost()`, `updatePost()`, `deletePost()`

#### 2. **기능별 특화 로직은 Features API**

- 특정 기능에만 필요한 API 호출
- 추가적인 데이터 가공이나 조합이 필요한 경우
- 비즈니스 로직이 포함된 API 호출
- 예: `searchPosts()`, `fetchPostsByTag()`, `likeComment()`

#### 3. **복합 API 호출은 Features API**

- 여러 엔티티를 조합하는 경우
- 여러 API를 순차적으로 호출하는 경우
- 예: `fetchPosts()` (posts + users 조합), `fetchPostsByTag()` (posts + users 조합)

### 📁 폴더 구조

```
src/features/
├── post-search/
│   ├── api/
│   │   └── post-search-api.ts    # 검색 API 호출
│   ├── model/
│   │   └── usePostSearch.ts     # 검색 훅 (API 사용)
│   └── ui/
│       └── PostSearchInput.tsx
├── post-filter/
│   ├── api/
│   │   └── post-filter-api.ts   # 필터링 API 호출
│   ├── model/
│   │   └── usePostFilter.ts     # 필터링 훅 (API 사용)
│   └── ui/
│       └── PostFilter.tsx
├── comment-like/
│   ├── api/
│   │   └── comment-like-api.ts  # 좋아요 API 호출
│   └── model/
│       └── useCommentLike.ts    # 좋아요 훅 (API 사용)
└── user-view/
    ├── api/
    │   └── user-view-api.ts     # 사용자 조회 API 호출
    └── model/
        └── useUserView.ts        # 사용자 조회 훅 (API 사용)
```

---

## Feature별 API 분리 계획

### 1. Post Search Feature API (`features/post-search/api/post-search-api.ts`)

#### API 함수

```typescript
import { PostsResponse } from "../../../entities/post/model/types"

/**
 * 게시물 검색 API
 * @param query 검색어
 * @returns 검색된 게시물 목록
 */
export const searchPosts = async (query: string): Promise<PostsResponse> => {
  if (!query.trim()) {
    throw new Error("검색어를 입력해주세요")
  }

  const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error("게시물 검색에 실패했습니다")
  }

  const data: PostsResponse = await response.json()
  return data
}
```

#### 사용 예시

```typescript
// features/post-search/model/usePostSearch.ts
import { searchPosts } from "../api/post-search-api"
import { usePostStore } from "../../../entities/post/model/store"

export const usePostSearch = () => {
  const { setPosts, setTotal, setLoading, setError } = usePostStore()

  const handleSearch = async (query: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await searchPosts(query)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      setError(error instanceof Error ? error.message : "검색 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  return { handleSearch }
}
```

---

### 2. Post Filter Feature API (`features/post-filter/api/post-filter-api.ts`)

#### API 함수

```typescript
import { PostsResponse, Tag } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { PostWithAuthor } from "../../../entities/post/model/types"

/**
 * 태그 목록 조회 API
 * @returns 태그 목록
 */
export const fetchTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")

  if (!response.ok) {
    throw new Error("태그 목록을 가져오는데 실패했습니다")
  }

  const data: Tag[] = await response.json()
  return data
}

/**
 * 태그별 게시물 조회 API (posts + users 조합)
 * @param tag 태그 slug
 * @returns 작성자 정보가 포함된 게시물 목록
 */
export const fetchPostsByTag = async (
  tag: string,
): Promise<{
  posts: PostWithAuthor[]
  total: number
}> => {
  if (!tag || tag === "all") {
    throw new Error("유효한 태그를 선택해주세요")
  }

  // 병렬로 posts와 users 조회
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts/tag/${tag}`),
    fetch("/api/users?limit=0&select=username,image"),
  ])

  if (!postsResponse.ok || !usersResponse.ok) {
    throw new Error("태그별 게시물을 가져오는데 실패했습니다")
  }

  const postsData: PostsResponse = await postsResponse.json()
  const usersData: { users: User[] } = await usersResponse.json()

  // posts와 users를 조합하여 PostWithAuthor 생성
  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
  }
}
```

#### 사용 예시

```typescript
// features/post-filter/model/usePostFilter.ts
import { fetchTags, fetchPostsByTag } from "../api/post-filter-api"
import { usePostStore } from "../../../entities/post/model/store"

export const usePostFilter = () => {
  const { setTags, setPosts, setTotal, setLoading, setError } = usePostStore()

  const loadTags = async () => {
    try {
      const tags = await fetchTags()
      setTags(tags)
    } catch (error) {
      setError(error instanceof Error ? error.message : "태그를 불러오는데 실패했습니다")
    }
  }

  const filterByTag = async (tag: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchPostsByTag(tag)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      setError(error instanceof Error ? error.message : "필터링 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  return { loadTags, filterByTag }
}
```

---

### 3. Comment Like Feature API (`features/comment-like/api/comment-like-api.ts`)

#### API 함수

```typescript
import { CommentResponse } from "../../../entities/comment/model/types"

/**
 * 댓글 좋아요 API
 * @param id 댓글 ID
 * @param currentLikes 현재 좋아요 수
 * @returns 업데이트된 댓글
 */
export const likeComment = async (id: number, currentLikes: number): Promise<CommentResponse> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  })

  if (!response.ok) {
    throw new Error("댓글 좋아요에 실패했습니다")
  }

  const data: CommentResponse = await response.json()
  return data
}
```

#### 사용 예시

```typescript
// features/comment-like/model/useCommentLike.ts
import { likeComment } from "../api/comment-like-api"
import { useCommentStore } from "../../../entities/comment/model/store"

export const useCommentLike = () => {
  const { comments, updateComment } = useCommentStore()

  const handleLike = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id)

    if (!comment) {
      throw new Error("댓글을 찾을 수 없습니다")
    }

    try {
      const updatedComment = await likeComment(id, comment.likes)

      // Store 업데이트
      updateComment(postId, updatedComment)
    } catch (error) {
      throw error
    }
  }

  return { handleLike }
}
```

---

### 4. User View Feature API (`features/user-view/api/user-view-api.ts`)

#### API 함수

```typescript
import { UserResponse } from "../../../entities/user/model/types"

/**
 * 사용자 상세 정보 조회 API
 * @param userId 사용자 ID
 * @returns 사용자 정보
 */
export const fetchUserDetail = async (userId: number): Promise<UserResponse> => {
  const response = await fetch(`/api/users/${userId}`)

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다")
  }

  const data: UserResponse = await response.json()
  return data
}
```

#### 사용 예시

```typescript
// features/user-view/model/useUserView.ts
import { fetchUserDetail } from "../api/user-view-api"
import { useUserStore } from "../../../entities/user/model/store"

export const useUserView = () => {
  const { setSelectedUser, setLoading, setError } = useUserStore()

  const viewUser = async (userId: number) => {
    setLoading(true)
    setError(null)

    try {
      const user = await fetchUserDetail(userId)
      setSelectedUser(user)
    } catch (error) {
      setError(error instanceof Error ? error.message : "사용자 정보를 불러오는데 실패했습니다")
    } finally {
      setLoading(false)
    }
  }

  return { viewUser }
}
```

---

### 5. Post Create/Edit Feature API (복합 API 예시)

#### `features/post-create/api/post-create-api.ts`

```typescript
import { CreatePostDto, PostResponse } from "../../../entities/post/model/types"
import { addPost as addPostEntity } from "../../../entities/post/api/post-api"

/**
 * 게시물 생성 API (기본 API를 래핑하여 추가 로직 포함)
 * @param post 게시물 생성 데이터
 * @returns 생성된 게시물
 */
export const createPost = async (post: CreatePostDto): Promise<PostResponse> => {
  // 유효성 검사
  if (!post.title.trim()) {
    throw new Error("제목을 입력해주세요")
  }

  if (!post.body.trim()) {
    throw new Error("내용을 입력해주세요")
  }

  // 기본 API 호출
  const createdPost = await addPostEntity(post)

  // 추가 로직 (예: 태그 자동 생성, 알림 전송 등)
  // ...

  return createdPost
}
```

---

## 단계별 마이그레이션 계획

### 📅 작업 순서 (오류 없이 순차적으로 진행)

#### 1단계: Entities API 기본 구조 생성

**목표**: 기본 CRUD API를 entities에 먼저 생성

- [ ] `entities/post/api/post-api.ts` 생성
  - `fetchPosts()` 함수 구현
  - `fetchPostById()` 함수 구현
  - `addPost()` 함수 구현
  - `updatePost()` 함수 구현
  - `deletePost()` 함수 구현

- [ ] `entities/comment/api/comment-api.ts` 생성
  - `fetchComments()` 함수 구현
  - `addComment()` 함수 구현
  - `updateComment()` 함수 구현
  - `deleteComment()` 함수 구현

- [ ] `entities/user/api/user-api.ts` 생성
  - `fetchUsers()` 함수 구현
  - `fetchUserById()` 함수 구현

**의존성**: 없음 (가장 기본 API)

---

#### 2단계: Post Search Feature API 생성

**목표**: 검색 기능의 API 분리

- [ ] `features/post-search/api/post-search-api.ts` 생성
  - `searchPosts(query: string)` 함수 구현
  - 에러 처리 추가
  - 타입 정의 적용

- [ ] `features/post-search/model/usePostSearch.ts` 수정
  - `searchPosts` API 함수 사용
  - 기존 `searchPosts()` 함수를 API 호출로 대체

**의존성**: 1단계 완료 필요

---

#### 3단계: Post Filter Feature API 생성

**목표**: 필터링 기능의 API 분리

- [ ] `features/post-filter/api/post-filter-api.ts` 생성
  - `fetchTags()` 함수 구현
  - `fetchPostsByTag(tag: string)` 함수 구현
  - posts와 users 조합 로직 포함
  - 에러 처리 추가

- [ ] `features/post-filter/model/usePostFilter.ts` 수정
  - `fetchTags`, `fetchPostsByTag` API 함수 사용
  - 기존 함수들을 API 호출로 대체

**의존성**: 1단계 완료 필요

---

#### 4단계: Comment Like Feature API 생성

**목표**: 댓글 좋아요 기능의 API 분리

- [ ] `features/comment-like/api/comment-like-api.ts` 생성
  - `likeComment(id: number, currentLikes: number)` 함수 구현
  - 에러 처리 추가

- [ ] `features/comment-like/model/useCommentLike.ts` 수정
  - `likeComment` API 함수 사용
  - 기존 `likeComment()` 함수를 API 호출로 대체

**의존성**: 1단계 완료 필요

---

#### 5단계: User View Feature API 생성

**목표**: 사용자 조회 기능의 API 분리

- [ ] `features/user-view/api/user-view-api.ts` 생성
  - `fetchUserDetail(userId: number)` 함수 구현
  - 에러 처리 추가

- [ ] `features/user-view/model/useUserView.ts` 수정
  - `fetchUserDetail` API 함수 사용
  - 기존 `openUserModal()` 함수를 API 호출로 대체

**의존성**: 1단계 완료 필요

---

#### 6단계: Post Create/Edit Feature API 생성 (선택적)

**목표**: 게시물 생성/수정 시 추가 로직이 필요한 경우

- [ ] `features/post-create/api/post-create-api.ts` 생성
  - `createPost()` 함수 구현 (유효성 검사 포함)
  - `addPost` entities API를 래핑

- [ ] `features/post-edit/api/post-edit-api.ts` 생성
  - `editPost()` 함수 구현 (유효성 검사 포함)
  - `updatePost` entities API를 래핑

**의존성**: 1단계 완료 필요

---

#### 7단계: PostsManagerPage에서 직접 API 호출 제거

**목표**: 모든 API 호출을 feature나 entity로 이동

- [ ] `PostsManagerPage.tsx`에서 직접 `fetch()` 호출 제거
- [ ] 모든 API 호출을 feature 훅이나 entity store로 대체
- [ ] 에러 처리 통일
- [ ] 타입 안정성 확인

**의존성**: 1~6단계 완료 필요

---

## API 호출 패턴 및 예시

### ✅ Best Practices

#### 1. 에러 처리 통일

```typescript
// ✅ 좋은 예: 명확한 에러 메시지와 타입
export const searchPosts = async (query: string): Promise<PostsResponse> => {
  if (!query.trim()) {
    throw new Error("검색어를 입력해주세요")
  }

  const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error(`게시물 검색에 실패했습니다 (${response.status})`)
  }

  return await response.json()
}
```

#### 2. 타입 안정성 확보

```typescript
// ✅ 좋은 예: 명시적 타입 지정
import { PostsResponse } from "../../../entities/post/model/types"

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  // ...
}
```

#### 3. URL 인코딩

```typescript
// ✅ 좋은 예: URL 파라미터 인코딩
const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)

// ❌ 나쁜 예: 인코딩 없이 사용
const response = await fetch(`/api/posts/search?q=${query}`)
```

#### 4. 병렬 API 호출

```typescript
// ✅ 좋은 예: Promise.all 사용
const [postsResponse, usersResponse] = await Promise.all([
  fetch(`/api/posts/tag/${tag}`),
  fetch("/api/users?limit=0&select=username,image"),
])
```

#### 5. Entities API 재사용

```typescript
// ✅ 좋은 예: entities API를 재사용
import { addPost as addPostEntity } from "../../../entities/post/api/post-api"

export const createPost = async (post: CreatePostDto): Promise<PostResponse> => {
  // 유효성 검사 등 추가 로직
  if (!post.title.trim()) {
    throw new Error("제목을 입력해주세요")
  }

  // 기본 API 호출
  return await addPostEntity(post)
}
```

---

## 체크리스트

### Entities API 생성

- [ ] `entities/post/api/post-api.ts` 생성 및 기본 CRUD 구현
- [ ] `entities/comment/api/comment-api.ts` 생성 및 기본 CRUD 구현
- [ ] `entities/user/api/user-api.ts` 생성 및 기본 조회 구현
- [ ] 모든 API 함수에 타입 정의 적용
- [ ] 에러 처리 구현

### Features API 생성

- [ ] `features/post-search/api/post-search-api.ts` 생성
- [ ] `features/post-filter/api/post-filter-filter-api.ts` 생성
- [ ] `features/comment-like/api/comment-like-api.ts` 생성
- [ ] `features/user-view/api/user-view-api.ts` 생성
- [ ] 모든 API 함수에 타입 정의 적용
- [ ] 에러 처리 구현

### Feature Model 수정

- [ ] `features/post-search/model/usePostSearch.ts`에서 API 사용
- [ ] `features/post-filter/model/usePostFilter.ts`에서 API 사용
- [ ] `features/comment-like/model/useCommentLike.ts`에서 API 사용
- [ ] `features/user-view/model/useUserView.ts`에서 API 사용

### PostsManagerPage 정리

- [ ] 직접 `fetch()` 호출 제거
- [ ] 모든 API 호출을 feature 훅으로 대체
- [ ] 에러 처리 통일
- [ ] 타입 안정성 확인

### 코드 품질

- [ ] URL 인코딩 적용
- [ ] 병렬 API 호출 최적화
- [ ] 에러 메시지 명확화
- [ ] 타입 안정성 확보

---

## 마무리

이 계획서는 **Feature를 중심으로 API를 분리하는 마이그레이션 로드맵**입니다.

각 feature의 API 호출 로직을 독립적으로 관리하여 재사용성과 유지보수성을 향상시키고, FSD 아키텍처 원칙에 따라 entities의 기본 API와 features의 기능별 API를 명확히 분리합니다.

**다음 단계**: 1단계부터 순차적으로 API 분리를 시작합니다.
