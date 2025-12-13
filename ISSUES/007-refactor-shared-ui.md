# 007: Shared UI 레이어 - 공통 컴포넌트 분리

## 목표
components 폴더에서 재사용 가능한 UI 컴포넌트를 shared/ui로 분리

## 작업 내용
### cards
- [x] `shared/ui/cards/Card.tsx`
- [x] `shared/ui/cards/CardContent.tsx`
- [x] `shared/ui/cards/CardHeader.tsx`
- [x] `shared/ui/cards/CardTitle.tsx`
- [x] `shared/ui/cards/index.ts`

### dialogs
- [x] `shared/ui/dialogs/Dialog.tsx` (primitives)
- [x] `shared/ui/dialogs/DialogContent.tsx`
- [x] `shared/ui/dialogs/DialogHeader.tsx`
- [x] `shared/ui/dialogs/DialogTitle.tsx`
- [x] `shared/ui/dialogs/index.ts`

### tables
- [x] `shared/ui/tables/Table.tsx`
- [x] `shared/ui/tables/TableBody.tsx`
- [x] `shared/ui/tables/TableCell.tsx`
- [x] `shared/ui/tables/TableHead.tsx`
- [x] `shared/ui/tables/TableHeader.tsx`
- [x] `shared/ui/tables/TableRow.tsx`
- [x] `shared/ui/tables/index.ts`

### buttons
- [x] `shared/ui/buttons/Button.tsx`
- [x] `shared/ui/buttons/index.ts`

### inputs
- [x] `shared/ui/inputs/Input.tsx`
- [x] `shared/ui/inputs/Textarea.tsx`
- [x] `shared/ui/inputs/index.ts`

### selects
- [x] `shared/ui/selects/Select.tsx`
- [x] `shared/ui/selects/index.ts`

### 정리
- [x] 모든 import 경로 업데이트
- [x] `components/index.tsx` 삭제

## 의존성
- 006-refactor-widgets 완료 필요
