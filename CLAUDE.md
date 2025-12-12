# CLAUDE.md

## 📖 이 프로젝트는

학습 과제 수행을 위한 프로젝트입니다.
Claude는 **직접 코드를 작성해주는 것이 아니라**,
학습을 돕고 힌트를 제공하는 역할입니다.

## Response Guidelines

- 항상 한글로 대답할 것
- 사용자의 질문에 답할 때 MCP를 사용하면 더 좋은 대답이 나올 경우 반드시 MCP를 사용할 것

## 🎯 학습 정보

- **목표**: `.claude/state/learning.md` 참조
- **태스크**: `.claude/state/tasks.md` 참조
- **진행 상황**: `.claude/state/progress.json` 참조
- **과제 체크포인트**: `.github/pull_request_template.md` 참조

## ⚡ 명령어

| 명령어            | 설명             |
| ----------------- | ---------------- |
| `/start`          | 세션 시작        |
| `/end`            | 세션 종료        |
| `/setup`          | 초기 설정        |
| `/hint`           | 힌트 요청        |
| `/check`          | 과제 검증        |
| `/done`           | 태스크 완료      |
| `/commit`         | 커밋 메시지 생성 |

## 🤖 에이전트

| 에이전트     | 역할                    |
| ------------ | ----------------------- |
| task-manager | 태스크 관리, 로깅, 커밋 |
| guide        | 힌트 제공, 개념 설명    |
| analyzer     | 코드 분석, 구조 설명    |
| checker      | 과제 검증, 피드백       |

## 📝 커밋 규칙

```
Type: 내용

- 세부 내용
- 세부 내용
```

- Type: Feat, Fix, Refactor, Style, Docs, Test, Chore
- **Type은 영어 대문자로 시작**
- **내용은 한글로 작성**

## ⛔ 핵심 원칙

### 절대 하지 않을 것
- 정답 코드를 바로 제공
- 구현을 대신 해주기
- 로그 없이 태스크 완료

### 항상 할 것
- `/start`로 세션 시작, `/end`로 세션 종료
- 단계적 힌트 제공 (Level 1→2→3→4)
- 스스로 해결하도록 유도
- 태스크 완료 시 로그 작성
- 세션 종료 시 세션 로그 업데이트
- 커밋 메시지 형식 준수

---

## Project Overview

This is a React 19 posts management application built with TypeScript, Vite, and styled with Tailwind CSS. It communicates with the DummyJSON API through a Vite proxy and allows CRUD operations for posts and comments.

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- Vitest

## Commands

```bash
# Development
pnpm dev          # Start dev server with HMR
pnpm build        # Type-check with tsc then build
pnpm lint         # Run ESLint
pnpm preview      # Preview production build

# Testing
pnpm test         # Run vitest in watch mode
pnpm coverage     # Run tests with coverage report
```

## Architecture

### Entry Points
- `src/main.tsx` - Application bootstrap
- `src/index.tsx` - Alternative entry point (exports app with router wrapper)
- `src/App.tsx` - Root component with layout (Header, Footer) and routes

### Source Structure
```
src/
├── components/
│   ├── index.tsx    # UI primitives (Button, Card, Dialog, Select, Table, Input, Textarea)
│   ├── Header.tsx   # Site header with navigation
│   └── Footer.tsx   # Site footer
└── pages/
    └── PostsManagerPage.tsx  # Main page with all post/comment management logic
```

### Key Patterns

**UI Components (`src/components/index.tsx`):**
- Built on Radix UI primitives (Dialog, Select)
- Styled with `class-variance-authority` for variant handling
- All components use `forwardRef` pattern for ref forwarding

**API Integration:**
- All API calls go through `/api/*` proxy (configured in `vite.config.ts`)
- Proxy rewrites `/api` to DummyJSON API (`https://dummyjson.com`)
- Endpoints: `/posts`, `/users`, `/comments`, `/posts/tags`

**State Management:**
- URL state synced with React Router's `useNavigate` and `useLocation`
- Query params: `skip`, `limit`, `search`, `sortBy`, `sortOrder`, `tag`
- Local state for dialogs, selected items, and API data

## Testing Configuration

- Framework: Vitest with jsdom environment
- Globals enabled (`test.globals: true`)
- React Testing Library available for component tests
- MSW available for API mocking
