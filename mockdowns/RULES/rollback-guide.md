# 롤백 가이드 (Rollback Guide)

## 📋 개요

문제 발생 시 이전 상태로 안전하게 복구하는 방법입니다.

---

## 🔄 Git 롤백 방법

### 1. 파일 단위 롤백

```bash
# 특정 파일만 롤백
git checkout HEAD -- src/pages/PostsManagerPage.tsx
```

### 2. 커밋 단위 롤백

```bash
# 마지막 커밋 취소 (변경사항 유지)
git reset --soft HEAD~1

# 마지막 커밋 취소 (변경사항 삭제)
git reset --hard HEAD~1
```

### 3. 특정 커밋으로 복구

```bash
# 커밋 해시 확인
git log --oneline

# 특정 커밋으로 복구
git checkout {commit-hash}
```

---

## ⚠️ 주의사항

1. **변경사항 확인**: 롤백 전 현재 변경사항 확인
2. **백업 권장**: 중요한 변경사항은 백업
3. **팀 협의**: 공유 브랜치에서는 팀과 협의

---

**문제 발생 시 즉시 롤백하세요! 🛡️**

