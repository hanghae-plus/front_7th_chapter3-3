# Widget 데이터 재사용성 계획서

## 📋 목차
1. [Widget 데이터 재사용성의 목적](#widget-데이터-재사용성의-목적)
2. [현재 데이터 사용 현황 분석](#현재-데이터-사용-현황-분석)
3. [Widget 데이터 재사용 패턴](#widget-데이터-재사용-패턴)
4. [Widget별 데이터 재사용 계획](#widget별-데이터-재사용-계획)
5. [단계별 마이그레이션 계획](#단계별-마이그레이션-계획)
6. [데이터 재사용 패턴 및 예시](#데이터-재사용-패턴-및-예시)
7. [체크리스트](#체크리스트)

---

## Widget 데이터 재사용성의 목적

### 🎯 목표
1. **데이터 독립성**: Widget이 자체적으로 필요한 데이터를 관리
2. **재사용성 향상**: Widget을 다른 페이지에서도 동일하게 사용 가능
3. **Props Drilling 제거**: 데이터를 props로 전달하지 않고 직접 조회
4. **캡슐화**: Widget 내부에서 데이터 로직을 완결적으로 처리
5. **테스트 용이성**: Widget을 독립적으로 테스트 가능

### 📊 Widget vs Feature vs Entity

#### Entity (`entities/{entity}/`)
- **역할**: 도메인 모델과 기본 데이터 관리
- **데이터**: 엔티티의 원시 데이터 (Post, Comment, User)
- **예시**: `entities/post/model/store.ts` → posts, total, loading

#### Feature (`features/{feature}/`)
- **역할**: 사용자 행동과 기능 처리
- **데이터**: 기능 실행에 필요한 임시 상태
- **예시**: `features/post-search/model/usePostSearch.ts` → searchQuery

#### Widget (`widgets/{widget}/`)
- **역할**: 여러 feature를 조합한 완성된 UI 블록
- **데이터**: Widget이 표시하는 최종 데이터 (가공된 데이터)
- **예시**: `widgets/post-list/ui/PostList.tsx` → postsWithAuthor, filteredPosts

---

## 현재 데이터 사용 현황 분석

### 🔴 PostsManagerPage.tsx의 데이터 사용 현황

#### 현재 문제점
```typescript
// ❌ 문제: 모든 데이터가 PostsManagerPage에 집중
const PostsManager = () => {
  // Post 데이터
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)
  
  // 필터링 데이터
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  
  // 검색 데이터
  const [searchQuery, setSearchQuery] = useState("")
  
  // Comment 데이터
  const [comments, setComments] = useState({})
  const [selectedComment, setSelectedComment] = useState(null)
  
  // User 데이터
  const [selectedUser, setSelectedUser] = useState(null)
  
  // UI 상태
  const [showAddDialog, setShowAddDialog] = useState(false)
  // ... 20개 이상의 useState
}
```

#### 데이터 흐름 문제
1. **Props Drilling**: 데이터를 여러 컴포넌트에 전달해야 함
2. **재사용 불가**: Widget을 다른 페이지에서 사용하려면 모든 상태를 다시 만들어야 함
3. **의존성 복잡**: Widget이 PostsManagerPage의 상태에 강하게 결합됨

---

## Widget 데이터 재사용 패턴

### 🏗️ 패턴 1: Store 기반 데이터 조회

#### 구조
```typescript
// Widget이 직접 Store에서 데이터를 조회
const PostList = () => {
  // Store에서 직접 데이터 조회
  const posts = usePostStore((state) => state.posts)
  const loading = usePostStore((state) => state.loading)
  const { fetchPosts } = usePostStore()
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  return <div>{/* PostList UI */}</div>
}
```

#### 장점
- Props Drilling 제거
- Widget이 독립적으로 동작
- 다른 페이지에서도 동일하게 사용 가능

---

### 🏗️ 패턴 2: Feature 훅 기반 데이터 조회

#### 구조
```typescript
// Widget이 Feature 훅을 사용하여 데이터 조회
const PostList = () => {
  // Feature 훅 사용
  const { posts, loading, fetchPosts } = usePostList()
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  return <div>{/* PostList UI */}</div>
}

// widgets/post-list/model/usePostList.ts
export const usePostList = () => {
  const posts = usePostStore((state) => state.posts)
  const loading = usePostStore((state) => state.loading)
  const { fetchPosts } = usePostStore()
  
  // Widget에 특화된 로직 추가
  const filteredPosts = useMemo(() => {
    return posts.filter(/* 필터링 로직 */)
  }, [posts])
  
  return { posts: filteredPosts, loading, fetchPosts }
}
```

#### 장점
- Widget에 특화된 데이터 가공 가능
- 재사용성과 커스터마이징의 균형
- 테스트 용이

---

### 🏗️ 패턴 3: Props + Store 하이브리드

#### 구조
```typescript
// 필수 데이터는 Props, 선택적 데이터는 Store
interface PostListProps {
  postIds?: number[]  // 특정 게시물만 표시하는 경우
  showActions?: boolean  // 액션 버튼 표시 여부
}

const PostList = ({ postIds, showActions = true }: PostListProps) => {
  // Store에서 데이터 조회
  const allPosts = usePostStore((state) => state.posts)
  
  // Props로 받은 조건에 따라 필터링
  const posts = useMemo(() => {
    if (postIds) {
      return allPosts.filter(post => postIds.includes(post.id))
    }
    return allPosts
  }, [allPosts, postIds])
  
  return <div>{/* PostList UI */}</div>
}
```

#### 장점
- 유연성: Props로 커스터마이징 가능
- 기본 동작: Props 없이도 동작 가능
- 재사용성: 다양한 상황에서 사용 가능

---

## Widget별 데이터 재사용 계획

### 1. Post List Widget (`widgets/post-list/`)

#### 데이터 요구사항
- 게시물 목록 (PostWithAuthor[])
- 로딩 상태
- 검색 결과 (검색어 하이라이트)
- 필터링 결과 (태그, 정렬)
- 페이지네이션 정보

#### 구현 계획
```typescript
// widgets/post-list/model/usePostList.ts
import { usePostStore } from '../../../entities/post/model/store'
import { usePostSearch } from '../../../features/post-search/model/usePostSearch'
import { usePostFilter } from '../../../features/post-filter/model/usePostFilter'

export const usePostList = () => {
  // Store에서 기본 데이터 조회
  const posts = usePostStore((state) => state.posts)
  const total = usePostStore((state) => state.total)
  const loading = usePostStore((state) => state.loading)
  const searchQuery = usePostStore((state) => state.searchQuery)
  const selectedTag = usePostStore((state) => state.selectedTag)
  const sortBy = usePostStore((state) => state.sortBy)
  const sortOrder = usePostStore((state) => state.sortOrder)
  
  // Feature 훅 사용
  const { handleSearch } = usePostSearch()
  const { filterByTag } = usePostFilter()
  
  // Widget에 특화된 데이터 가공
  const filteredPosts = useMemo(() => {
    let result = [...posts]
    
    // 태그 필터링
    if (selectedTag) {
      result = result.filter(post => post.tags?.includes(selectedTag))
    }
    
    // 정렬
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]
        const multiplier = sortOrder === 'asc' ? 1 : -1
        
        if (aValue < bValue) return -1 * multiplier
        if (aValue > bValue) return 1 * multiplier
        return 0
      })
    }
    
    return result
  }, [posts, selectedTag, sortBy, sortOrder])
  
  return {
    posts: filteredPosts,
    total,
    loading,
    searchQuery,
    handleSearch,
    filterByTag,
  }
}
```

```typescript
// widgets/post-list/ui/PostList.tsx
import { usePostList } from '../model/usePostList'
import { highlightText } from '../../../shared/lib/text-utils'

export const PostList = () => {
  const { posts, loading, searchQuery, handleSearch } = usePostList()
  
  if (loading) {
    return <div>로딩 중...</div>
  }
  
  return (
    <Table>
      <TableHeader>
        {/* 헤더 */}
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              {highlightText(post.title, searchQuery)}
            </TableCell>
            {/* 나머지 셀 */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

---

### 2. Post Detail Widget (`widgets/post-detail/`)

#### 데이터 요구사항
- 선택된 게시물 (PostWithAuthor)
- 게시물의 댓글 목록 (CommentWithUser[])
- 댓글 로딩 상태

#### 구현 계획
```typescript
// widgets/post-detail/model/usePostDetail.ts
import { usePostStore } from '../../../entities/post/model/store'
import { useCommentStore } from '../../../entities/comment/model/store'
import { useCommentList } from '../../../widgets/comment-list/model/useCommentList'

export const usePostDetail = (postId: number) => {
  // Store에서 게시물 조회
  const post = usePostStore((state) => 
    state.posts.find(p => p.id === postId)
  )
  
  // Comment List Widget의 훅 재사용
  const { comments, loading: commentsLoading } = useCommentList(postId)
  
  return {
    post,
    comments,
    commentsLoading,
  }
}
```

```typescript
// widgets/post-detail/ui/PostDetailDialog.tsx
import { usePostDetail } from '../model/usePostDetail'
import { CommentList } from '../../comment-list/ui/CommentList'

interface PostDetailDialogProps {
  postId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostDetailDialog = ({ postId, open, onOpenChange }: PostDetailDialogProps) => {
  const { post, comments, commentsLoading } = usePostDetail(postId)
  
  if (!post) {
    return null
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p>{post.body}</p>
          {/* CommentList Widget 재사용 */}
          <CommentList postId={postId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

### 3. Comment List Widget (`widgets/comment-list/`)

#### 데이터 요구사항
- 특정 게시물의 댓글 목록 (CommentWithUser[])
- 댓글 로딩 상태
- 댓글 추가/수정/삭제 기능

#### 구현 계획
```typescript
// widgets/comment-list/model/useCommentList.ts
import { useCommentStore } from '../../../entities/comment/model/store'
import { useCommentCreate } from '../../../features/comment-create/model/useCommentCreate'
import { useCommentEdit } from '../../../features/comment-edit/model/useCommentEdit'
import { useCommentDelete } from '../../../features/comment-delete/model/useCommentDelete'

export const useCommentList = (postId: number) => {
  // Store에서 댓글 조회
  const comments = useCommentStore((state) => state.comments[postId] || [])
  const loading = useCommentStore((state) => state.loading)
  const { fetchComments } = useCommentStore()
  
  // Feature 훅 사용
  const { handleCreate } = useCommentCreate()
  const { handleEdit } = useCommentEdit()
  const { handleDelete } = useCommentDelete()
  
  // 댓글 로드
  useEffect(() => {
    if (postId && !comments.length) {
      fetchComments(postId)
    }
  }, [postId, comments.length, fetchComments])
  
  // Widget에 특화된 데이터 가공 (예: 정렬)
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => b.likes - a.likes)
  }, [comments])
  
  return {
    comments: sortedComments,
    loading,
    handleCreate: (body: string) => handleCreate({ body, postId, userId: 1 }),
    handleEdit,
    handleDelete,
  }
}
```

```typescript
// widgets/comment-list/ui/CommentList.tsx
import { useCommentList } from '../model/useCommentList'
import { highlightText } from '../../../shared/lib/text-utils'

interface CommentListProps {
  postId: number
  searchQuery?: string  // 선택적: 검색어 하이라이트용
}

export const CommentList = ({ postId, searchQuery = '' }: CommentListProps) => {
  const { comments, loading, handleCreate, handleEdit, handleDelete } = useCommentList(postId)
  
  if (loading) {
    return <div>댓글 로딩 중...</div>
  }
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3>댓글</h3>
        <Button onClick={() => handleCreate('')}>댓글 추가</Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id}>
            <span>{comment.user.username}:</span>
            <span>{highlightText(comment.body, searchQuery)}</span>
            <Button onClick={() => handleEdit(comment.id, { body: comment.body })}>수정</Button>
            <Button onClick={() => handleDelete(comment.id, postId)}>삭제</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### 4. Post Filter Widget (`widgets/post-filter/`)

#### 데이터 요구사항
- 태그 목록
- 선택된 태그
- 정렬 옵션
- 필터링된 게시물 목록

#### 구현 계획
```typescript
// widgets/post-filter/model/usePostFilter.ts
import { usePostStore } from '../../../entities/post/model/store'
import { usePostFilter as usePostFilterFeature } from '../../../features/post-filter/model/usePostFilter'

export const usePostFilter = () => {
  // Store에서 필터 상태 조회
  const tags = usePostStore((state) => state.tags)
  const selectedTag = usePostStore((state) => state.selectedTag)
  const sortBy = usePostStore((state) => state.sortBy)
  const sortOrder = usePostStore((state) => state.sortOrder)
  
  // Feature 훅 사용
  const { loadTags, filterByTag } = usePostFilterFeature()
  
  // 태그 로드
  useEffect(() => {
    if (tags.length === 0) {
      loadTags()
    }
  }, [tags.length, loadTags])
  
  return {
    tags,
    selectedTag,
    sortBy,
    sortOrder,
    filterByTag,
  }
}
```

```typescript
// widgets/post-filter/ui/PostFilter.tsx
import { usePostFilter } from '../model/usePostFilter'
import { usePostStore } from '../../../entities/post/model/store'

export const PostFilter = () => {
  const { tags, selectedTag, sortBy, sortOrder, filterByTag } = usePostFilter()
  const { setSortBy, setSortOrder } = usePostStore()
  
  return (
    <div className="flex gap-4">
      <Select value={selectedTag} onValueChange={filterByTag}>
        <SelectTrigger>
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.slug} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger>
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger>
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
```

---

## 단계별 마이그레이션 계획

### 📅 작업 순서 (오류 없이 순차적으로 진행)

#### 1단계: Comment List Widget 생성
**목표**: 가장 독립적인 Widget부터 시작

- [ ] `widgets/comment-list/model/useCommentList.ts` 생성
  - Store에서 댓글 조회
  - Feature 훅 사용
  - 데이터 가공 로직 추가

- [ ] `widgets/comment-list/ui/CommentList.tsx` 생성
  - useCommentList 훅 사용
  - 댓글 목록 UI 구현
  - Props로 postId만 받도록 설계

**의존성**: entities/comment/store, features/comment-* 완료 필요

---

#### 2단계: Post List Widget 생성
**목표**: 게시물 목록을 독립적인 Widget으로 분리

- [ ] `widgets/post-list/model/usePostList.ts` 생성
  - Store에서 게시물 조회
  - Feature 훅 사용 (search, filter)
  - 필터링 및 정렬 로직 추가

- [ ] `widgets/post-list/ui/PostList.tsx` 생성
  - usePostList 훅 사용
  - 게시물 테이블 UI 구현
  - Props 없이 동작하도록 설계

**의존성**: entities/post/store, features/post-search, features/post-filter 완료 필요

---

#### 3단계: Post Detail Widget 생성
**목표**: 게시물 상세를 독립적인 Widget으로 분리

- [ ] `widgets/post-detail/model/usePostDetail.ts` 생성
  - Store에서 게시물 조회
  - CommentList Widget 재사용

- [ ] `widgets/post-detail/ui/PostDetailDialog.tsx` 생성
  - usePostDetail 훅 사용
  - 게시물 상세 다이얼로그 UI 구현
  - Props로 postId만 받도록 설계

**의존성**: 1단계 완료 필요 (CommentList Widget)

---

#### 4단계: Post Filter Widget 생성
**목표**: 필터 UI를 독립적인 Widget으로 분리

- [ ] `widgets/post-filter/model/usePostFilter.ts` 생성
  - Store에서 필터 상태 조회
  - Feature 훅 사용

- [ ] `widgets/post-filter/ui/PostFilter.tsx` 생성
  - usePostFilter 훅 사용
  - 필터 UI 구현
  - Props 없이 동작하도록 설계

**의존성**: entities/post/store, features/post-filter 완료 필요

---

#### 5단계: Post Search Widget 생성 (선택적)
**목표**: 검색 UI를 독립적인 Widget으로 분리

- [ ] `widgets/post-search/model/usePostSearch.ts` 생성
  - Store에서 검색 상태 조회
  - Feature 훅 사용

- [ ] `widgets/post-search/ui/PostSearchInput.tsx` 생성
  - usePostSearch 훅 사용
  - 검색 입력 UI 구현
  - Props 없이 동작하도록 설계

**의존성**: entities/post/store, features/post-search 완료 필요

---

#### 6단계: PostsManagerPage에서 Widget 사용
**목표**: PostsManagerPage를 Widget 조합으로 변경

- [ ] `PostsManagerPage.tsx` 리팩토링
  - 직접 데이터 조회 제거
  - Widget 컴포넌트 import 및 사용
  - 상태 관리 최소화

- [ ] Props Drilling 제거 확인
- [ ] Widget 재사용성 확인

**의존성**: 1~5단계 완료 필요

---

## 데이터 재사용 패턴 및 예시

### ✅ Best Practices

#### 1. Widget은 Store에서 직접 데이터 조회
```typescript
// ✅ 좋은 예: Widget이 Store에서 직접 조회
const PostList = () => {
  const posts = usePostStore((state) => state.posts)
  const { fetchPosts } = usePostStore()
  // ...
}

// ❌ 나쁜 예: Props로 데이터 전달
const PostList = ({ posts, fetchPosts }) => {
  // ...
}
```

#### 2. Widget에 특화된 데이터 가공은 Model에서 처리
```typescript
// ✅ 좋은 예: Model에서 데이터 가공
export const usePostList = () => {
  const posts = usePostStore((state) => state.posts)
  
  const filteredPosts = useMemo(() => {
    return posts.filter(/* 필터링 로직 */)
  }, [posts])
  
  return { posts: filteredPosts }
}
```

#### 3. Widget 간 재사용
```typescript
// ✅ 좋은 예: Widget이 다른 Widget을 재사용
const PostDetailDialog = ({ postId }) => {
  return (
    <Dialog>
      <PostContent postId={postId} />
      <CommentList postId={postId} />  {/* 다른 Widget 재사용 */}
    </Dialog>
  )
}
```

#### 4. 선택적 Props로 커스터마이징
```typescript
// ✅ 좋은 예: 기본 동작은 Store, 커스터마이징은 Props
interface CommentListProps {
  postId: number
  searchQuery?: string  // 선택적
  showActions?: boolean  // 선택적
}

const CommentList = ({ postId, searchQuery = '', showActions = true }: CommentListProps) => {
  const { comments } = useCommentList(postId)
  // ...
}
```

---

## 체크리스트

### Widget 생성
- [ ] `widgets/comment-list/` 생성 및 구현
- [ ] `widgets/post-list/` 생성 및 구현
- [ ] `widgets/post-detail/` 생성 및 구현
- [ ] `widgets/post-filter/` 생성 및 구현
- [ ] `widgets/post-search/` 생성 및 구현 (선택적)

### Widget Model 구현
- [ ] 각 Widget의 model/use*.ts 생성
- [ ] Store에서 데이터 조회
- [ ] Feature 훅 사용
- [ ] Widget에 특화된 데이터 가공 로직 추가

### Widget UI 구현
- [ ] 각 Widget의 ui/*.tsx 생성
- [ ] Model 훅 사용
- [ ] Props 최소화 (필수만)
- [ ] 재사용 가능한 구조로 설계

### PostsManagerPage 리팩토링
- [ ] 직접 데이터 조회 제거
- [ ] Widget 컴포넌트 사용
- [ ] Props Drilling 제거
- [ ] 상태 관리 최소화

### 데이터 재사용성 확인
- [ ] Widget이 다른 페이지에서도 사용 가능한지 확인
- [ ] Widget 간 재사용 가능한지 확인
- [ ] 데이터 흐름이 명확한지 확인
- [ ] 테스트 가능한 구조인지 확인

---

## 마무리

이 계획서는 **Widget을 중심으로 데이터를 재사용 가능한 형태로 분리하는 마이그레이션 로드맵**입니다.

각 Widget이 자체적으로 필요한 데이터를 관리하고 조회하여 독립적으로 동작할 수 있도록 하며, 다른 페이지나 다른 Widget에서도 재사용할 수 있는 구조를 만듭니다.

**다음 단계**: 1단계부터 순차적으로 Widget을 생성하고 데이터 재사용성을 확보합니다.

