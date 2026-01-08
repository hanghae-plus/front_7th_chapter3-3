/**
 * Comment Edit Feature UI
 * 
 * 댓글 수정 다이얼로그 컴포넌트
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "../../../shared/ui"
import { useCommentEdit } from "../model/use-comment-edit"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 댓글 수정 다이얼로그
 */
export function CommentEditDialog() {
  const { selectedComment, setSelectedComment, showEditCommentDialog, handleUpdate } = useCommentEdit()
  const { setShowEditCommentDialog } = useUIStore()

  if (!selectedComment) return null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowEditCommentDialog(false)
      setSelectedComment(null)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            rows={10}
            placeholder="댓글 내용"
            value={selectedComment.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={handleUpdate}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

