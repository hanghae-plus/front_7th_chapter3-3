# 성능 최적화 가이드 (Performance Optimization Guide)

## 📋 개요

Agent 작업 시 성능을 최적화하는 방법입니다.

---

## ⚡ 검증 우선순위

### 빠른 검증 (우선 사용)

1. **타입 체크**: `tsc --noEmit` (가장 빠름)
2. **Lint 체크**: `pnpm run lint` (중간 속도)
3. **빌드**: `pnpm run build` (느림, 최소한으로)

---

## 🚀 최적화 팁

### 1. 타입 체크만 사용

- 타입 정의 작업: `tsc --noEmit`만 사용
- 빌드는 Phase 완료 시에만 실행

### 2. pnpm 명령어 최소화

- `package.json` 변경 없으면 `pnpm install` 불필요
- 타입 체크는 Agent가 직접 실행 (`tsc --noEmit`)

### 3. 불필요한 파일 생성 방지

- 필요한 파일만 생성
- 중복 파일 생성 방지

---

**빠르고 효율적으로 작업하세요! ⚡**

