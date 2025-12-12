import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useAddDialog } from "../lib/useAddDialog"
import AddForm from "./AddForm"

const AddDialog = () => {
  const { isOpen, resetDialog, handleAdd } = useAddDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <AddForm handleAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog
