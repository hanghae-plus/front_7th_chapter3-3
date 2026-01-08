# mockdowns 폴더 구조

## 📋 개요

작업에 필요한 문서와 불필요한 문서를 명확히 분리했습니다.

---

## 📁 폴더 구조

```
mockdowns/
├── WORK/              # ⭐ 작업 필수 문서 (Agent가 매번 읽어야 함)
│   ├── README.md      # 시작 가이드
│   ├── current-step.md
│   ├── next-step.md
│   ├── progress.md
│   ├── core-principles.md
│   └── phase-*.md
│
├── RULES/             # 📚 규칙 및 가이드 (필요 시 참고)
│   ├── README.md
│   ├── core-principles.md
│   ├── refactoring-safety-guide.md
│   ├── pnpm-workflow-guide.md
│   ├── api-response-structure.md
│   ├── index-export-rules.md
│   ├── coding-rules.md
│   ├── file-migration-guide.md
│   ├── rollback-guide.md
│   ├── performance-optimization-guide.md
│   └── agent-guidelines.md
│
├── PLANS/             # 📋 작업 계획 문서 (필요 시 참고)
│   ├── README.md
│   ├── workflow.md
│   ├── typescript-types-migration-plan.md
│   ├── state-management-plan.md
│   ├── feature-api-separation-plan.md
│   ├── widget-data-reusability-plan.md
│   └── fsd-migration-plan.md
│
└── ARCHIVE/           # 🗄️ 작업 불필요 문서 (검증/평가용)
    ├── README.md
    ├── validation-report.md
    ├── core-principles-evaluation.md
    ├── agent-validation-report.md
    ├── agent-start-prompt.md
    └── ...
```

---

## 🎯 사용 방법

### 작업 시작 시

1. **`WORK/README.md`** 읽기 (3분)
2. **`WORK/current-step.md`** 확인
3. **`WORK/next-step.md`** 확인
4. **`WORK/core-principles.md`** 읽기 (필수!)

### 작업 중

- 필요 시 `RULES/` 폴더의 가이드 참고
- 필요 시 `PLANS/` 폴더의 계획 문서 참고

### 작업 불필요

- `ARCHIVE/` 폴더는 무시해도 됨

---

**이 구조로 작업이 더 명확하고 빠르게 진행됩니다! 🚀**

