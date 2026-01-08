# Import 경로 규칙

## 📚 학습 목표

이 문서를 읽고 나면 다음을 이해할 수 있습니다:
- FSD에서 올바른 import 방법
- index.ts를 통한 import 패턴
- Import 경로 에러를 방지하는 방법
- 에러 발생 시 해결 방법

---

## 🚨 중요: 반드시 준수해야 할 규칙

FSD 프로젝트에서 **가장 자주 발생하는 에러**는 Import 경로 문제입니다.

이 규칙을 무시하면 다음 에러가 발생합니다:
```
Failed to resolve import "../../entities/post/model" from "src/features/post-create/model/use-post-create.ts". Does the file exist?
```

---

## ✅ 올바른 Import 패턴

### 1. index.ts를 통한 Import (필수)

FSD 구조에서는 각 레이어의 `index.ts` 파일을 통해 export합니다.

**✅ 올바른 방법**:
```typescript
// entities/{entity}/model/index.ts를 통한 import
import { usePostStore } from "../../../entities/post/model"
import type { Post, PostResponse } from "../../../entities/post/model"

// entities/{entity}/api/index.ts를 통한 import
import { fetchPosts, addPost } from "../../../entities/post/api"
```

**❌ 잘못된 방법**:
```typescript
// ❌ 확장자 사용
import { usePostStore } from "../../../entities/post/model/index.ts"

// ❌ index.ts를 우회한 직접 파일 import
import { usePostStore } from "../../../entities/post/model/store"

// ❌ 절대 경로 alias 사용 (설정하지 않았음)
import { usePostStore } from "@/entities/post/model"
```

---

## 📁 레이어별 Import 예시

### 1. Features에서 Entities Import

```typescript
// features/post-create/model/use-post-create.ts
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"
import { fetchUsers } from "../../../entities/user/api"
```

### 2. Widgets에서 Entities/Features Import

```typescript
// widgets/post-list/ui/post-list.tsx
import { usePostStore } from "../../../entities/post/model"
import { usePostEdit } from "../../../features/post-edit/model"
import { PostFilter } from "../../../features/post-filter/ui"
```

### 3. Pages에서 모든 레이어 Import

```typescript
// pages/PostsManagerPage.tsx
import { usePostStore } from "../entities/post/model"
import { PostList } from "../widgets/post-list/ui"
import { PostSearch } from "../features/post-search/ui"
import { Button } from "../shared/ui"
```

---

## 🔍 index.ts 파일 구조

### Entities Model index.ts

**위치**: `src/entities/{entity}/model/index.ts`

```typescript
/**
 * {Entity} 엔티티 타입 Export
 */

// 기본 타입
export type { Post, Reactions } from "./types"

// API 응답 타입
export type { PostResponse, PostsResponse } from "./types"

// DTO 타입
export type { CreatePostDto, UpdatePostDto } from "./types"

// Store
export { usePostStore } from "./store"
export type { PostState } from "./store"
```

### Entities API index.ts

**위치**: `src/entities/{entity}/api/index.ts`

```typescript
/**
 * {Entity} 엔티티 API Export
 */

export { fetchPosts, fetchPostById, addPost, updatePost, deletePost } from "./post-api"
```

---

## 🚫 절대 하지 말아야 할 것

### 1. 확장자 사용 금지

```typescript
// ❌ 절대 사용하지 않음
import { usePostStore } from "../../../entities/post/model/index.ts"
import { Post } from "./types.ts"
import { Button } from "../shared/ui/button.tsx"
```

**이유**: TypeScript/Vite에서는 확장자를 생략해야 자동으로 해석됩니다.

---

### 2. index.ts 우회 금지

```typescript
// ❌ index.ts를 우회한 직접 import 금지
import { usePostStore } from "../../../entities/post/model/store"
import { Post } from "../../../entities/post/model/types"
```

**대신**:
```typescript
// ✅ index.ts를 통한 import 사용
import { usePostStore, type Post } from "../../../entities/post/model"
```

**이유**: index.ts를 통해 export를 관리하면 나중에 파일 구조를 변경해도 import 경로를 변경할 필요가 없습니다.

---

### 3. 절대 경로 alias 사용 금지

```typescript
// ❌ 절대 경로 alias 사용 (설정하지 않았음)
import { usePostStore } from "@/entities/post/model"
```

**대신**:
```typescript
// ✅ 상대 경로 사용
import { usePostStore } from "../../../entities/post/model"
```

**이유**: 이 프로젝트는 상대 경로를 사용하는 것을 표준으로 합니다.

---

## 🔧 에러 발생 시 체크리스트

### Import 경로 에러가 발생했을 때

다음 에러가 발생하면:
```
Failed to resolve import "../../entities/post/model" from "src/features/...". Does the file exist?
```

#### 1단계: index.ts 파일 확인 (10초)

- [ ] `src/entities/{entity}/model/index.ts` 파일이 존재하는가?
- [ ] `index.ts` 파일이 올바르게 export하고 있는가?
- [ ] export 문에 오타가 없는가?

**확인 방법**:
```typescript
// entities/post/model/index.ts 파일 확인
export { usePostStore } from "./store"  // ✅ 올바름
export { usePostStore } from "./Store"  // ❌ 대소문자 오류
```

