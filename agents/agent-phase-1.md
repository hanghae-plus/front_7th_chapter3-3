# Agent: Phase 1 - 기초 작업

## 📋 Agent 정보

**이름**: Phase 1 기초 작업 Agent
**목적**: TypeScript 타입 정의 및 기본 구조 생성
**실행 시간**: 30-60분
**Phase**: Phase 1
**Step**: Step 1.1, 1.2

---

## 🎯 작업 목표

TypeScript 타입 정의 및 Entities API 기본 구조 생성

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 새 파일만 생성, 기존 코드 변경 없음
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: 타입 정의를 먼저 작성, API 응답 구조 참고
- 🔧 **최소한의 작업**: 필요한 타입만 정의

---

## 📋 필수 읽기 문서 (작업 전)

### 1. 핵심 원칙 (필수!)

**파일**: `mockdowns/WORK/core-principles.md`

**확인 사항:**
- [ ] 안정성 원칙 이해
- [ ] 속도 원칙 이해 (타입 체크 우선)
- [ ] 정확성 원칙 이해
- [ ] 최소한의 작업 원칙 이해

---

### 2. 현재 Step 확인

**파일**: `mockdowns/WORK/current-step.md`

**확인 사항:**
- [ ] 현재 Step이 Phase 1, Step 1.1인지 확인
- [ ] 진행 상태 확인

---

### 3. 다음 Step 확인

**파일**: `mockdowns/WORK/next-step.md`

**확인 사항:**
- [ ] 작업 목표 확인
- [ ] 구체적인 작업 순서 확인

---

### 4. 참고 문서

**파일들:**
- `mockdowns/RULES/api-response-structure.md` - API 응답 구조 (타입 정의 시 필수)
- `mockdowns/RULES/index-export-rules.md` - index.ts export 규칙
- `mockdowns/PLANS/typescript-types-migration-plan.md` - 타입 정의 상세 계획

---

## 📋 Step 1.1: TypeScript 타입 정의

### 작업 순서

#### 1. User 타입 정의

**파일 생성**: `src/entities/user/model/types.ts`

**작업 내용:**
1. User 인터페이스 정의
2. Address 인터페이스 정의
3. Company 인터페이스 정의
4. `mockdowns/RULES/api-response-structure.md` 참고하여 정확한 구조 작성

**검증:**
```bash
# ✅ Agent가 직접 실행 가능 (pnpm 불필요)
tsc --noEmit
# 오류가 없어야 함
```

**타입 체크 실패 시:**
- 오류 메시지 확인
- 해당 타입 정의 수정
- `mockdowns/RULES/api-response-structure.md` 재확인

---

#### 2. Post 타입 정의

**파일 생성**: `src/entities/post/model/types.ts`

**작업 내용:**
1. Post 인터페이스 정의
2. Reactions 인터페이스 정의
3. User 타입 import (의존성 확인)
4. `mockdowns/RULES/api-response-structure.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 3. Comment 타입 정의

**파일 생성**: `src/entities/comment/model/types.ts`

**작업 내용:**
1. Comment 인터페이스 정의
2. User 타입 import (의존성 확인)
3. `mockdowns/RULES/api-response-structure.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 4. API 응답 타입 정의

**작업 내용:**
1. 각 엔티티별 Response 타입 추가
   - `entities/user/model/types.ts`: UsersResponse, UserResponse
   - `entities/post/model/types.ts`: PostsResponse, PostResponse, TagsResponse
   - `entities/comment/model/types.ts`: CommentsResponse, CommentResponse
