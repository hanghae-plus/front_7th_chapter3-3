import { Edit2 } from "lucide-react"
import { useDialogActions } from "../../../shared/model/useDialog"
import { Button } from "../../../shared/ui"

interface EditDialogButtonProps {
  id: number
}

const EditDialogButton = ({ id }: EditDialogButtonProps) => {
  const { setDialog } = useDialogActions()

  return (
    <Button variant="ghost" size="sm" onClick={() => setDialog({ type: "edit", id })}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

export default EditDialogButton
