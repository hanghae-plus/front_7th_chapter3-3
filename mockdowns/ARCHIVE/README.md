# 작업 진행 상태 추적 시스템

## 📋 개요

이 폴더는 Agent 작업의 진행 상태를 추적하고, 다음 작업을 명확히 기록하는 시스템입니다.
**각 Agent는 작업 시작 전 이 폴더의 파일들을 읽고, 작업 완료 후 상태를 업데이트해야 합니다.**

---

## 📁 파일 구조

```
mockdowns/steps/
├── README.md              # 이 파일 (시스템 설명)
├── current-step.md        # 현재 진행 중인 Step
├── next-step.md           # 다음에 수행할 Step
├── progress.md            # 전체 진행 상태 요약
├── phase-1.md             # Phase 1 진행 상태
├── phase-2.md             # Phase 2 진행 상태
├── phase-3.md             # Phase 3 진행 상태
├── phase-4.md             # Phase 4 진행 상태
├── phase-5.md             # Phase 5 진행 상태
├── phase-6.md             # Phase 6 진행 상태
├── phase-7.md             # Phase 7 진행 상태
└── mcp-usage-guide.md     # MCP 활용 가이드
```

---

## 🔄 작업 흐름

### 1. 작업 시작 전

**반드시 다음 파일들을 읽으세요:**

1. **`current-step.md`** - 현재 진행 중인 Step 확인
2. **`next-step.md`** - 다음에 수행할 Step 확인
3. **`progress.md`** - 전체 진행 상태 파악
4. **해당 Phase 파일** (예: `phase-1.md`) - Phase별 상세 상태
5. **`mcp-usage-guide.md`** - MCP 활용 방법

**그리고 다음 문서들도 읽으세요:**

- `mockdowns/Rules/core-principles.md` ⭐⭐⭐ (핵심 원칙)
- `mockdowns/workflow/README.md` (전체 워크플로우)
- 해당 Step의 참고 문서들

---

### 2. 작업 진행 중

**작은 단위로 작업하고 즉시 검증:**

1. 한 번에 하나의 파일만 생성/수정
2. 파일 생성/수정 후 즉시 `tsc --noEmit` 실행
3. 오류 발생 시 즉시 수정
4. 작업 완료 후 `current-step.md` 업데이트

---

### 3. 작업 완료 후

**반드시 다음을 수행하세요:**

1. **`current-step.md` 업데이트**
   - 완료된 작업 체크
   - 검증 결과 기록
   - 문제점 및 해결 방법 기록

2. **`next-step.md` 업데이트**
   - 다음 Step 명시
   - 필요한 참고 문서 명시
   - 예상 작업 시간 기록

3. **해당 Phase 파일 업데이트**
   - Step 완료 상태 업데이트
   - 진행률 계산

4. **`progress.md` 업데이트**
   - 전체 진행률 업데이트
   - 다음 Phase/Step 명시

---

## 📋 파일별 역할

### `current-step.md`

**현재 진행 중인 Step의 상세 정보**

- Step 번호 및 이름
- 작업 목록 (체크리스트)
- 현재 진행 상황
- 검증 결과
- 문제점 및 해결 방법

---

### `next-step.md`

**다음에 수행할 Step의 명확한 지침**

- Step 번호 및 이름
- 작업 목표
- 구체적인 작업 순서
- 필요한 참고 문서
- 검증 방법
- 예상 소요 시간

---

### `progress.md`

**전체 진행 상태 요약**

- 전체 진행률 (%)
- 현재 Phase 및 Step
- 완료된 Phase 목록
- 다음 Phase/Step
- 전체 체크리스트

---

### `phase-{N}.md`

**각 Phase별 상세 진행 상태**

- Phase 목표
- Step별 완료 상태
- 진행률 (%)
- 완료된 작업 목록
- 남은 작업 목록

---

### `mcp-usage-guide.md`

**MCP 활용 가이드**

- 사용 가능한 MCP 서버 목록
- 각 MCP의 활용 시점
- 구체적인 사용 예시
- 주의사항

---

