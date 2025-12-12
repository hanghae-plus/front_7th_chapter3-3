import { useEditComment } from "../../comment/model/useEditComment"
import { Button } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

export const EditCommentDialog = () => {
  const { isOpen, setIsOpen, selectedComment, setSelectedComment, handleSubmit, isLoading } = useEditComment()

  if (!selectedComment) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment.body}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "수정 중..." : "댓글 수정"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
