import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui"
import type { Post } from '../../../entities/post'

interface PostEditModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
  onTitleChange: (title: string) => void
  onBodyChange: (body: string) => void
  onSubmit: () => void
}

/**
 * 게시물 수정 모달 위젯
 */
export const PostEditModal = ({
  isOpen,
  onClose,
  post,
  onTitleChange,
  onBodyChange,
  onSubmit,
}: PostEditModalProps) => {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post.title || ""}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post.body || ""}
            onChange={(e) => onBodyChange(e.target.value)}
          />
          <Button onClick={onSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