## 🎯 Agent 작업 시작 프로세스

### Step 1: 상태 확인

```bash
# 1. 현재 진행 상태 확인
cat mockdowns/steps/current-step.md
cat mockdowns/steps/next-step.md
cat mockdowns/steps/progress.md

# 2. 해당 Phase 파일 확인
cat mockdowns/steps/phase-{N}.md

# 3. MCP 활용 가이드 확인
cat mockdowns/steps/mcp-usage-guide.md
```

### Step 2: 참고 문서 읽기

```bash
# 핵심 원칙 읽기
cat mockdowns/Rules/core-principles.md

# 전체 워크플로우 읽기
cat mockdowns/workflow/README.md

# 해당 Step의 참고 문서 읽기
# (next-step.md에 명시된 문서들)
```

### Step 3: 작업 수행

- `next-step.md`의 지침에 따라 작업 수행
- 작은 단위로 작업하고 즉시 검증
- MCP를 적절히 활용

### Step 4: 상태 업데이트

- `current-step.md` 업데이트
- `next-step.md` 업데이트
- 해당 Phase 파일 업데이트
- `progress.md` 업데이트

---

## ✅ 체크리스트

### 작업 시작 전 (필수)

**최우선 (반드시 읽기):**
- [ ] `current-step.md` 읽기
- [ ] `next-step.md` 읽기
- [ ] `progress.md` 읽기
- [ ] `mockdowns/Rules/core-principles.md` 읽기 ⭐⭐⭐

**필수 확인:**
- [ ] Git 상태 확인 (`git status`)
- [ ] 해당 Phase 파일 읽기
- [ ] `next-step.md`에 명시된 필수 참고 문서 읽기

**선택적 (필요 시 읽기):**
- [ ] `mcp-usage-guide.md` 읽기 (MCP 사용 시)
- [ ] 전체 워크플로우 읽기 (전체 맥락 파악 필요 시)
- [ ] 해당 Step의 선택적 참고 문서 읽기

### 작업 완료 후

**검증 순서:**
1. [ ] 타입 체크 통과 확인 (`tsc --noEmit`)
2. [ ] 핵심 원칙 준수 확인
3. [ ] 상태 파일 업데이트
   - [ ] `current-step.md` 업데이트 (완료된 작업 체크, 검증 결과 기록)
   - [ ] `next-step.md` 업데이트 (다음 Step 명시)
   - [ ] 해당 Phase 파일 업데이트 (진행률 계산)
   - [ ] `progress.md` 업데이트 (전체 진행률 업데이트)
4. [ ] Git 커밋 (선택적, Step 완료 시 권장)
   - 커밋 메시지: `feat: Step {N} 완료 - {작업 내용}`
   - 참고: `mockdowns/Rules/rollback-guide.md`

**상태 파일 업데이트 실패 시:**
- 오류 메시지를 `current-step.md`의 "문제점 및 해결 방법" 섹션에 기록
- 다음 Agent가 확인할 수 있도록 명확히 기록

---

## 🚨 중요 사항

### 절대 하지 말아야 할 것들

1. ❌ **상태 파일을 업데이트하지 않고 작업 진행**
2. ❌ **다음 Agent를 위해 정보를 남기지 않음**
3. ❌ **참고 문서를 읽지 않고 작업 진행**
4. ❌ **Git 상태 확인 없이 작업 시작**

### 반드시 해야 할 것들

1. ✅ **작업 시작 전 모든 상태 파일 읽기**
2. ✅ **작업 완료 후 상태 파일 업데이트**
3. ✅ **다음 Agent를 위해 명확한 정보 제공**
4. ✅ **MCP를 적절히 활용하여 효율성 향상**

---

## 📚 관련 문서

- `mockdowns/Rules/core-principles.md` - 핵심 원칙
- `mockdowns/workflow/README.md` - 전체 워크플로우
- `mockdowns/starts/agent-start-prompt.md` - Agent 시작 프롬프트

---

**이 시스템을 따르면 여러 Agent가 순차적으로 작업을 진행할 수 있습니다! 🚀**

