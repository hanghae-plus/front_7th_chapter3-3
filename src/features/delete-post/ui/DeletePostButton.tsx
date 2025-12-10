import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { deletePost } from "@/entities/post"

interface DeletePostButtonProps {
  postId: number
  onSuccess: () => void
}

export const DeletePostButton = ({ postId, onSuccess }: DeletePostButtonProps) => {
  const handleDelete = async () => {
    try {
      await deletePost(postId)
      onSuccess()
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
