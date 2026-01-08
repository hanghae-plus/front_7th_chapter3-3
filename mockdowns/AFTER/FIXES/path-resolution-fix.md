# Import 경로 해결 방법 (실제 해결 내역)

## 📋 개요

**에러 발생 일시**: 2025-01-XX  
**에러 내용**: Vite 모듈 해석 실패 (Import 경로 해결 불가)

```
Failed to resolve import "../../entities/post/model" from "src/features/post-create/model/use-post-create.ts". Does the file exist?
```

---

## ❌ 잘못된 해결 방법 (error-resolution-log.md)

이전 문서에서는 다음과 같은 잘못된 해결 방법을 제시했습니다:

1. ❌ `types.ts`에서 `User` 타입 import 제거하고 `any`로 대체
2. ❌ 순환 참조 제거를 위한 타입 변경
3. ❌ 불필요한 Vite 설정 추가

**문제점**: 실제 원인은 단순한 경로 문제였으며, 타입 변경이나 순환 참조와는 관련이 없었습니다.

---

## ✅ 실제 해결 방법

### 문제 원인

Vite가 `from "../../../entities/post/model"` 형태의 import 경로에서 `index.ts` 파일을 자동으로 찾지 못하는 문제였습니다.

### 해결 방법

#### 1. vite-tsconfig-paths 플러그인 확인 및 설정

`vite.config.ts`에 `vite-tsconfig-paths` 플러그인이 올바르게 설정되어 있는지 확인:

```typescript
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()], // ✅ 이미 설정되어 있음
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  // ...
})
```

#### 2. index.ts 파일 확인

각 엔티티의 `model/index.ts` 파일이 올바르게 export하고 있는지 확인:

**src/entities/post/model/index.ts**
```typescript
export type { Post, Reactions } from "./types"
export type { PostResponse, PostsResponse, TagsResponse } from "./types"
export type { CreatePostDto, UpdatePostDto, FetchPostsParams } from "./types"
export { usePostStore } from "./store"
export type { PostState } from "./store"
```

**src/entities/comment/model/index.ts**
```typescript
export type { Comment } from "./types"
export type { CommentResponse, CommentsResponse } from "./types"
export type { CreateCommentDto, UpdateCommentDto } from "./types"
export { useCommentStore } from "./store"
export type { CommentState } from "./store"
```

**src/entities/user/model/index.ts**
```typescript
export type { User, Address, Company } from "./types"
export type { UserResponse, UsersResponse } from "./types"
export type { CreateUserDto, UpdateUserDto, FetchUsersParams } from "./types"
export { useUserStore } from "./store"
export type { UserState } from "./store"
```

#### 3. Import 경로 확인

모든 import 경로가 `index.ts`를 자동으로 찾을 수 있도록 확장자 없이 사용:

```typescript
// ✅ 올바른 방법
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"
import { useCommentStore } from "../../../entities/comment/model"
import type { User } from "../../../entities/user/model"

// ❌ 잘못된 방법
import { usePostStore } from "../../../entities/post/model/store"
import { usePostStore } from "../../../entities/post/model/index"
```

---

## 🔍 실제 원인 분석

### 왜 Vite가 경로를 찾지 못했나?

1. **개발 서버 캐시 문제**: Vite 개발 서버가 변경사항을 제대로 감지하지 못함
2. **파일 시스템 인식 지연**: 새로 생성된 `index.ts` 파일이 즉시 인식되지 않음
3. **플러그인 로드 순서**: `vite-tsconfig-paths` 플러그인이 올바르게 로드되지 않았을 가능성

### 해결 단계

1. **개발 서버 재시작**
   ```bash
   # 개발 서버 중지 후 재시작
   pnpm run dev
   ```

2. **캐시 삭제 후 재시작** (필요한 경우)
   ```bash
   rm -rf node_modules/.vite
   pnpm run dev
   ```

3. **index.ts 파일 확인**
   - 모든 엔티티의 `model/index.ts` 파일이 존재하는지 확인
   - 올바르게 export하고 있는지 확인

4. **vite.config.ts 확인**
   - `tsconfigPaths()` 플러그인이 `plugins` 배열에 포함되어 있는지 확인

---

## ✅ 검증

### TypeScript 컴파일 확인

```bash
tsc --noEmit
```

**결과**: ✅ 타입 에러 없음

### 개발 서버 실행 확인

```bash
pnpm run dev
```

**결과**: ✅ 모든 import 경로 정상 해결, 500 에러 해결

### Import 경로 테스트

다음과 같은 import들이 모두 정상 작동:

```typescript
// Features에서 Entities import
import { usePostStore } from "../../../entities/post/model"
import { useCommentStore } from "../../../entities/comment/model"
import { useUserStore } from "../../../entities/user/model"

// Widgets에서 Entities import
import { usePostStore } from "../../../entities/post/model"

// Types import
import type { Post } from "../../../entities/post/model"
import type { Comment } from "../../../entities/comment/model"
import type { User } from "../../../entities/user/model"
```

---

## 📝 교훈

1. **경로 문제는 단순하게 해결**
   - 타입 변경이나 구조 변경보다 먼저 기본 설정 확인
   - `vite-tsconfig-paths` 플러그인 설정 확인
   - `index.ts` 파일의 export 확인

2. **개발 서버 캐시 문제 고려**
   - 변경사항이 반영되지 않을 때는 서버 재시작 시도
   - 필요시 `.vite` 캐시 디렉토리 삭제

3. **확장자 없는 import 사용**
   - TypeScript/Vite 프로젝트에서는 확장자 없이 import
   - `index.ts`가 자동으로 해석됨

4. **순환 참조는 실제 문제일 때만**
   - 경로 문제를 순환 참조로 오인하지 않기
   - 실제 타입 에러가 있을 때만 타입 구조 변경 고려

---

## 🔗 관련 파일

- `vite.config.ts`: Vite 설정 및 플러그인
- `src/entities/post/model/index.ts`: Post 엔티티 export
- `src/entities/comment/model/index.ts`: Comment 엔티티 export
- `src/entities/user/model/index.ts`: User 엔티티 export
- `package.json`: `vite-tsconfig-paths` 의존성 확인

---

**처리 완료 일시**: 2025-01-XX  
**실제 해결 시간**: 약 10분 (서버 재시작 및 경로 확인)

