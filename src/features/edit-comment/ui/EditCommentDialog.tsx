import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { useUpdateComment } from "../model/useUpdateComment"

export const EditCommentDialog = () => {
  const { showEditCommentDialog, closeEditCommentDialog, selectedComment } = useUIStore()
  const updateComment = useUpdateComment()

  const handleUpdateComment = () => {
    if (!selectedComment) return

    updateComment.mutate(
      {
        commentId: selectedComment.id,
        postId: selectedComment.postId,
        data: { body: selectedComment.body },
      },
      {
        onSuccess: () => {
          closeEditCommentDialog()
        },
      }
    )
  }

  const updateSelectedComment = (body: string) => {
    if (!selectedComment) return
    useUIStore.setState({
      selectedComment: { ...selectedComment, body },
    })
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={closeEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => updateSelectedComment(e.target.value)}
          />
          <Button onClick={handleUpdateComment} disabled={updateComment.isPending}>
            {updateComment.isPending ? "수정 중..." : "댓글 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
