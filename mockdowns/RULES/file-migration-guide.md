# 파일 이동 가이드 (File Migration Guide)

## 📋 개요

FSD 구조로 파일을 이동할 때의 안전한 가이드입니다.

---

## 🔄 파일 이동 절차

### 1. 작업 전 준비

- [ ] Git 상태 확인 (`git status`)
- [ ] 현재 커밋 생성 (롤백 가능하도록)
- [ ] 이동할 파일 목록 확인

### 2. 파일 이동

```bash
# 예시: 컴포넌트 이동
mv src/components/Button.tsx src/shared/ui/button.tsx
```

### 3. Import 경로 업데이트

- [ ] 모든 import 경로 찾기 (`grep -r "from.*components"`)
- [ ] import 경로 수정
- [ ] 타입 체크 (`tsc --noEmit`)

### 4. 검증

- [ ] 타입 체크 통과
- [ ] 빌드 확인 (`pnpm run build`)
- [ ] 브라우저 테스트

---

## ⚠️ 주의사항

1. **한 번에 하나씩**: 여러 파일을 한 번에 이동하지 않음
2. **검증 필수**: 각 파일 이동 후 즉시 검증
3. **커밋 권장**: 파일 이동 후 커밋

---

**안전하게 파일을 이동하세요! 🚀**

