# mockdowns 폴더 구조

## 📋 개요

이 폴더는 FSD 아키텍처 리팩토링 작업을 위한 모든 문서를 포함합니다.
**작업에 필요한 문서와 불필요한 문서를 명확히 분리했습니다.**

---

## 📁 폴더 구조

```
mockdowns/
├── WORK/              # ⭐ 작업 필수 문서 (Agent가 매번 읽어야 함)
│   ├── README.md      # 시작 가이드 (먼저 읽기!)
│   ├── current-step.md
│   ├── next-step.md
│   ├── progress.md
│   ├── core-principles.md
│   └── phase-*.md
│
├── RULES/             # 📚 규칙 및 가이드 (필요 시 참고)
│   ├── README.md
│   └── *.md (작업 규칙 및 가이드)
│
├── PLANS/             # 📋 작업 계획 (필요 시 참고)
│   ├── README.md
│   ├── workflow.md
│   └── *-plan.md
│
├── ARCHIVE/           # 🗄️ 작업 불필요 문서 (검증/평가용)
│   ├── README.md
│   └── *.md (검증/평가 문서들)
│
├── STRUCTURE.md       # 폴더 구조 상세 설명
└── README.md          # 이 파일
```

---

## 🚀 빠른 시작

### Cursor Auto Agent 사용 (권장)

**Cursor Auto에서 작업할 때는 `@agents/` 폴더의 Agent를 사용하세요!**

1. **작업 시작**: `@agents/agent-start.md` 실행
2. **Phase별 작업**: `@agents/agent-phase-{N}.md` 실행 (1-7)
3. **검증**: `@agents/agent-verify.md` 실행 (각 Phase 완료 후)

**참고**: `agents/README.md` - Agent 사용 가이드

---

### 수동 작업 시

1. **`WORK/README.md`** 읽기 (3분)
2. **`WORK/current-step.md`** 확인
3. **`WORK/next-step.md`** 확인
4. **`WORK/core-principles.md`** 읽기 (필수!)

**이 4개 파일만 읽으면 작업을 시작할 수 있습니다!**

---

## 📚 폴더별 설명

### WORK/ - 작업 필수 문서

Agent가 작업을 수행할 때 **반드시 필요한 문서들**입니다.

- 현재 Step 정보
- 다음 Step 정보
- 전체 진행 상태
- 핵심 원칙
- Phase별 진행 상태

**위치**: `mockdowns/WORK/`

---

### RULES/ - 규칙 및 가이드

작업 중 **필요할 때 참고**하는 규칙과 가이드 문서들입니다.

- 코딩 규칙
- 리팩토링 안전 가이드
- pnpm 작업 협업 방법
- API 응답 구조
- 등등...

**위치**: `mockdowns/RULES/`

---

### PLANS/ - 작업 계획

전체 작업 계획과 상세 마이그레이션 계획 문서들입니다.

- 전체 워크플로우
- 타입 정의 계획
- 상태 관리 계획
- API 분리 계획
- 등등...

**위치**: `mockdowns/PLANS/`

---

### ARCHIVE/ - 작업 불필요 문서

작업에 직접 필요하지 않은 검증/평가 문서들입니다.

- 검증 보고서
- 평가 보고서
- 중복/참고 문서

**작업 시 이 폴더는 무시해도 됩니다.**

**위치**: `mockdowns/ARCHIVE/`

---

## ✅ 정리 완료

- ✅ 작업 필수 문서 → `WORK/` 폴더
- ✅ 규칙 및 가이드 → `RULES/` 폴더
- ✅ 작업 계획 → `PLANS/` 폴더
- ✅ 작업 불필요 문서 → `ARCHIVE/` 폴더
- ✅ 중복 파일 제거
- ✅ 경로 업데이트 완료

---

**이제 `WORK/README.md`만 읽으면 작업을 시작할 수 있습니다! 🚀**
