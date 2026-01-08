# Import 경로 규칙 (Import Path Rules)

## 🚨 중요: 반드시 준수해야 할 규칙

이 문서는 **Import 경로 문제를 방지**하기 위한 핵심 규칙입니다.  
이 규칙을 위반하면 Vite 모듈 해석 실패 에러가 발생합니다.

---

## 📋 핵심 원칙

### ✅ 반드시 따라야 할 것

1. **index.ts를 통한 Import 사용**
   - `index.ts` 파일이 있는 폴더는 확장자 없이 폴더명으로 import
   - Vite가 자동으로 `index.ts`를 찾음

2. **확장자 없는 Import**
   - TypeScript/Vite에서는 파일 확장자를 생략
   - `.ts`, `.tsx` 확장자를 절대 사용하지 않음

3. **상대 경로 일관성**
   - 같은 레이어 내: `../` 사용
   - 상위/하위 레이어: 상대 경로 사용
   - 절대 경로 alias는 사용하지 않음

---

## 📁 올바른 Import 패턴

### 1. Entities Layer Import

#### ✅ 올바른 방법

```typescript
// entities/{entity}/model/index.ts를 통한 import
import { usePostStore } from "../../../entities/post/model"
import type { Post, PostResponse } from "../../../entities/post/model"
import { useCommentStore } from "../../../entities/comment/model"
import type { User } from "../../../entities/user/model"

// entities/{entity}/api/index.ts를 통한 import
import { fetchPosts, addPost } from "../../../entities/post/api"
import { fetchUsers } from "../../../entities/user/api"
```

#### ❌ 잘못된 방법

```typescript
// ❌ 확장자 사용
import { usePostStore } from "../../../entities/post/model/index.ts"
import { usePostStore } from "../../../entities/post/model/store.ts"

// ❌ index.ts를 거치지 않고 직접 파일 import
import { usePostStore } from "../../../entities/post/model/store"

// ❌ 절대 경로 alias 사용 (설정하지 않았음)
import { usePostStore } from "@/entities/post/model"
```

---

### 2. Features Layer Import

#### ✅ 올바른 방법

```typescript
// Features에서 Entities import
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"
import { fetchUsers } from "../../../entities/user/api"

// Features에서 Shared import
import { Button, Input } from "../../../shared/ui"
import { useUIStore } from "../../../shared/lib/stores"
```

---

### 3. Widgets Layer Import

#### ✅ 올바른 방법

```typescript
// Widgets에서 Entities import
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"

// Widgets에서 Features import
import { usePostEdit } from "../../../features/post-edit/model"
import { PostFilter } from "../../../features/post-filter/ui"

// Widgets에서 Shared import
import { Table, Button } from "../../../shared/ui"
```

---

### 4. Pages Layer Import

#### ✅ 올바른 방법

```typescript
// Pages에서 모든 레이어 import 가능
import { usePostStore } from "../entities/post/model"
import { PostList } from "../widgets/post-list/ui"
import { PostSearch } from "../features/post-search/ui"
import { Button } from "../shared/ui"
```

---

## 📝 index.ts 파일 구조

### Entities Model index.ts

**위치**: `src/entities/{entity}/model/index.ts`

```typescript
/**
 * {Entity} 엔티티 타입 Export
 * 
 * @see mockdowns/RULES/index-export-rules.md - Export 규칙 참고
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
 * 
 * @see mockdowns/RULES/index-export-rules.md - Export 규칙 참고
 */

export { fetchPosts, fetchPostById, addPost, updatePost, deletePost } from "./post-api"
```

---

## 🔍 에러 발생 시 체크리스트

### Import 경로 에러가 발생했을 때

```
Failed to resolve import "../../entities/post/model" from "src/features/...". Does the file exist?
```

#### 1단계: index.ts 파일 확인

- [ ] `src/entities/{entity}/model/index.ts` 파일이 존재하는가?
- [ ] `index.ts` 파일이 올바르게 export하고 있는가?
- [ ] export 문에 오타가 없는가?

#### 2단계: Import 경로 확인

- [ ] 확장자(`.ts`, `.tsx`)를 사용하지 않았는가?
- [ ] 상대 경로가 올바른가? (`../../../` 계산 확인)
- [ ] `index.ts`를 거치도록 import했는가? (직접 파일 import 아님)

#### 3단계: Vite 설정 확인

- [ ] `vite.config.ts`에 `tsconfigPaths()` 플러그인이 있는가?
- [ ] 플러그인이 `plugins` 배열에 포함되어 있는가?

```typescript
// vite.config.ts
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()], // ✅ 필수
  // ...
})
```

#### 4단계: 개발 서버 확인

- [ ] 개발 서버를 재시작했는가?
- [ ] 필요 시 `.vite` 캐시 디렉토리를 삭제했는가?

```bash
# 개발 서버 재시작
pnpm run dev

# 캐시 삭제 후 재시작 (필요 시)
rm -rf node_modules/.vite
pnpm run dev
```

---

## 🚫 금지 사항

### 1. 확장자 사용 금지

```typescript
// ❌ 절대 사용하지 않음
import { usePostStore } from "../../../entities/post/model/index.ts"
import { Post } from "./types.ts"
import { Button } from "../shared/ui/button.tsx"
```

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

### 3. 순환 참조 주의

```typescript
// ❌ 순환 참조 위험
// entities/post/model/types.ts
import type { User } from "../user/model/types" // 위험!

// ✅ 대안: 필요한 경우에만 타입 정의 분리
```

---

## ✅ 검증 방법

### TypeScript 컴파일 확인

```bash
tsc --noEmit
```

**기대 결과**: 타입 에러 없음

### 개발 서버 실행 확인

```bash
pnpm run dev
```

**기대 결과**: 
- ✅ 모든 import 경로 정상 해결
- ✅ 500 에러 없음
- ✅ "Failed to resolve import" 에러 없음

---

## 📚 관련 문서

- **Export 규칙**: `mockdowns/RULES/index-export-rules.md`
- **코딩 규칙**: `mockdowns/RULES/coding-rules.md`
- **Agent 가이드라인**: `mockdowns/RULES/agent-guidelines.md`
- **실제 해결 사례**: `mockdowns/AFTER/FIXES/path-resolution-fix.md`

---

## 💡 요약

1. **`index.ts`를 통한 import 사용** - 직접 파일 import 금지
2. **확장자 없이 import** - `.ts`, `.tsx` 사용 금지
3. **상대 경로 사용** - 절대 경로 alias 사용 금지
4. **Vite 설정 확인** - `tsconfigPaths()` 플러그인 필수
5. **에러 시 체크리스트 따라하기** - 순서대로 확인

**이 규칙을 따르면 Import 경로 에러를 완전히 방지할 수 있습니다! 🚀**

---

**마지막 업데이트**: 2025-01-XX  
**기반 경험**: `mockdowns/AFTER/FIXES/path-resolution-fix.md`

