import { useQuery } from "@tanstack/react-query"
import { userQueries } from "../../../entities/user/api/queries"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"

export const useUserDialog = () => {
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const id = dialogs.find((dialog) => dialog.type === "user")?.id ?? null
  const { data: user, error } = useQuery(userQueries.detail(id))

  return {
    user,
    error,
    isOpen: !!user,
    resetDialog,
  }
}
