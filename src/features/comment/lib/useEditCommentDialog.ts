import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentQueries } from "../../../entities/comment/api/queries"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { commentMutations } from "../api/mutations"

export const useEditCommentDialog = () => {
  const queryClient = useQueryClient()
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()

  const dialog = dialogs.find((dialog) => dialog.type?.startsWith("edit-comment-"))
  const postId = dialog?.type?.split("-")[2]
  const listQueryKey = commentQueries.list(Number(postId)).queryKey
  const listData = queryClient.getQueryData(listQueryKey)
  const comment = listData?.comments.find((comment) => comment.id === dialog?.id)

  const { mutate: updateCommentMutation, isPending } = useMutation(commentMutations.update(queryClient))

  const handleUpdate = (body: string) => {
    if (!comment) return
    updateCommentMutation({ ...comment, body })
    resetDialog()
  }

  return {
    isOpen: !!dialog,
    comment,
    isPending,
    resetDialog,
    handleUpdate,
  }
}
