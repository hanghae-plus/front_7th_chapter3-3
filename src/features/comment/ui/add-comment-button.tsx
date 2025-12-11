import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

interface AddCommentButtonProps {
  onClick?: () => void
}

/**
 * 댓글 추가 버튼
 * 클릭 시 댓글 추가 다이얼로그를 열어서 댓글을 추가할 수 있습니다.
 */
export const AddCommentButton = ({ onClick }: AddCommentButtonProps) => {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <Button size="sm" onClick={handleClick} title="댓글 추가">
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}

