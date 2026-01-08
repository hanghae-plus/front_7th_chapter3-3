# Cursor Auto Agent 빠른 시작 가이드

## 🚀 3단계로 시작하기

### 1단계: 작업 시작 준비 (2-3분)

**Agent 실행**: `@agents/agent-start.md`

- 핵심 원칙 읽기
- 현재 상태 확인
- Git 상태 확인

---

### 2단계: Phase별 작업 (순차 실행)

**Phase 1**: `@agents/agent-phase-1.md` (30-60분)

- TypeScript 타입 정의
- Entities API 기본 구조 생성

**검증**: `@agents/agent-verify.md`

**Phase 2**: `@agents/agent-phase-2.md` (60-90분)

- Zustand Store 생성
- 상태 분리

**검증**: `@agents/agent-verify.md`

**Phase 3**: `@agents/agent-phase-3.md` (90-120분)

- Features 분리

**검증**: `@agents/agent-verify.md`

**Phase 4**: `@agents/agent-phase-4.md` (60-90분)

- Widgets 생성

**검증**: `@agents/agent-verify.md`

**Phase 5**: `@agents/agent-phase-5.md` (60-90분)

- Shared 정리
- ⚠️ 파일 이동 포함 (주의!)

**검증**: `@agents/agent-verify.md`

**Phase 6**: `@agents/agent-phase-6.md` (120-180분)

- Pages 리팩토링
- ⚠️ 기존 코드 변경 (매우 주의!)

**검증**: `@agents/agent-verify.md`

**Phase 7**: `@agents/agent-phase-7.md` (60-90분)

- 최종 정리 및 검증

---

### 3단계: 완료!

모든 Phase가 완료되면 리팩토링 작업이 완료됩니다.

---

## ⚠️ 중요 주의사항

1. **순차 실행**: Phase는 순서대로 실행해야 함
2. **검증 필수**: 각 Phase 완료 후 검증 Agent 실행
3. **기능 보존**: 기존 기능이 절대 깨지면 안 됨
4. **pnpm 작업**: 사용자가 실행 (Agent는 요청만)

---

**이제 `@agents/agent-start.md`를 실행하여 시작하세요! 🚀**
