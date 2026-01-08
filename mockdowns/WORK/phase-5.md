# Phase 5: Shared 정리

## 📋 Phase 정보

**Phase**: Phase 5 (Shared 정리)
**상태**: 완료 ✅
**시작일**: 2025-01-XX
**완료일**: 2025-01-XX

---

## 🎯 작업 목표

Shared 레이어의 컴포넌트와 로직 정리

**핵심 원칙 준수:**
- ⭐⭐⭐ **안정성**: 기존 기능 보존, 파일 이동만 수행
- ⚡ **속도**: 타입 체크만 사용 (`tsc --noEmit`)
- 🎯 **정확성**: 올바른 폴더 구조 유지, 타입 안정성 확보
- 🔧 **최소한의 작업**: 필요한 파일 이동만 수행

---

## 📋 작업 목록

### Step 5.1: Shared UI 컴포넌트 이동 ✅

- [x] `src/components/index.tsx` → `src/shared/ui/index.tsx` 이동 ✅
  - 모든 UI 컴포넌트 (Button, Input, Card, Dialog, Table 등) 이동
  - 타입 안정성 개선 (forwardRef 타입 명시)
- [x] `src/pages/PostsManagerPage.tsx` import 경로 업데이트 ✅
  - `../components` → `../shared/ui`
- [x] `src/App.tsx` import 경로 업데이트 ✅
  - Header/Footer를 widgets에서 import하도록 수정

### Step 5.2: 타입 안정성 개선 ✅

- [x] `Input` 컴포넌트 타입 명시 ✅
  - `forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>`
- [x] `Textarea` 컴포넌트 타입 명시 ✅
  - `forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>`
- [x] `Card` 컴포넌트 타입 명시 ✅
  - `forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>`
- [x] `Select` 컴포넌트 타입 명시 ✅
  - `forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, ...>`
- [x] `Dialog` 컴포넌트 타입 명시 ✅
  - `forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ...>`
- [x] `Table` 컴포넌트 타입 명시 ✅
  - 각 Table 컴포넌트에 적절한 타입 명시

---

## ✅ 검증 결과

### 타입 체크

- [x] `tsc --noEmit` 실행 ✅
- [x] 오류 없음 확인 ✅

### Import 경로 확인

- [x] 모든 파일에서 `shared/ui` import 확인 ✅
- [x] `App.tsx`에서 widgets import 확인 ✅

---

## 📝 작업 노트

### 완료된 작업

- ✅ `src/components/index.tsx` → `src/shared/ui/index.tsx` 이동
- ✅ 모든 import 경로 업데이트
- ✅ 타입 안정성 개선

### 문제점 및 해결 방법

- **문제**: 기존 `Input`, `Textarea` 등 컴포넌트에 타입이 명시되지 않음
  - **해결**: 모든 `forwardRef` 컴포넌트에 적절한 타입 명시

---

## 🔗 참고 문서

- `mockdowns/PLANS/fsd-migration-plan.md` - FSD 마이그레이션 계획
- `mockdowns/RULES/index-export-rules.md` - Export 규칙

---

## 🚀 다음 Step

**다음 Phase**: Phase 6 (Pages 리팩토링)

**작업 내용:**
- PostsManagerPage 리팩토링
- Widgets와 Features 조합

---

**마지막 업데이트**: Phase 5 완료
