import { Plus } from "lucide-react"
import { useDialogActions } from "../../../shared/model/useDialog"
import { Button } from "../../../shared/ui"

const AddDialogButton = () => {
  const { setDialog } = useDialogActions()

  return (
    <Button onClick={() => setDialog({ type: "add-post", id: null })}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default AddDialogButton
