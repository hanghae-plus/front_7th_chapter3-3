import { highlightText } from "@/shared/lib/text"
import type { Comment } from "../model/types"

interface CommentRowProps {
  comment: Comment
  searchQuery?: string
  actions?: React.ReactNode
}

export const CommentRow = ({ comment, searchQuery = "", actions }: CommentRowProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden flex-1">
        <span className="font-medium truncate">{comment.user?.username || "Unknown"}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1 flex-shrink-0">{actions}</div>
    </div>
  )
}
