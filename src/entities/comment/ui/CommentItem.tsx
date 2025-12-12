import { ThumbsUp } from "lucide-react"
import { Button } from "@/shared/ui"
import type { Comment } from "@/shared/types"

interface CommentItemProps {
  comment: Comment
  onLike: () => void
  onEdit: () => void
  onDelete: () => void
  highlightText: (text: string, highlight: string) => React.ReactNode
  searchQuery: string
}

export const CommentItem = ({ comment, onLike, onEdit, onDelete, highlightText, searchQuery }: CommentItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={onLike}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <span className="text-xs">수정</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <span className="text-xs">삭제</span>
        </Button>
      </div>
    </div>
  )
}
