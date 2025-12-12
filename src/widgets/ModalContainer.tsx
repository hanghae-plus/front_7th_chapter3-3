import { PropsWithChildren, useState } from "react"
import { Dialog } from "@/shared/ui/Dialog"

export const ModalContainer = ({ children }: PropsWithChildren) => {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      {children}
    </Dialog>
  )
}
