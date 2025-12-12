import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useQueryParams } from "../../../shared/lib/useQueryParams"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postWithAuthorQueries } from "../api/queries"

export const useDetailDialog = () => {
  const queryClient = useQueryClient()
  const { getQueryParam } = useQueryParams()
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const id = dialogs.find((dialog) => dialog.type === "detail")?.id ?? null
  const { data: post, error } = useQuery(postWithAuthorQueries.detail(queryClient, id))

  const search = getQueryParam("search")

  return {
    isOpen: !!post,
    post,
    error,
    search,
    resetDialog,
  }
}
