import { Edit2 } from "lucide-react"
import { useDialogActions } from "../../../shared/model/useDialog"
import { Button } from "../../../shared/ui"

interface EditCommentDialogButtonProps {
  id: number
  postId: number
}

const EditCommentDialogButton = ({ id, postId }: EditCommentDialogButtonProps) => {
  const { setDialog } = useDialogActions()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        setDialog({
          type: `edit-comment-${postId}`,
          id,
        })
      }
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}

export default EditCommentDialogButton
