import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { commentMutations } from "../api/mutations"

const DeleteCommentButton = ({ id, postId }: { id: number; postId: number }) => {
  const queryClient = useQueryClient()
  const { mutate: deleteCommentMutation, isPending } = useMutation(commentMutations.delete(queryClient))

  const handleDelete = () => {
    deleteCommentMutation({ id, postId })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isPending}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default DeleteCommentButton