2. `mockdowns/RULES/api-response-structure.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 5. DTO 타입 정의

**작업 내용:**
1. CreatePostDto, UpdatePostDto 추가
2. CreateCommentDto, UpdateCommentDto 추가
3. FetchPostsParams 추가

**검증:**
```bash
tsc --noEmit
```

---

#### 6. index.ts 생성

**작업 내용:**
1. 각 엔티티별 `model/index.ts` 생성
2. `mockdowns/RULES/index-export-rules.md` 참고하여 export 규칙 준수

**파일들:**
- `src/entities/user/model/index.ts`
- `src/entities/post/model/index.ts`
- `src/entities/comment/model/index.ts`

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 1.2: Entities API 기본 구조 생성

### 작업 순서

#### 1. Post API 생성

**파일 생성**: `src/entities/post/api/post-api.ts`

**작업 내용:**
1. 기본 CRUD 함수 구현:
   - `fetchPosts(params?: FetchPostsParams): Promise<PostsResponse>`
   - `fetchPostById(id: number): Promise<PostResponse>`
   - `addPost(post: CreatePostDto): Promise<PostResponse>`
   - `updatePost(id: number, post: UpdatePostDto): Promise<PostResponse>`
   - `deletePost(id: number): Promise<void>`
2. 에러 처리 포함

**파일 생성**: `src/entities/post/api/index.ts`
- `mockdowns/RULES/index-export-rules.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 2. Comment API 생성

**파일 생성**: `src/entities/comment/api/comment-api.ts`

**작업 내용:**
1. 기본 CRUD 함수 구현:
   - `fetchComments(postId: number): Promise<CommentsResponse>`
   - `addComment(comment: CreateCommentDto): Promise<CommentResponse>`
   - `updateComment(id: number, comment: UpdateCommentDto): Promise<CommentResponse>`
   - `deleteComment(id: number): Promise<void>`
2. 에러 처리 포함

**파일 생성**: `src/entities/comment/api/index.ts`

**검증:**
```bash
tsc --noEmit
```

---

#### 3. User API 생성

**파일 생성**: `src/entities/user/api/user-api.ts`

**작업 내용:**
1. 기본 조회 함수 구현:
   - `fetchUsers(params?: FetchUsersParams): Promise<UsersResponse>`
   - `fetchUserById(id: number): Promise<UserResponse>`
2. 에러 처리 포함

**파일 생성**: `src/entities/user/api/index.ts`

**검증:**
```bash
tsc --noEmit
```

---

## ✅ 작업 완료 확인

### 최종 검증

1. **타입 체크**
   ```bash
   tsc --noEmit
   # 오류가 없어야 함
   ```

2. **생성된 파일 확인**
   - [ ] `src/entities/user/model/types.ts`
   - [ ] `src/entities/user/model/index.ts`
   - [ ] `src/entities/post/model/types.ts`
   - [ ] `src/entities/post/model/index.ts`
   - [ ] `src/entities/comment/model/types.ts`
   - [ ] `src/entities/comment/model/index.ts`
   - [ ] `src/entities/post/api/post-api.ts`
   - [ ] `src/entities/post/api/index.ts`
   - [ ] `src/entities/comment/api/comment-api.ts`
   - [ ] `src/entities/comment/api/index.ts`
   - [ ] `src/entities/user/api/user-api.ts`
   - [ ] `src/entities/user/api/index.ts`

3. **체크포인트 확인**
   - [ ] entities를 중심으로 type을 정의하고 model을 분리했나요?
   - [ ] entities를 중심으로 api를 분리했나요?

---

## 📝 상태 파일 업데이트

작업 완료 후 다음 파일들을 업데이트하세요:

1. **`mockdowns/WORK/current-step.md`**
   - Step 1.1, 1.2 완료 체크
   - 완료 시간 기록

2. **`mockdowns/WORK/next-step.md`**
   - 다음 Step (Phase 2, Step 2.1) 명시

3. **`mockdowns/WORK/phase-1.md`**
   - 진행률 업데이트 (100%)

4. **`mockdowns/WORK/progress.md`**
   - 전체 진행률 업데이트

---

## 🎯 다음 단계

다음 Agent 실행:

- **Phase 2 작업**: `@agents/agent-phase-2.md`
- **검증**: `@agents/agent-verify.md`

---

## ⚠️ 주의사항

1. **기존 코드 변경 금지**: 새 파일만 생성
2. **타입 체크 필수**: 각 단계마다 `tsc --noEmit` 실행
3. **API 응답 구조 참고**: `mockdowns/RULES/api-response-structure.md` 반드시 참고
4. **에러 발생 시**: 즉시 수정하고 다시 검증

---

**Phase 1 완료 후 다음 Phase로 진행하세요! 🚀**

