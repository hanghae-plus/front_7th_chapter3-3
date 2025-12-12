import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useAddCommentDialog } from "../lib/useAddCommentDialog"
import AddCommentForm from "./AddCommentForm"

const AddCommentDialog = () => {
  const { isOpen, id, resetDialog, handleAdd } = useAddCommentDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        {id && <AddCommentForm id={id} handleAdd={handleAdd} />}
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
