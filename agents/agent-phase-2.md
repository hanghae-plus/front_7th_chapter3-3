# Agent: Phase 2 - 상태 관리

## 📋 Agent 정보

**이름**: Phase 2 상태 관리 Agent
**목적**: Zustand Store 생성 및 상태 분리
**실행 시간**: 60-90분
**Phase**: Phase 2
**Step**: Step 2.1, 2.2, 2.3, 2.4

---

## 🎯 작업 목표

Zustand Store 생성 및 상태 분리, Props Drilling 최소화

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 기존 기능 보존, 점진적 변경
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: Store 구조 명확히 정의
- 🔧 **최소한의 작업**: 필요한 Store만 생성

---

## 📋 필수 읽기 문서 (작업 전)

### 1. 핵심 원칙 (필수!)

**파일**: `mockdowns/WORK/core-principles.md`

---

### 2. 현재 Step 확인

**파일**: `mockdowns/WORK/current-step.md`

---

### 3. 다음 Step 확인

**파일**: `mockdowns/WORK/next-step.md`

---

### 4. 참고 문서

**파일들:**
- `mockdowns/PLANS/state-management-plan.md` - 상태 관리 계획
- `mockdowns/RULES/coding-rules.md` - 코딩 규칙 (Zustand 사용 규칙)

---

## 📋 Step 2.1: Post Store 생성

### 작업 순서

#### 1. Post Store 기본 구조

**파일 생성**: `src/entities/post/model/store.ts`

**작업 내용:**
1. PostState 인터페이스 정의
2. usePostStore 생성 (Zustand create 사용)
3. 기본 상태: posts, total, loading, error
4. 기본 액션: fetchPosts

**검증:**
```bash
tsc --noEmit
```

---

#### 2. Post Store 필터링/검색 상태

**작업 내용:**
1. 검색, 필터링, 정렬 상태 추가:
   - searchQuery, selectedTag, tags, sortBy, sortOrder
2. 액션 추가:
   - setSearchQuery, setSelectedTag, setSortBy, setSortOrder

**검증:**
```bash
tsc --noEmit
```

---

#### 3. Post Store CRUD 액션

**작업 내용:**
1. addPost, updatePost, deletePost 구현
2. 각 액션에 에러 처리 포함

**검증:**
```bash
tsc --noEmit
```

---

#### 4. index.ts 업데이트

**파일**: `src/entities/post/model/index.ts`

**작업 내용:**
1. usePostStore export 추가

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 2.2: Comment Store 생성

### 작업 순서

#### 1. Comment Store 생성

**파일 생성**: `src/entities/comment/model/store.ts`

**작업 내용:**
1. CommentState 인터페이스 정의
2. useCommentStore 생성
3. 댓글 상태 및 액션 구현

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 2.3: User Store 생성

### 작업 순서

#### 1. User Store 생성

**파일 생성**: `src/entities/user/model/store.ts`

**작업 내용:**
1. UserState 인터페이스 정의
2. useUserStore 생성
3. 사용자 상태 및 액션 구현

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 2.4: UI Store 생성

### 작업 순서

#### 1. UI Store 생성

**파일 생성**: `src/shared/lib/stores/ui-store.ts`

**작업 내용:**
1. UIState 인터페이스 정의
2. useUIStore 생성
3. 다이얼로그 상태 관리

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

2. **생성된 파일 확인**
   - [ ] `src/entities/post/model/store.ts`
   - [ ] `src/entities/comment/model/store.ts`
   - [ ] `src/entities/user/model/store.ts`
   - [ ] `src/shared/lib/stores/ui-store.ts`

3. **체크포인트 확인**
   - [ ] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
   - [ ] Props Drilling을 최소화했나요? (Store 사용으로)

---

## 📝 상태 파일 업데이트

작업 완료 후 다음 파일들을 업데이트하세요:

1. `mockdowns/WORK/current-step.md`
2. `mockdowns/WORK/next-step.md`
3. `mockdowns/WORK/phase-2.md`
4. `mockdowns/WORK/progress.md`

---

## 🎯 다음 단계

다음 Agent 실행:

- **Phase 3 작업**: `@agents/agent-phase-3.md`
- **검증**: `@agents/agent-verify.md`

---

**Phase 2 완료 후 다음 Phase로 진행하세요! 🚀**

