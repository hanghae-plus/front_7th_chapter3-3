import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { postMutations } from "../api/mutations"

interface DeleteButtonProps {
  id: number
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const queryClient = useQueryClient()
  const { mutate: deletePostMutation, isPending } = useMutation(postMutations.delete(queryClient))

  const handleDelete = () => {
    deletePostMutation(id)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isPending}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default DeleteButton
