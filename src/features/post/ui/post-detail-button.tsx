import { Button } from "@/shared/ui"
import { MessageSquare } from "lucide-react"
import type { Post } from "@/entities/post"

interface PostDetailButtonProps {
  post: Post
  onClick?: () => void
}

/**
 * 게시물의 댓글을 보는 버튼
 * 클릭 시 게시물 상세 모달을 열어서 댓글을 볼 수 있습니다.
 */
export const PostDetailButton = ({ onClick }: PostDetailButtonProps) => {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} title="댓글 보기">
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
