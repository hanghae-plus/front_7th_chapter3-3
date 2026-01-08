# Import 경로 빠른 체크리스트 (Quick Check)

## ⚡ Import 관련 작업 시 30초 체크

Import 경로 관련 작업을 할 때마다 이 체크리스트를 확인하세요.

---

## ✅ 작업 전 체크

- [ ] `index.ts` 파일이 존재하는가?
- [ ] `index.ts` 파일이 올바르게 export하고 있는가?
- [ ] 확장자(`.ts`, `.tsx`)를 사용하지 않았는가?

---

## ✅ Import 작성 체크

### 올바른 패턴

```typescript
// ✅ entities/{entity}/model/index.ts를 통한 import
import { usePostStore } from "../../../entities/post/model"
import type { Post } from "../../../entities/post/model"

// ✅ entities/{entity}/api/index.ts를 통한 import
import { fetchPosts } from "../../../entities/post/api"
```

### 잘못된 패턴 (절대 사용 금지)

```typescript
// ❌ 확장자 사용
import { usePostStore } from "../../../entities/post/model/index.ts"

// ❌ index.ts 우회
import { usePostStore } from "../../../entities/post/model/store"
```

---

## ✅ 에러 발생 시 체크

다음 에러가 발생하면:

```
Failed to resolve import "../../entities/post/model" from "..."
```

### 1단계: index.ts 확인 (10초)

- [ ] `src/entities/{entity}/model/index.ts` 파일 존재?
- [ ] 올바르게 export하고 있음?

### 2단계: Import 경로 확인 (10초)

- [ ] 확장자 사용하지 않았는가?
- [ ] `index.ts`를 통한 import인가?

### 3단계: Vite 설정 확인 (5초)

- [ ] `vite.config.ts`에 `tsconfigPaths()` 플러그인 있음?

### 4단계: 서버 재시작 (5초)

- [ ] 개발 서버 재시작했는가?

---

## 🚫 절대 하지 말 것

- ❌ 타입 문제로 오인하여 `any` 사용
- ❌ 순환 참조로 오인하여 타입 구조 변경
- ❌ 불필요한 Vite 설정 추가

**이것들은 문제를 더 복잡하게 만들 뿐입니다!**

---

## 📚 상세 문서

- **상세 규칙**: `mockdowns/RULES/import-path-rules.md`
- **실제 해결 사례**: `mockdowns/AFTER/FIXES/path-resolution-fix.md`

---

**30초 체크로 Import 에러를 방지하세요! 🚀**

