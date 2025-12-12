# Task 2: shared 레이어 구성

## 완료일: 2025-12-09

## 목표
- 공통 UI 컴포넌트 분리
- 공통 유틸리티/로직 분리

## 완료한 작업

### 1. shared/ui 구성
- `src/shared/ui/` 폴더 생성
- UI 컴포넌트 분리:
  - `Button.tsx`
  - `Card.tsx`
  - `Dialog.tsx`
  - `Input.tsx`
  - `Select.tsx`
  - `Table.tsx`
  - `Textarea.tsx`
- UI 컴포넌트 타입 수정: `HTMLAttributes` → `InputHTMLAttributes`, `TextareaHTMLAttributes` 등 적절한 타입으로 변경

### 2. shared/lib 구성
- `src/shared/lib/types.ts` - 공통 타입 정의

### 3. shared/api 구성
- `src/shared/api/client.ts` - API 클라이언트 설정
- `src/shared/api/types.ts` - API 응답 타입 정의

### 4. entities 도메인 타입 정의 (Task 3 선행 작업)
- `src/entities/post/model/types.ts` - Post 관련 타입
- `src/entities/user/model/types.ts` - User 관련 타입
- `src/entities/post/index.ts` - public API

### 5. features 구성 (선행 작업)
- `src/features/search/ui/HighlightText.tsx` - 검색 하이라이트 컴포넌트

### 6. 설정 파일 업데이트
- `tsconfig.json`, `vite.config.ts` - alias 설정 추가

## 배운 점

1. **React HTML Attributes 타입 계층**
   - `HTMLAttributes` → 모든 HTML 요소 공통 속성
   - `InputHTMLAttributes` → input 고유 속성 포함 (placeholder, value 등)
   - `TextareaHTMLAttributes` → textarea 고유 속성 포함 (rows, cols 등)

2. **FSD entities 폴더 구조**
   - `model/` - 타입, 순수 함수, 상수
   - `api/` - 서버 통신 함수
   - `ui/` - 순수 표현 컴포넌트
   - `index.ts` - public API

3. **타입 정의 시 interface vs type**
   - 빈 interface는 ESLint 경고 발생
   - 커스텀 props가 없으면 type alias 사용이 깔끔

## 힌트 사용
- Level 1: UI 컴포넌트 타입 힌트 (HTMLAttributes vs InputHTMLAttributes)
- Level 1: entities 폴더 구조 설명

## 빌드 결과
- ✅ `pnpm build` 성공
