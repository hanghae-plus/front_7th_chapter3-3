import { Dialog, DialogContent, DialogHeader, DialogTitle, ErrorDisplay } from "../../../shared/ui"
import { useEditDialog } from "../lib/useEditDialog"
import EditForm from "./EditForm"

const EditDialog = () => {
  const { isOpen, post, error, resetDialog, handleUpdate } = useEditDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        {error ? <ErrorDisplay error={error} /> : post && <EditForm post={post} handleUpdate={handleUpdate} />}
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog
