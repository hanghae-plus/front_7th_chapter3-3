# Cursor Auto Agents

## 📋 개요

이 폴더는 Cursor Auto에서 순차적으로 실행할 수 있는 Agent 프롬프트들을 포함합니다.
각 Agent는 독립적으로 실행 가능하며, 명확한 시작점과 종료점을 가집니다.

---

## 🎯 핵심 원칙

모든 Agent는 다음 4가지 원칙을 최우선으로 합니다:

1. ⭐⭐⭐ **안정성 (Stability)**: 기존 기능이 절대 깨지지 않아야 함
2. ⚡ **속도 (Speed)**: 빠르게 작업 수행
3. 🎯 **정확성 (Accuracy)**: 왜곡되지 않는 작업, 의도대로 정확한 작업
4. 🔧 **최소한의 작업 (Minimal Work)**: 불필요한 작업 최소화

**참고**: `mockdowns/WORK/core-principles.md` - 핵심 원칙 상세 가이드

---

## 📁 Agent 구조

### Phase별 Agent

각 Phase는 하나의 Agent로 구성됩니다:

- `agent-phase-1.md` - Phase 1: 기초 작업
- `agent-phase-2.md` - Phase 2: 상태 관리
- `agent-phase-3.md` - Phase 3: Feature 분리
- `agent-phase-4.md` - Phase 4: Widget 생성
- `agent-phase-5.md` - Phase 5: Shared 정리
- `agent-phase-6.md` - Phase 6: Page 리팩토링
- `agent-phase-7.md` - Phase 7: 최종 정리

### 유틸리티 Agent

- `agent-start.md` - 작업 시작 전 준비
- `agent-verify.md` - 검증 전용 Agent

---

## 🚀 사용 방법

### 1. 작업 시작 전

```bash
# Agent 시작 프롬프트 실행
# Cursor Auto에서 @agents/agent-start.md 사용
```

### 2. Phase별 작업

```bash
# Phase 1 작업
# Cursor Auto에서 @agents/agent-phase-1.md 사용

# Phase 2 작업
# Cursor Auto에서 @agents/agent-phase-2.md 사용

# ... (순차적으로 진행)
```

### 3. 검증

```bash
# 각 Phase 완료 후 검증
# Cursor Auto에서 @agents/agent-verify.md 사용
```

---

## ✅ Agent 실행 체크리스트

각 Agent 실행 전:

- [ ] `mockdowns/WORK/current-step.md` 확인
- [ ] `mockdowns/WORK/next-step.md` 확인
- [ ] `mockdowns/WORK/core-principles.md` 읽기 (필수!)
- [ ] Git 상태 확인

각 Agent 실행 후:

- [ ] 작업 완료 확인
- [ ] 타입 체크 (`tsc --noEmit`)
- [ ] `mockdowns/WORK/current-step.md` 업데이트
- [ ] `mockdowns/WORK/next-step.md` 업데이트
- [ ] 해당 `mockdowns/WORK/phase-{N}.md` 업데이트
- [ ] `mockdowns/WORK/progress.md` 업데이트
- [ ] Git 커밋 (선택적)

---

## 📚 참고 문서

- **핵심 원칙**: `mockdowns/WORK/core-principles.md`
- **전체 워크플로우**: `mockdowns/PLANS/workflow.md`
- **규칙 및 가이드**: `mockdowns/RULES/`
- **작업 상태**: `mockdowns/WORK/`

---

**이 Agent들을 순차적으로 실행하면 전체 리팩토링 작업을 완료할 수 있습니다! 🚀**

