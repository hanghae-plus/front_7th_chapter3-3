# TypeScript 타입 정의 및 마이그레이션 계획서

## 📋 목차
1. [현재 타입 문제점 분석](#현재-타입-문제점-분석)
2. [Entities 타입 정의 계획](#entities-타입-정의-계획)
3. [단계별 마이그레이션 계획](#단계별-마이그레이션-계획)
4. [타입 정의 상세](#타입-정의-상세)
5. [체크리스트](#체크리스트)

---

## 현재 타입 문제점 분석

### 🔴 PostsManagerPage.tsx 타입 문제점

#### 1. useState 타입 미지정
```typescript
// ❌ 문제: 타입이 추론되지 않아 any로 처리됨
const [posts, setPosts] = useState([])                    // any[]
const [total, setTotal] = useState(0)                      // number (OK)
const [skip, setSkip] = useState(parseInt(...))            // number (OK)
const [limit, setLimit] = useState(parseInt(...))          // number (OK)
const [searchQuery, setSearchQuery] = useState("")         // string (OK)
const [selectedPost, setSelectedPost] = useState(null)     // null (타입 필요)
const [sortBy, setSortBy] = useState("")                   // string (OK)
const [sortOrder, setSortOrder] = useState("asc")         // string (타입 필요: 'asc' | 'desc')
const [showAddDialog, setShowAddDialog] = useState(false)  // boolean (OK)
const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })  // 타입 필요
const [loading, setLoading] = useState(false)              // boolean (OK)
const [tags, setTags] = useState([])                      // any[]
const [selectedTag, setSelectedTag] = useState("")         // string (OK)
const [comments, setComments] = useState({})               // Record<string, any>
const [selectedComment, setSelectedComment] = useState(null)  // null (타입 필요)
const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })  // 타입 필요
const [selectedUser, setSelectedUser] = useState(null)    // null (타입 필요)
```

#### 2. 함수 파라미터 타입 미지정
```typescript
// ❌ 문제: 파라미터 타입이 없음
const fetchPostsByTag = async (tag) => { ... }            // tag: any
const deletePost = async (id) => { ... }                  // id: any
const fetchComments = async (postId) => { ... }           // postId: any
const addComment = async () => { ... }                    // 내부에서 postId 사용
const updateComment = async () => { ... }                 // 내부에서 id 사용
const deleteComment = async (id, postId) => { ... }      // id: any, postId: any
const likeComment = async (id, postId) => { ... }         // id: any, postId: any
const openPostDetail = (post) => { ... }                 // post: any
const openUserModal = async (user) => { ... }            // user: any
const renderComments = (postId) => { ... }               // postId: any
```

#### 3. API 응답 타입 미지정
```typescript
// ❌ 문제: API 응답이 any로 처리됨
.then((response) => response.json())                       // Promise<any>
.then((data) => { ... })                                  // data: any
.then((users) => { ... })                                 // users: any
```

#### 4. 객체 속성 접근 시 타입 안정성 부족
```typescript
// ❌ 문제: 옵셔널 체이닝만으로는 타입 안정성 부족
post.author?.image                                        // author 타입 불명확
post.author?.username                                      // author 타입 불명확
post.tags?.map(...)                                       // tags 타입 불명확
post.reactions?.likes                                     // reactions 타입 불명확
selectedPost?.title                                       // selectedPost 타입 불명확
selectedComment?.body                                     // selectedComment 타입 불명확
selectedUser?.image                                       // selectedUser 타입 불명확
```

### 🔴 components/index.tsx 타입 문제점

#### 1. forwardRef 타입 미지정
```typescript
// ❌ 문제: forwardRef에 제네릭 타입이 없음
export const Input = forwardRef(({ className, type, ...props }, ref) => { ... })
export const Textarea = forwardRef(({ className, ...props }, ref) => { ... })
export const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => { ... })
export const SelectContent = forwardRef(({ className, children, position = "popper", ...props }, ref) => { ... })
export const SelectItem = forwardRef(({ className, children, ...props }, ref) => { ... })
export const DialogContent = forwardRef(({ className, children, ...props }, ref) => { ... })
export const DialogTitle = forwardRef(({ className, ...props }, ref) => { ... })
export const Table = forwardRef(({ className, ...props }, ref) => { ... })
export const TableHeader = forwardRef(({ className, ...props }, ref) => { ... })
export const TableBody = forwardRef(({ className, ...props }, ref) => { ... })
export const TableRow = forwardRef(({ className, ...props }, ref) => { ... })
export const TableHead = forwardRef(({ className, ...props }, ref) => { ... })
export const TableCell = forwardRef(({ className, ...props }, ref) => { ... })
```

#### 2. 컴포넌트 Props 타입 미지정
```typescript
// ❌ 문제: Props 타입이 없음
export const DialogHeader = ({ className, ...props }) => { ... }
export const Card = forwardRef(({ className, ...props }, ref) => { ... })
export const CardHeader = forwardRef(({ className, ...props }, ref) => { ... })
export const CardTitle = forwardRef(({ className, ...props }, ref) => { ... })
export const CardContent = forwardRef(({ className, ...props }, ref) => { ... })
```

---

## Entities 타입 정의 계획

### 📁 폴더 구조

```
src/entities/
├── post/
│   └── model/
│       └── types.ts          # Post 관련 타입 정의
├── comment/
│   └── model/
│       └── types.ts          # Comment 관련 타입 정의
└── user/
    └── model/
        └── types.ts          # User 관련 타입 정의
```

---

## 단계별 마이그레이션 계획

### 📅 작업 순서 (오류 없이 순차적으로 진행)

#### 1단계: 기본 엔티티 타입 정의 (의존성 없음)
**목표**: 가장 기본이 되는 타입들을 먼저 정의

- [ ] `entities/user/model/types.ts` 생성
  - User 타입 정의
  - Address 타입 정의
  - Company 타입 정의
  - UserSelect 타입 정의 (API select 옵션용)

- [ ] `entities/post/model/types.ts` 생성
  - Post 타입 정의
  - Reactions 타입 정의
  - PostWithAuthor 타입 정의 (author 포함)

- [ ] `entities/comment/model/types.ts` 생성
  - Comment 타입 정의
  - CommentWithUser 타입 정의 (user 포함)

**의존성**: 없음 (가장 기본 타입)

---

#### 2단계: Tag 및 API 응답 타입 정의
**목표**: Tag와 API 응답 구조 정의

- [ ] `entities/post/model/types.ts`에 추가
  - Tag 타입 정의
  - PostsResponse 타입 정의
  - PostResponse 타입 정의
  - TagsResponse 타입 정의

- [ ] `entities/comment/model/types.ts`에 추가
  - CommentsResponse 타입 정의
  - CommentResponse 타입 정의

- [ ] `entities/user/model/types.ts`에 추가
  - UsersResponse 타입 정의
  - UserResponse 타입 정의

**의존성**: 1단계 완료 필요

---

#### 3단계: DTO 타입 정의
**목표**: API 요청에 사용할 DTO 타입 정의

- [ ] `entities/post/model/types.ts`에 추가
  - CreatePostDto 타입 정의
  - UpdatePostDto 타입 정의
  - FetchPostsParams 타입 정의 (쿼리 파라미터)

- [ ] `entities/comment/model/types.ts`에 추가
  - CreateCommentDto 타입 정의
  - UpdateCommentDto 타입 정의

**의존성**: 1단계 완료 필요

---

#### 4단계: 컴포넌트 타입 수정 (shared/ui)
**목표**: shared/ui 컴포넌트들의 타입 정의

- [ ] `shared/ui/index.tsx` (또는 개별 파일) 수정
  - InputProps 타입 정의 및 적용
  - TextareaProps 타입 정의 및 적용
  - SelectTriggerProps 타입 정의 및 적용
  - SelectContentProps 타입 정의 및 적용
  - SelectItemProps 타입 정의 및 적용
  - DialogContentProps 타입 정의 및 적용
  - DialogHeaderProps 타입 정의 및 적용
  - DialogTitleProps 타입 정의 및 적용
  - TableProps 타입 정의 및 적용
  - TableHeaderProps 타입 정의 및 적용
  - TableBodyProps 타입 정의 및 적용
  - TableRowProps 타입 정의 및 적용
  - TableHeadProps 타입 정의 및 적용
  - TableCellProps 타입 정의 및 적용
  - CardProps 타입 정의 및 적용
  - CardHeaderProps 타입 정의 및 적용
  - CardTitleProps 타입 정의 및 적용
  - CardContentProps 타입 정의 및 적용

**의존성**: 없음 (독립적)

---

#### 5단계: PostsManagerPage 타입 적용
**목표**: PostsManagerPage에 모든 타입 적용

- [ ] Import 타입 추가
  - Post, PostWithAuthor import
  - Comment, CommentWithUser import
  - User import
  - Tag import
  - DTO 타입 import

- [ ] useState 타입 지정
  - posts: PostWithAuthor[]
  - selectedPost: PostWithAuthor | null
  - tags: Tag[]
  - comments: Record<number, CommentWithUser[]>
  - selectedComment: CommentWithUser | null
  - selectedUser: User | null
  - newPost: CreatePostDto
  - newComment: CreateCommentDto
  - sortOrder: 'asc' | 'desc'

- [ ] 함수 파라미터 타입 지정
  - fetchPostsByTag(tag: string)
  - deletePost(id: number)
  - fetchComments(postId: number)
  - deleteComment(id: number, postId: number)
  - likeComment(id: number, postId: number)
  - openPostDetail(post: PostWithAuthor)
  - openUserModal(user: User)
  - renderComments(postId: number)

- [ ] API 응답 타입 지정
  - fetchPosts: PostsResponse
  - fetchTags: TagsResponse
  - searchPosts: PostsResponse
  - fetchPostsByTag: PostsResponse
  - addPost: PostResponse
  - updatePost: PostResponse
  - fetchComments: CommentsResponse
  - addComment: CommentResponse
  - updateComment: CommentResponse
  - openUserModal: UserResponse

**의존성**: 1, 2, 3단계 완료 필요

---

#### 6단계: 타입 검증 및 오류 수정
**목표**: TypeScript 컴파일 오류 확인 및 수정

- [ ] `tsc --noEmit` 실행하여 타입 오류 확인
- [ ] 각 오류를 순차적으로 수정
- [ ] 타입 단언(as) 최소화
- [ ] 옵셔널 체이닝 적절히 사용
- [ ] 타입 가드 함수 추가 (필요시)

**의존성**: 1~5단계 완료 필요

---

## 타입 정의 상세

### 1. User 엔티티 타입 (`entities/user/model/types.ts`)

```typescript
// 주소 타입
export interface Address {
  address: string
  city: string
  state: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// 회사 타입
export interface Company {
  name: string
  title: string
  department?: string
  address?: Address
}

// 사용자 타입
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  age: number
  gender: string
  image: string
  phone: string
  address: Address
  company: Company
}

// API 응답 타입
export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface UserResponse extends User {}

// API select 옵션용 타입 (부분 선택)
export type UserSelect = Partial<Pick<User, 'username' | 'image'>>
```

---

### 2. Post 엔티티 타입 (`entities/post/model/types.ts`)

```typescript
import { User } from '../../user/model/types'

// 반응 타입
export interface Reactions {
  likes: number
  dislikes: number
}

// 게시물 타입
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
  views?: number
}

// 작성자 정보가 포함된 게시물 타입
export interface PostWithAuthor extends Post {
  author: User | undefined
}

// 태그 타입
export interface Tag {
  slug: string
  url: string
}

// API 응답 타입
export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface PostResponse extends Post {}

export interface TagsResponse extends Array<Tag> {}

// DTO 타입
export interface CreatePostDto {
  title: string
  body: string
  userId: number
  tags?: string[]
}

export interface UpdatePostDto {
  title?: string
  body?: string
  tags?: string[]
}

// API 쿼리 파라미터 타입
export interface FetchPostsParams {
  limit?: number
  skip?: number
  search?: string
  tag?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```

---

### 3. Comment 엔티티 타입 (`entities/comment/model/types.ts`)

```typescript
import { User } from '../../user/model/types'

// 댓글 타입
export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
}

// 사용자 정보가 포함된 댓글 타입
export interface CommentWithUser extends Comment {
  user: User
}

// API 응답 타입
export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface CommentResponse extends Comment {}

// DTO 타입
export interface CreateCommentDto {
  body: string
  postId: number | null
  userId: number
}

export interface UpdateCommentDto {
  body: string
  likes?: number
}
```

---

### 4. Shared UI 컴포넌트 타입 (`shared/ui/index.tsx`)

```typescript
import * as React from 'react'
import { HTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from 'react'

// Input 컴포넌트 타입
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

// Textarea 컴포넌트 타입
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

// Select 컴포넌트 타입
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  className?: string
  children?: React.ReactNode
}

export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  className?: string
  children?: React.ReactNode
  position?: 'popper' | 'item-aligned'
}

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string
  children?: React.ReactNode
}

// Dialog 컴포넌트 타입
export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string
  children?: React.ReactNode
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string
}

// Table 컴포넌트 타입
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

// Card 컴포넌트 타입
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}
```

---

### 5. PostsManagerPage 타입 적용 예시

```typescript
import { PostWithAuthor, CreatePostDto, UpdatePostDto, Tag } from '../entities/post/model/types'
import { CommentWithUser, CreateCommentDto, UpdateCommentDto } from '../entities/comment/model/types'
import { User } from '../entities/user/model/types'

const PostsManager = () => {
  // ✅ 타입이 명시적으로 지정됨
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [total, setTotal] = useState<number>(0)
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null)
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (queryParams.get("sortOrder") || "asc") as 'asc' | 'desc'
  )
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [newPost, setNewPost] = useState<CreatePostDto>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")
  const [comments, setComments] = useState<Record<number, CommentWithUser[]>>({})
  const [selectedComment, setSelectedComment] = useState<CommentWithUser | null>(null)
  const [newComment, setNewComment] = useState<CreateCommentDto>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false)
  const [showUserModal, setShowUserModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // ✅ 함수 파라미터 타입 지정
  const fetchPostsByTag = async (tag: string): Promise<void> => { ... }
  const deletePost = async (id: number): Promise<void> => { ... }
  const fetchComments = async (postId: number): Promise<void> => { ... }
  const deleteComment = async (id: number, postId: number): Promise<void> => { ... }
  const likeComment = async (id: number, postId: number): Promise<void> => { ... }
  const openPostDetail = (post: PostWithAuthor): void => { ... }
  const openUserModal = async (user: User): Promise<void> => { ... }
  const renderComments = (postId: number): JSX.Element => { ... }

  // ✅ API 응답 타입 지정
  const fetchPosts = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const data: PostsResponse = await response.json()
      // ...
    } catch (error) {
      // ...
    }
  }
}
```

---

## 체크리스트

### 기본 타입 정의
- [ ] User 엔티티 타입 정의 완료
- [ ] Post 엔티티 타입 정의 완료
- [ ] Comment 엔티티 타입 정의 완료
- [ ] Tag 타입 정의 완료
- [ ] Reactions 타입 정의 완료
- [ ] Address 타입 정의 완료
- [ ] Company 타입 정의 완료

### API 응답 타입
- [ ] PostsResponse 타입 정의 완료
- [ ] PostResponse 타입 정의 완료
- [ ] TagsResponse 타입 정의 완료
- [ ] CommentsResponse 타입 정의 완료
- [ ] CommentResponse 타입 정의 완료
- [ ] UsersResponse 타입 정의 완료
- [ ] UserResponse 타입 정의 완료

### DTO 타입
- [ ] CreatePostDto 타입 정의 완료
- [ ] UpdatePostDto 타입 정의 완료
- [ ] CreateCommentDto 타입 정의 완료
- [ ] UpdateCommentDto 타입 정의 완료
- [ ] FetchPostsParams 타입 정의 완료

### 컴포넌트 타입
- [ ] InputProps 타입 정의 및 적용 완료
- [ ] TextareaProps 타입 정의 및 적용 완료
- [ ] Select 컴포넌트 타입 정의 및 적용 완료
- [ ] Dialog 컴포넌트 타입 정의 및 적용 완료
- [ ] Table 컴포넌트 타입 정의 및 적용 완료
- [ ] Card 컴포넌트 타입 정의 및 적용 완료

### PostsManagerPage 타입 적용
- [ ] 모든 useState에 타입 지정 완료
- [ ] 모든 함수 파라미터에 타입 지정 완료
- [ ] API 응답 타입 지정 완료
- [ ] 타입 import 추가 완료

### 타입 검증
- [ ] `tsc --noEmit` 실행하여 오류 없음 확인
- [ ] 모든 any 타입 제거 완료
- [ ] 타입 단언(as) 최소화 완료
- [ ] 옵셔널 체이닝 적절히 사용 완료

---

## 주의사항

### ⚠️ 작업 시 주의할 점

1. **의존성 순서 준수**: 각 단계는 이전 단계가 완료되어야 진행 가능
2. **타입 단언 최소화**: `as` 사용을 최소화하고 타입 가드 사용
3. **옵셔널 체이닝**: null/undefined 가능성이 있는 경우 옵셔널 체이닝 사용
4. **점진적 적용**: 한 번에 모든 타입을 적용하지 말고 단계별로 적용
5. **타입 검증**: 각 단계마다 `tsc --noEmit` 실행하여 오류 확인

### 🔄 타입 오류 해결 방법

1. **타입 추론 실패**: 명시적 타입 지정
2. **null/undefined 오류**: 옵셔널 체이닝 또는 타입 가드 사용
3. **배열/객체 타입 오류**: 제네릭 타입 명시
4. **함수 파라미터 오류**: 파라미터 타입 명시
5. **API 응답 오류**: 응답 타입 인터페이스 정의

---

## 마무리

이 계획서는 **TypeScript 타입 정의 및 마이그레이션 로드맵**입니다.

각 단계를 순차적으로 진행하여 오류 없이 타입을 적용하고, FSD 아키텍처 원칙에 따라 entities 레이어에 타입을 정의합니다.

**다음 단계**: 1단계부터 순차적으로 타입 정의를 시작합니다.

