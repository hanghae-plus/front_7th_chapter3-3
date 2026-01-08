# Agent: Phase 3 - Features 분리

## 📋 Agent 정보

**이름**: Phase 3 Features 분리 Agent
**목적**: 사용자 기능별로 코드 분리
**실행 시간**: 90-120분
**Phase**: Phase 3
**Step**: Step 3.1, 3.2, 3.3

---

## 🎯 작업 목표

사용자 기능별로 코드 분리, Feature 레이어 구조 생성

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 기존 기능 보존, 점진적 변경
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: Feature 구조 명확히 정의
- 🔧 **최소한의 작업**: 필요한 Feature만 생성

---

## 📋 필수 읽기 문서 (작업 전)

### 1. 핵심 원칙 (필수!)

**파일**: `mockdowns/WORK/core-principles.md`

---

### 2. 참고 문서

**파일들:**
- `mockdowns/PLANS/feature-api-separation-plan.md` - Feature API 분리 계획
- `mockdowns/PLANS/fsd-migration-plan.md` - FSD 마이그레이션 계획
- `mockdowns/RULES/coding-rules.md` - 코딩 규칙 (FSD 구조)

---

## 📋 Step 3.1: Post Features 생성

### 작업 순서

#### 1. Post Search Feature

**폴더 생성**: `src/features/post-search/`

**작업 내용:**
1. `ui/post-search.tsx` 생성
2. `model/use-post-search.ts` 생성 (hook)
3. `api/post-search-api.ts` 생성 (필요 시)

**검증:**
```bash
tsc --noEmit
```

---

#### 2. Post Filter Feature

**폴더 생성**: `src/features/post-filter/`

**작업 내용:**
1. `ui/post-filter.tsx` 생성
2. `model/use-post-filter.ts` 생성

**검증:**
```bash
tsc --noEmit
```

---

#### 3. Post CRUD Features

**폴더 생성**: 
- `src/features/post-create/`
- `src/features/post-edit/`
- `src/features/post-delete/`

**작업 내용:**
각 Feature별로 UI, Model 분리

**검증:**
```bash
tsc --noEmit
```

---

#### 4. Post Pagination Feature

**폴더 생성**: `src/features/post-pagination/`

**작업 내용:**
1. `ui/post-pagination.tsx` 생성
2. `model/use-post-pagination.ts` 생성

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 3.2: Comment Features 생성

### 작업 순서

#### 1. Comment CRUD Features

**폴더 생성**: 
- `src/features/comment-create/`
- `src/features/comment-edit/`
- `src/features/comment-delete/`

**작업 내용:**
각 Feature별로 UI, Model 분리
- `mockdowns/PLANS/fsd-migration-plan.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 2. Comment Like Feature

**폴더 생성**: `src/features/comment-like/`

**작업 내용:**
1. `ui/comment-like-button.tsx` 생성
2. `model/use-comment-like.ts` 생성
3. `api/comment-like-api.ts` 생성
   - `mockdowns/PLANS/feature-api-separation-plan.md` 참고
   - `likeComment(id: number, postId: number)` 함수 구현

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 3.3: User Feature 생성

### 작업 순서

#### 1. User View Feature

**폴더 생성**: `src/features/user-view/`

**작업 내용:**
1. `ui/user-view-modal.tsx` 생성
2. `model/use-user-view.ts` 생성
3. `api/user-view-api.ts` 생성 (필요 시)
   - `mockdowns/PLANS/feature-api-separation-plan.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 3.4: Features API 분리

### 작업 순서

**참고**: `mockdowns/PLANS/feature-api-separation-plan.md` (2-5단계)

#### 1. Post Search API

**파일 생성**: `src/features/post-search/api/post-search-api.ts`

**작업 내용:**
- `searchPosts(query: string)` 함수 구현
- `mockdowns/PLANS/feature-api-separation-plan.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 2. Post Filter API

**파일 생성**: `src/features/post-filter/api/post-filter-api.ts`

**작업 내용:**
- `fetchPostsByTag(tag: string)` 함수 구현
- `fetchTags()` 함수 구현
- `mockdowns/PLANS/feature-api-separation-plan.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 3. Comment Like API

**파일 생성**: `src/features/comment-like/api/comment-like-api.ts`

**작업 내용:**
- `likeComment(id: number, postId: number)` 함수 구현
- `mockdowns/PLANS/feature-api-separation-plan.md` 참고

**검증:**
```bash
tsc --noEmit
```

---

#### 4. User View API

**파일 생성**: `src/features/user-view/api/user-view-api.ts` (필요 시)

**작업 내용:**
- `fetchUserById(id: number)` 함수 구현 (entities API 재사용 가능)
- `mockdowns/PLANS/feature-api-separation-plan.md` 참고

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
   ```

2. **생성된 Feature 확인**
   - [ ] Post Features (Search, Filter, CRUD, Pagination)
   - [ ] Comment Features (CRUD, Like)
   - [ ] User Feature (View)

---

## 📝 상태 파일 업데이트

작업 완료 후 다음 파일들을 업데이트하세요:

1. `mockdowns/WORK/current-step.md`
2. `mockdowns/WORK/next-step.md`
3. `mockdowns/WORK/phase-3.md`
4. `mockdowns/WORK/progress.md`

---

## 🎯 다음 단계

다음 Agent 실행:

- **Phase 4 작업**: `@agents/agent-phase-4.md`
- **검증**: `@agents/agent-verify.md`

---

**Phase 3 완료 후 다음 Phase로 진행하세요! 🚀**

