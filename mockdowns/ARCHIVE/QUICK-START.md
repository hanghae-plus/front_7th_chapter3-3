# 빠른 시작 가이드 (Quick Start Guide)

## 🚀 Agent 작업 시작 전 필수 확인 (3분)

### Step 1: 상태 확인 (1분)

```bash
# 필수 파일 읽기
cat mockdowns/steps/current-step.md    # 현재 Step 확인
cat mockdowns/steps/next-step.md       # 다음 작업 확인
cat mockdowns/steps/progress.md        # 전체 진행 상태
```

### Step 2: 핵심 원칙 확인 (1분)

```bash
# 핵심 원칙 읽기 (필수!)
cat mockdowns/Rules/core-principles.md
```

### Step 3: Git 상태 확인 (30초)

```bash
# Git 상태 확인
git status
# 변경사항이 있으면 커밋하거나 stash
```

### Step 4: 작업 시작

`next-step.md`의 지침에 따라 작업 시작!

---

## ✅ 작업 완료 후 필수 작업 (2분)

### 1. 타입 체크 (30초)

```bash
tsc --noEmit
# 오류가 없어야 함
```

### 2. 상태 파일 업데이트 (1분)

- `current-step.md` 업데이트 (완료 체크)
- `next-step.md` 업데이트 (다음 Step 명시)
- 해당 Phase 파일 업데이트 (진행률)
- `progress.md` 업데이트 (전체 진행률)

### 3. Git 커밋 (선택적, 30초)

```bash
git add .
git commit -m "feat: Step {N} 완료 - {작업 내용}"
```

---

## 📚 상세 가이드

- **전체 시스템 설명**: `mockdowns/steps/README.md`
- **검증 보고서**: `mockdowns/steps/validation-report.md`
- **핵심 원칙**: `mockdowns/Rules/core-principles.md`

---

**이 가이드만 따르면 빠르게 작업을 시작할 수 있습니다! 🚀**

