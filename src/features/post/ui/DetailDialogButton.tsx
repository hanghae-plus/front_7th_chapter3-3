import { MessageSquare } from "lucide-react"
import { useDialogActions } from "../../../shared/model/useDialog"
import { Button } from "../../../shared/ui"

interface DetailDialogButtonProps {
  id: number
}

export const DetailDialogButton = ({ id }: DetailDialogButtonProps) => {
  const { setDialog } = useDialogActions()

  return (
    <Button variant="ghost" size="sm" onClick={() => setDialog({ type: "detail", id })}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
