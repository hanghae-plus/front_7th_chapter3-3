import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddPostBody } from "../../../entities/post/model/types"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postMutations } from "../api/mutations"

export const useAddDialog = () => {
  const queryClient = useQueryClient()
  const { dialogs } = useDialogContext()
  const dialog = dialogs.find((dialog) => dialog.type === "add-post")
  const { resetDialog } = useDialogActions()
  const { mutate: addPostMutation, isPending } = useMutation(postMutations.add(queryClient))

  const handleAdd = (addForm: AddPostBody) => {
    addPostMutation(addForm)
    resetDialog()
  }

  return {
    isOpen: !!dialog,
    isPending,
    resetDialog,
    handleAdd,
  }
}