---

#### 2단계: Import 경로 확인 (10초)

- [ ] 확장자(`.ts`, `.tsx`)를 사용하지 않았는가?
- [ ] 상대 경로가 올바른가? (`../../../` 계산 확인)
- [ ] `index.ts`를 거치도록 import했는가? (직접 파일 import 아님)

**확인 방법**:
```typescript
// features/post-create/model/use-post-create.ts
// 현재 위치: src/features/post-create/model/
// 목표 위치: src/entities/post/model/

// 경로 계산:
// ../ → src/features/post-create/
// ../../ → src/features/
// ../../../ → src/
// ../../../entities/ → src/entities/
// ../../../entities/post/ → src/entities/post/
// ../../../entities/post/model/ → ✅ 목표 위치

import { usePostStore } from "../../../entities/post/model"  // ✅ 올바름
```

---

#### 3단계: Vite 설정 확인 (5초)

- [ ] `vite.config.ts`에 `tsconfigPaths()` 플러그인이 있는가?
- [ ] 플러그인이 `plugins` 배열에 포함되어 있는가?

**확인 방법**:
```typescript
// vite.config.ts
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),  // ✅ 필수!
  ],
  // ...
})
```

---

#### 4단계: 개발 서버 확인 (5초)

- [ ] 개발 서버를 재시작했는가?
- [ ] 필요 시 `.vite` 캐시 디렉토리를 삭제했는가?

**해결 방법**:
```bash
# 개발 서버 재시작
pnpm run dev

# 캐시 삭제 후 재시작 (필요 시)
rm -rf node_modules/.vite
pnpm run dev
```

---

## 🎯 실전 예시

### 시나리오 1: Post Store 사용

**파일 위치**: `src/features/post-create/model/use-post-create.ts`

```typescript
// ✅ 올바른 방법
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"

export function usePostCreate() {
  const { addPost } = usePostStore()
  // ...
}
```

**경로 계산**:
- 현재: `src/features/post-create/model/`
- 목표: `src/entities/post/model/`
- 상대 경로: `../../../entities/post/model`

---

### 시나리오 2: Feature UI 사용

**파일 위치**: `src/widgets/post-list/ui/post-list.tsx`

```typescript
// ✅ 올바른 방법
import { PostSearch } from "../../../features/post-search/ui"
import { PostFilter } from "../../../features/post-filter/ui"
```

**경로 계산**:
- 현재: `src/widgets/post-list/ui/`
- 목표: `src/features/post-search/ui/`
- 상대 경로: `../../../features/post-search/ui`

---

### 시나리오 3: Shared UI 사용

**파일 위치**: `src/features/post-create/ui/post-create-dialog.tsx`

```typescript
// ✅ 올바른 방법
import { Button, Input, Textarea } from "../../../shared/ui"
import { Dialog, DialogContent } from "../../../shared/ui"
```

**경로 계산**:
- 현재: `src/features/post-create/ui/`
- 목표: `src/shared/ui/`
- 상대 경로: `../../../shared/ui`

---

## 📖 상대 경로 계산 팁

### 레이어 간 상대 경로 가이드

```
src/
├── pages/              (1단계)
│   └── PostsManagerPage.tsx
├── widgets/            (2단계)
│   └── post-list/
│       └── ui/
│           └── post-list.tsx
├── features/           (3단계)
│   └── post-create/
│       └── model/
│           └── use-post-create.ts
├── entities/           (4단계)
│   └── post/
│       └── model/
│           └── store.ts
└── shared/             (5단계)
    └── ui/
        └── index.tsx
```

### 상대 경로 계산 규칙

- **같은 레이어**: `../`
- **한 단계 위**: `../../`
- **두 단계 위**: `../../../`
- **세 단계 위**: `../../../../`

---

## ✅ 검증 방법

### TypeScript 컴파일 확인

```bash
tsc --noEmit
```

**기대 결과**: 타입 에러 없음

---

### 개발 서버 실행 확인

```bash
pnpm run dev
```

**기대 결과**:
- ✅ 모든 import 경로 정상 해결
- ✅ 500 에러 없음
- ✅ "Failed to resolve import" 에러 없음

---

## 💡 요약

### 핵심 원칙

1. **`index.ts`를 통한 import 사용** - 직접 파일 import 금지
2. **확장자 없이 import** - `.ts`, `.tsx` 사용 금지
3. **상대 경로 사용** - 절대 경로 alias 사용 금지
4. **Vite 설정 확인** - `tsconfigPaths()` 플러그인 필수

### 에러 발생 시

1. index.ts 파일 확인
2. Import 경로 확인
3. Vite 설정 확인
4. 개발 서버 재시작

---

## 🔗 관련 문서

- **FSD 아키텍처 개요**: 전체적인 구조 이해
- **FSD 레이어별 분리 기준**: 각 레이어에 무엇을 넣어야 하는지
- **Zustand 상태 관리 가이드**: Store import 방법
- **실제 코드 예시**: 실제 프로젝트 적용 사례

---

**Import 경로가 복잡해지면 항상 "목표 파일까지 몇 단계를 올라가야 하는가?"를 계산해보세요! 🚀**

