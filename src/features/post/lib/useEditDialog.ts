import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UpdatePostBody } from "../../../entities/post/model/types"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postMutations } from "../api/mutations"
import { postWithAuthorQueries } from "../api/queries"

export const useEditDialog = () => {
  const queryClient = useQueryClient()
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const id = dialogs.find((dialog) => dialog.type === "edit")?.id ?? null
  const { data: post, error } = useQuery(postWithAuthorQueries.detail(queryClient, id))
  const { mutate: updatePostMutation, isPending } = useMutation(postMutations.update(queryClient))

  const handleUpdate = (editForm: UpdatePostBody) => {
    if (!id) return
    updatePostMutation({ id, body: editForm })
    resetDialog()
  }

  return {
    isOpen: !!post,
    post,
    error,
    isPending,
    resetDialog,
    handleUpdate,
  }
}
