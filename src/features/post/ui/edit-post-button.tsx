import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"
import type { Post } from "@/entities/post"

interface EditPostButtonProps {
  post: Post
  onClick?: (post: Post) => void
}

/**
 * 게시물을 수정하는 버튼
 * 클릭 시 수정 다이얼로그를 열어서 게시물을 수정할 수 있습니다.
 */
export const EditPostButton = ({ post, onClick }: EditPostButtonProps) => {
  const handleClick = () => {
    onClick?.(post)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} title="게시물 수정">
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

