import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentRequestBody } from "../../../entities/comment/model/types"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { commentMutations } from "../api/mutations"

export const useAddCommentDialog = () => {
  const queryClient = useQueryClient()
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const { mutate: addCommentMutation, isPending } = useMutation(commentMutations.add(queryClient))

  const handleAdd = (body: CommentRequestBody) => {
    addCommentMutation(body)
    resetDialog()
  }

  const id = dialogs.find((dialog) => dialog.type === "add-comment")?.id ?? null

  return {
    isOpen: !!id,
    id,
    isPending,
    resetDialog,
    handleAdd,
  }
}
