import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useEditCommentDialog } from "../lib/useEditCommentDialog"
import EditCommentForm from "./EditCommentForm"

const EditCommentDialog = () => {
  const { isOpen, comment, resetDialog, handleUpdate } = useEditCommentDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        {comment && <EditCommentForm body={comment.body} handleUpdate={handleUpdate} />}
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
