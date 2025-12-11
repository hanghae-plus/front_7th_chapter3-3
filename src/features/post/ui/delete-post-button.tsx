import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"
import type { Post } from "@/entities/post"

interface DeletePostButtonProps {
  post: Post
  onClick?: (postId: number) => void
  disabled?: boolean
}

/**
 * 게시물을 삭제하는 버튼
 * 클릭 시 게시물을 삭제합니다.
 */
export const DeletePostButton = ({ post, onClick, disabled }: DeletePostButtonProps) => {
  const handleClick = () => {
    onClick?.(post.id)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      title="게시물 삭제"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

