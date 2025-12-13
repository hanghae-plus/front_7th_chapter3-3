import { memo } from "react"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Comment } from "../types"
import { Button } from "@/shared/ui/buttons"
import { highlightText } from "@/shared/lib"

interface CommentItemProps {
  comment: Comment
  searchQuery: string
  onLikeClick: () => void
  onEditClick: () => void
  onDeleteClick: () => void
}

export const CommentItem = memo(({
  comment,
  searchQuery,
  onLikeClick,
  onEditClick,
  onDeleteClick,
}: CommentItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={onLikeClick}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onEditClick}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDeleteClick}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
})
