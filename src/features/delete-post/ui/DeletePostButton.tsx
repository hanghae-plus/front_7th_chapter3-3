import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { useDeletePost } from "@/entities/post"

interface DeletePostButtonProps {
  postId: number
  onSuccess?: () => void // optional로 변경
}

export const DeletePostButton = ({ postId, onSuccess }: DeletePostButtonProps) => {
  // TanStack Query Mutation 사용
  const deletePost = useDeletePost()

  const handleDelete = () => {
    deletePost.mutate(postId, {
      onSuccess: () => {
        onSuccess?.()
      },
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deletePost.isPending}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
