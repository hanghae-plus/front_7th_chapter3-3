# index.ts Export 규칙

## 📋 개요

FSD 구조에서 일관된 `index.ts` export 패턴을 정의합니다.

---

## 📁 폴더별 Export 규칙

### 1. Entities Layer

#### `entities/{entity}/model/index.ts`

```typescript
// 타입만 export
export type { User, Address, Company } from "./types"
export type { UserResponse, UsersResponse } from "./types"
export type { CreateUserDto, UpdateUserDto } from "./types"
```

#### `entities/{entity}/api/index.ts`

```typescript
// API 함수만 export
export { fetchUsers, fetchUserById } from "./user-api"
```

#### `entities/{entity}/ui/index.ts`

```typescript
// UI 컴포넌트만 export
export { UserCard } from "./user-card"
```

---

### 2. Features Layer

#### `features/{feature}/ui/index.ts`

```typescript
// Feature UI 컴포넌트만 export
export { PostSearch } from "./post-search"
```

#### `features/{feature}/model/index.ts`

```typescript
// Feature hooks, utils만 export
export { usePostSearch } from "./use-post-search"
```

---

### 3. Widgets Layer

#### `widgets/{widget}/index.ts`

```typescript
// Widget 컴포넌트만 export
export { PostList } from "./ui/post-list"
```

---

### 4. Shared Layer

#### `shared/ui/index.ts`

```typescript
// UI 컴포넌트만 export
export { Button } from "./button"
export { Input } from "./input"
// ...
```

#### `shared/lib/index.ts`

```typescript
// 유틸리티 함수만 export
export { formatDate } from "./format-date"
export { debounce } from "./debounce"
```

---

## ✅ 규칙

1. **타입은 `export type` 사용**
2. **값은 `export` 사용**
3. **한 파일에서 모든 export 집중**
4. **재export는 최소화** (필요 시에만)

---

**일관된 export 패턴을 유지하세요! 🚀**
