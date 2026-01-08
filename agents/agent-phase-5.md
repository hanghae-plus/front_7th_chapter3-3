# Agent: Phase 5 - Shared 정리

## 📋 Agent 정보

**이름**: Phase 5 Shared 정리 Agent
**목적**: Shared 레이어 정리 및 컴포넌트 이동
**실행 시간**: 60-90분
**Phase**: Phase 5
**Step**: Step 5.1, 5.2

---

## 🎯 작업 목표

Shared 레이어 정리, 공통 컴포넌트 및 로직 분리

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 파일 이동 시 검증 필수, 기능 회귀 테스트 필수
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: 파일 이동 후 import 경로 정확히 수정
- 🔧 **최소한의 작업**: 필요한 파일만 이동

---

## 📋 필수 읽기 문서 (작업 전)

### 1. 핵심 원칙 (필수!)

**파일**: `mockdowns/WORK/core-principles.md`

---

### 2. 참고 문서

**파일들:**
- `mockdowns/RULES/file-migration-guide.md` - 파일 이동 가이드 (필수!)
- `mockdowns/RULES/rollback-guide.md` - 롤백 가이드
- `mockdowns/PLANS/fsd-migration-plan.md` - FSD 마이그레이션 계획

---

## ⚠️ 중요 주의사항

**이 Phase는 파일 이동이 포함되어 안정성 리스크가 높습니다!**

1. **파일 이동 전 Git 커밋 필수**
2. **한 번에 하나의 파일만 이동**
3. **각 파일 이동 후 즉시 검증**
4. **import 경로 정확히 수정**

---

## 📋 Step 5.1: 공통 컴포넌트 이동

### 작업 순서

#### 1. 컴포넌트 이동

**참고**: `mockdowns/RULES/file-migration-guide.md`의 절차 따르기

**작업 내용:**
1. `src/components/` → `src/shared/ui/` 이동
2. 각 파일 이동 후 import 경로 수정
3. 타입 체크 (`tsc --noEmit`)

**검증:**
```bash
tsc --noEmit
```

---

## 📋 Step 5.2: 공통 로직 분리

### 작업 순서

#### 1. 공통 로직 분리

**작업 내용:**
1. 공통 유틸리티 함수 분리
2. `src/shared/lib/`에 배치

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

2. **기능 회귀 테스트** (필수!)
   - 브라우저에서 모든 기능 확인
   - `mockdowns/RULES/refactoring-safety-guide.md` 참고

3. **파일 이동 확인**
   - [ ] 모든 컴포넌트가 `shared/ui/`로 이동
   - [ ] 모든 import 경로 수정됨

4. **체크포인트 확인**
   - [ ] shared 공통 컴포넌트를 분리했나요?
   - [ ] shared 공통 로직을 분리했나요?

---

## 📝 상태 파일 업데이트

작업 완료 후 다음 파일들을 업데이트하세요:

1. `mockdowns/WORK/current-step.md`
2. `mockdowns/WORK/next-step.md`
3. `mockdowns/WORK/phase-5.md`
4. `mockdowns/WORK/progress.md`

---

## 🎯 다음 단계

다음 Agent 실행:

- **Phase 6 작업**: `@agents/agent-phase-6.md`
- **검증**: `@agents/agent-verify.md`

---

## ⚠️ 문제 발생 시

파일 이동 중 문제 발생 시:

1. 즉시 작업 중단
2. `mockdowns/RULES/rollback-guide.md` 참고하여 롤백
3. 문제 해결 후 다시 시도

---

**Phase 5 완료 후 다음 Phase로 진행하세요! 🚀**

