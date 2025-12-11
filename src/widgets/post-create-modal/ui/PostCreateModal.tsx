import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui"

interface PostCreateModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  body: string
  userId: number
  onTitleChange: (title: string) => void
  onBodyChange: (body: string) => void
  onUserIdChange: (userId: number) => void
  onSubmit: () => void
}

/**
 * 게시물 생성 모달 위젯
 */
export const PostCreateModal = ({
  isOpen,
  onClose,
  title,
  body,
  userId,
  onTitleChange,
  onBodyChange,
  onUserIdChange,
  onSubmit,
}: PostCreateModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={userId}
            onChange={(e) => onUserIdChange(Number(e.target.value))}
          />
          <Button onClick={onSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

