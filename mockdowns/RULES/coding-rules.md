# 코딩 규칙 (Coding Rules)

## 📋 개요

이 문서는 FSD 아키텍처 리팩토링 시 준수해야 할 코딩 규칙입니다.

---

## 🎯 TypeScript 규칙

### 1. 타입 안정성

- **any 타입 사용 금지**
- 모든 변수, 함수 파라미터, 반환값에 명시적 타입 지정
- 옵셔널 체이닝 적절히 사용

### 2. 타입 정의 위치

- 엔티티 타입: `entities/{entity}/model/types.ts`
- API 응답 타입: `entities/{entity}/model/types.ts`
- DTO 타입: `entities/{entity}/model/types.ts`
- 컴포넌트 Props: 컴포넌트 파일 내부 또는 `shared/ui/` 타입 파일

---

## 🏗️ FSD 구조 규칙

### 1. 레이어별 역할

- **entities**: 비즈니스 엔티티 (타입, API, UI)
- **features**: 사용자 기능 (이벤트 처리, UI)
- **widgets**: 재사용 가능한 UI 블록
- **shared**: 공통 컴포넌트 및 로직
- **pages**: 페이지 컴포넌트
- **app**: 앱 설정

### 2. 의존성 방향

- 상위 레이어 → 하위 레이어만 허용
- 같은 레이어 내 import 가능
- 하위 레이어 → 상위 레이어 import 금지

---

## 📦 Zustand 사용 규칙

### 1. Store 위치

- 엔티티 Store: `entities/{entity}/model/store.ts`
- 전역 UI Store: `shared/lib/stores/ui-store.ts`

### 2. Store 구조

```typescript
interface StoreState {
  // 상태
  items: Item[]
  loading: boolean
  
  // 액션
  fetchItems: () => Promise<void>
  addItem: (item: Item) => void
}
```

---

## 🎨 컴포넌트 규칙

### 1. 컴포넌트 Props

- 명시적 Props 타입 정의
- forwardRef 사용 시 제네릭 타입 지정

### 2. 컴포넌트 위치

- 공통 컴포넌트: `shared/ui/`
- 엔티티 UI: `entities/{entity}/ui/`
- Feature UI: `features/{feature}/ui/`
- Widget: `widgets/{widget}/ui/`

---

## 📡 API 호출 규칙

### 1. API 위치

- Entities API: `entities/{entity}/api/`
- Features API: `features/{feature}/api/`

### 2. API 함수 네이밍

- `fetch{Entity}`: 목록 조회
- `fetch{Entity}ById`: 단일 조회
- `add{Entity}`: 추가
- `update{Entity}`: 수정
- `delete{Entity}`: 삭제

---

## 📝 파일 네이밍 규칙

- 컴포넌트: `kebab-case.tsx`
- 타입: `types.ts`
- API: `{entity}-api.ts`
- Store: `store.ts`
- Hook: `use-{name}.ts`

---

**이 규칙들을 준수하여 일관된 코드를 작성하세요! 🚀**

