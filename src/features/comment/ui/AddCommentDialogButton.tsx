import { Plus } from "lucide-react"
import { useDialogActions } from "../../../shared/model/useDialog"
import { Button } from "../../../shared/ui"

interface AddCommentDialogButtonProps {
  id: number
}

const AddCommentDialogButton = ({ id }: AddCommentDialogButtonProps) => {
  const { setDialog } = useDialogActions()

  return (
    <Button size="sm" onClick={() => setDialog({ type: "add-comment", id })}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}

export default AddCommentDialogButton
