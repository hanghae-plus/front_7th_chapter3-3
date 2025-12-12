import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { useUpdateCommentMutation, showEditCommentDialogAtom, selectedCommentAtom } from "@/entities/comment"
import { useAtom } from "jotai"

export const EditCommentModal = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const { mutate: updateCommentMutate, isPending } = useUpdateCommentMutation(selectedComment?.postId ?? 0)

  const handleUpdateComment = () => {
    if (!selectedComment) return

    updateCommentMutate(selectedComment, {
      onSuccess: () => {
        setShowEditCommentDialog(false)
      },
      onError: (error) => {
        console.error("댓글 업데이트 오류:", error)
      },
    })
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
            onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
          />
          <Button onClick={handleUpdateComment} disabled={isPending}>
            {isPending ? "업데이트 중..." : "댓글 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
