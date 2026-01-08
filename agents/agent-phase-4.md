# Agent: Phase 4 - Widgets 생성

## 📋 Agent 정보

**이름**: Phase 4 Widgets 생성 Agent
**목적**: 재사용 가능한 Widget 생성
**실행 시간**: 60-90분
**Phase**: Phase 4
**Step**: Step 4.1, 4.2, 4.3

---

## 🎯 작업 목표

재사용 가능한 Widget 생성, 데이터 재사용 구조 구축

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 기존 기능 보존
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: Widget 구조 명확히 정의
- 🔧 **최소한의 작업**: 필요한 Widget만 생성

---

## 📋 필수 읽기 문서 (작업 전)

### 1. 핵심 원칙 (필수!)

**파일**: `mockdowns/WORK/core-principles.md`

---

### 2. 참고 문서

**파일들:**
- `mockdowns/PLANS/widget-data-reusability-plan.md` - Widget 재사용 계획
- `mockdowns/PLANS/fsd-migration-plan.md` - FSD 마이그레이션 계획

---

## 📋 Step 4.1: Post List Widget

### 작업 순서

**폴더 생성**: `src/widgets/post-list/`

**작업 내용:**
1. `ui/post-list.tsx` 생성
2. Store 기반 데이터 fetching

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 4.2: Post Detail Widget

### 작업 순서

**폴더 생성**: `src/widgets/post-detail/`

**작업 내용:**
1. `ui/post-detail.tsx` 생성
2. 댓글 목록 포함

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 4.3: Post Filter Widget

### 작업 순서

**폴더 생성**: `src/widgets/post-filter/`

**작업 내용:**
1. `ui/post-filter.tsx` 생성
2. 검색, 필터링, 정렬 통합

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

2. **생성된 Widget 확인**
   - [ ] Post List Widget
   - [ ] Post Detail Widget
   - [ ] Post Filter Widget
   - [ ] Comment List Widget (선택적)

3. **체크포인트 확인**
   - [ ] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?

---

## 📝 상태 파일 업데이트

작업 완료 후 다음 파일들을 업데이트하세요:

1. `mockdowns/WORK/current-step.md`
2. `mockdowns/WORK/next-step.md`
3. `mockdowns/WORK/phase-4.md`
4. `mockdowns/WORK/progress.md`

---

## 🎯 다음 단계

다음 Agent 실행:

- **Phase 5 작업**: `@agents/agent-phase-5.md`
- **검증**: `@agents/agent-verify.md`

---

**Phase 4 완료 후 다음 Phase로 진행하세요! 🚀**

