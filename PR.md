## 📝 변경 사항

### 주요 작업
FSD(Feature-Sliced Design) 아키텍처 적용 및 TanStack Query, Jotai를 활용한 전면 리팩토링

### 상세 내용

#### 1. FSD 아키텍처 적용
- **app 레이어**: QueryProvider를 통한 전역 설정
- **pages 레이어**: PostsManagerPage 구현 (700줄 → 230줄 축소)
- **widgets 레이어**: PostTable, PostDetail, UserModal 구현
- **features 레이어**: 게시물/댓글 CRUD, 검색 기능 분리
- **entities 레이어**: Post, Comment, User, Tag 엔티티별 api/model/ui 분리
- **shared 레이어**: 공통 타입, API 클라이언트, UI 컴포넌트

#### 2. 상태 관리 개선
- **전역 상태 (Jotai)**: 검색어, 필터, 정렬, 페이지네이션
- **서버 상태 (TanStack Query)**: API 호출, 캐싱, 동기화

#### 3. 캐시 전략 최적화
- Post/Comment CRUD: `setQueryData`로 직접 캐시 갱신
- Like/Dislike: 낙관적 업데이트로 즉각 반응

## 과제 체크포인트

### ✅ 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기

#### 체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요? (기능별로 필요시)
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?

### ✅ 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기

#### 체크포인트
- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?
- [x] 낙관적인 업데이트가 적용되었는가?
- [ ] 에러 핸들링이 적절히 구현되었는가? (추후 개선 필요)
- [x] 서버 상태와 클라이언트 상태가 명확히 분리되었는가?
- [x] 코드가 간결하고 유지보수가 용이한 구조로 작성되었는가?
- [ ] TanStack Query의 Devtools가 정상적으로 작동하는가? (미설정)

### ✅ 최종과제
- [x] 폴더구조와 나의 멘탈모델이 일치하나요?
- [x] 다른 사람이 봐도 이해하기 쉬운 구조인가요?

## 🔍 테스트 가이드

### 로컬 실행
```bash
pnpm install
pnpm dev
```

### 빌드 확인
```bash
pnpm build
```

### 테스트 항목
- [x] 게시물 목록 조회
- [x] 게시물 추가/수정/삭제 (즉시 UI 반영)
- [x] 검색 기능
- [x] 태그 필터링
- [x] 페이지네이션
- [x] 댓글 추가/수정/삭제 (즉시 UI 반영)
- [x] 좋아요/싫어요 기능 (즉시 UI 반영)
- [x] 사용자 정보 모달

## 📚 참고 문서
- [DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md): 전체 개발 과정 상세 기록
- [8주차_과제_FSD_설계.md](./8주차_과제_FSD_설계.md): 과제 요구사항 및 FSD 가이드

## 💭 회고

### 이번 과제를 통해 새롭게 알게 된 점
- FSD 아키텍처를 통한 체계적인 폴더 구조의 중요성
- TanStack Query의 캐시 전략과 낙관적 업데이트의 효과
- Mock API 환경에서의 캐시 관리 주의점

### 가장 노력했던 부분
- 각 레이어의 책임을 명확히 분리하고 단일 책임 원칙 준수
- TanStack Query 캐시를 직접 갱신하여 즉각적인 UI 반응 구현
- 일관된 명명 규칙 적용 (useQuery*, useMutation*)

### 추가 개선이 필요한 부분
- 에러 바운더리 및 에러 핸들링 강화
- TanStack Query DevTools 추가
- 정렬 기능 구현
- 단위/통합 테스트 작성
- 접근성(a11y) 개선

### 앞으로 적용하고 싶은 점
- 신규 프로젝트에서 처음부터 FSD 구조로 설계
- 서버 상태와 클라이언트 상태를 명확히 분리하는 습관
- 낙관적 업데이트를 통한 UX 개선

## ❓ 리뷰 요청 사항
- FSD 레이어 분리가 적절한지 (특히 features vs widgets 구분)
- TanStack Query 캐시 전략이 올바른지
- Mock API 환경에서 `setQueryData` 사용이 최선인지
```