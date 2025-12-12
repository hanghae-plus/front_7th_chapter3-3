import { useAddComment } from "../model/useAddComment"
import { Button } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

export const AddCommentDialog = () => {
  const { isOpen, setIsOpen, newComment, setNewComment, handleSubmit, isLoading } = useAddComment()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "추가 중..." : "댓글 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
