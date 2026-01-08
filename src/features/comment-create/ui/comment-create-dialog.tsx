/**
 * Comment Create Feature UI
 * 
 * 댓글 생성 다이얼로그 컴포넌트
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "../../../shared/ui"
import { useCommentCreate } from "../model/use-comment-create"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 댓글 생성 다이얼로그
 */
export function CommentCreateDialog() {
  const { newComment, setNewComment, showAddCommentDialog, handleCreate } = useCommentCreate()
  const { setShowAddCommentDialog } = useUIStore()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleCreate}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

