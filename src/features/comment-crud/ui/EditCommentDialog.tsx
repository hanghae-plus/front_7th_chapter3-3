import { Button } from "@/shared/ui/buttons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialogs"
import { Textarea } from "@/shared/ui/inputs"
import { useCommentStore } from "@/entities/comment"
import { useUiStore } from "@/shared/model"

export const EditCommentDialog = () => {
  const { selectedComment, setSelectedComment, updateComment } = useCommentStore()
  const { showEditCommentDialog, setShowEditCommentDialog } = useUiStore()

  const handleSubmit = async () => {
    if (!selectedComment) return
    await updateComment(selectedComment.id, selectedComment.body, selectedComment.postId)
    setShowEditCommentDialog(false)
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) =>
              setSelectedComment(
                selectedComment ? { ...selectedComment, body: e.target.value } : null
              )
            }
          />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
