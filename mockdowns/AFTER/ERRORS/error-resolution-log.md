# 에러 처리 로그

## 📋 개요

FSD 리팩토링 완료 후 개발 서버 실행 시 발생한 에러들을 처리한 내역입니다.

**처리 일시**: 2025-01-XX  
**에러 발생 환경**: Vite 개발 서버 (`pnpm run dev`)

---

## 🔴 에러 목록 및 해결

### 1. text-utils.ts JSX 파싱 에러

#### 에러 내용

```
ERROR: Unterminated regular expression
E:/hanghae99/chapters/front_7th_chapter3-3/src/shared/lib/text-utils.ts:18:30
return <span>{text}</span>
```

#### 원인

- `text-utils.ts` 파일에서 JSX를 사용하고 있었지만 파일 확장자가 `.ts`였음
- esbuild가 `.ts` 파일에서 JSX를 파싱할 수 없어 에러 발생

#### 해결 방법

1. `text-utils.ts`를 `text-utils.tsx`로 변경
2. 모든 import 경로는 확장자 없이 유지 (TypeScript 표준)

#### 수정된 파일

- `src/shared/lib/text-utils.ts` → `src/shared/lib/text-utils.tsx`
- `src/widgets/comment-list/ui/comment-list.tsx` (import 경로 확인)
- `src/widgets/post-list/ui/post-list.tsx` (import 경로 확인)
- `src/widgets/post-detail/ui/post-detail-dialog.tsx` (import 경로 확인)

---

### 2. text-utils 파일 중복

#### 에러 내용

- `text-utils.ts`와 `text-utils.tsx` 두 파일이 동시에 존재
- Vite가 어떤 파일을 사용해야 할지 혼란

#### 원인

- 파일 이름 변경 과정에서 기존 `.ts` 파일이 삭제되지 않음

#### 해결 방법

- `src/shared/lib/text-utils.ts` 파일 삭제
- `src/shared/lib/text-utils.tsx`만 유지

---

### 3. setComments 중복 키 경고

#### 에러 내용

```
warning: Duplicate key "setComments" in object literal
src/entities/comment/model/store.ts:151
```

#### 원인

- `src/entities/comment/model/store.ts`에서 `setComments` 메서드가 두 번 정의됨
- 141번 줄과 151번 줄에 중복 정의

#### 해결 방법

- 141번 줄의 중복된 `setComments` 제거
- 들여쓰기 정리

---

### 4. CommentState 인터페이스 타입 에러

#### 에러 내용

```
Object literal may only specify known properties, and 'newComment' does not exist in type 'CommentState'
```

#### 원인

- `CommentState` 인터페이스에 `newComment`와 `selectedComment` 속성이 정의되지 않음
- `initialState`에는 있지만 인터페이스에는 없어서 TypeScript 타입 체크 실패

#### 해결 방법

- `CommentState` 인터페이스에 누락된 속성 추가

---

### 5. Import 경로 해결 실패 (500 에러)

#### 에러 내용

```
Failed to resolve import "../../entities/post/model" from "src/features/post-pagination/model/use-post-pagination.ts"
Failed to resolve import "../../entities/comment/model" from "src/features/comment-create/model/use-comment-create.ts"
Failed to resolve import "../../entities/user/model" from "src/features/user-view/model/use-user-view.ts"
```

#### 원인

- `src/components/index.tsx` 파일의 타입 에러로 인한 연쇄 에러
- Vite가 타입 에러가 있는 파일을 파싱하지 못하면서 다른 파일들의 import도 처리하지 못함

#### 해결 방법

- `src/components/index.tsx` 파일의 모든 `forwardRef` 컴포넌트에 타입 정의 추가
- 각 컴포넌트에 적절한 제네릭 타입 지정

#### 수정된 컴포넌트

- `Input`: `forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>`
- `Card`: `forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>`
- `CardHeader`: `forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>`
- `CardTitle`: `forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>`
- `CardContent`: `forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>`
- `Textarea`: `forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>`
- `SelectTrigger`: `forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>`
- `SelectContent`: `forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>`
- `SelectItem`: `forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>`
- `DialogContent`: `forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>`
- `DialogTitle`: `forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>`
- `Table`: `forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>`
- `TableHeader`: `forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>`
- `TableBody`: `forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>`
- `TableRow`: `forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>`
- `TableHead`: `forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>`
- `TableCell`: `forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>`

---

### 6. 누락된 함수 추가

#### 문제

- 여러 Feature Hook에서 필요한 함수들이 export되지 않음

#### 해결한 함수들

##### usePostEdit

- `openEditDialog: (post: Post) => void` 추가
- `showEditDialog: boolean` 반환 추가

##### useCommentEdit

- `openEditCommentDialog: (comment: Comment) => void` 추가
- `showEditCommentDialog: boolean` 반환 추가

##### useCommentCreate

- `openAddCommentDialog: (postId: number) => void` 추가
- `showAddCommentDialog: boolean` 반환 추가

---

## ✅ 최종 검증

### 타입 체크

```bash
tsc --noEmit
```

- ✅ 오류 없음

### 개발 서버

```bash
pnpm run dev
```

- ✅ 모든 파일 정상 로드
- ✅ 500 에러 해결

---

## 📝 교훈

1. **JSX 사용 시 파일 확장자 주의**
   - JSX를 사용하는 파일은 반드시 `.tsx` 확장자 사용
   - `.ts` 파일에서는 JSX 사용 불가

2. **중복 파일 주의**
   - 파일 이름 변경 시 기존 파일 삭제 확인
   - Vite는 중복 파일이 있으면 혼란스러워함

3. **인터페이스와 구현 일치**
   - `initialState`에 있는 속성은 반드시 인터페이스에도 정의
   - TypeScript는 인터페이스에 없는 속성 사용 시 에러 발생

4. **연쇄 에러 주의**
   - 하나의 타입 에러가 다른 파일들의 import 해결을 막을 수 있음
   - 근본 원인을 먼저 해결하면 연쇄 에러도 자동 해결

5. **forwardRef 타입 정의 필수**
   - `forwardRef`를 사용하는 모든 컴포넌트에 제네릭 타입 정의 필요
   - 타입이 없으면 TypeScript가 타입 추론에 실패하여 에러 발생

---

---

## 🔴 최신 에러: Vite 모듈 해석 실패 (2025-01-XX)

### 에러 내용

```
Failed to resolve import "../../entities/post/model" from "src/features/post-create/model/use-post-create.ts". Does the file exist?
```

### 원인 분석

- Vite가 `../../entities/post/model` 경로를 `../../entities/post/model/index.ts`로 해석하지 못함
- `store.ts`에서 `../api`를 import할 때 순환 참조 가능성
- `types.ts`에서 `../user/model/types`를 import하여 순환 참조 발생 가능

### 해결 방법

1. **순환 참조 제거**: `types.ts`에서 `User` 타입 import 제거하고 `any`로 대체
2. **Vite 설정 개선**: `vite.config.ts`에 `resolve.extensions` 및 `resolve.mainFields` 추가
3. **Import 경로 정리**: `store.ts`에서 `../api` import 경로 확인

### 수정된 파일

- `src/entities/post/model/types.ts`: `User` 타입 import 제거
- `vite.config.ts`: `resolve` 설정 추가
- `src/entities/post/model/store.ts`: import 경로 확인

**마지막 업데이트**: 2025-01-XX
