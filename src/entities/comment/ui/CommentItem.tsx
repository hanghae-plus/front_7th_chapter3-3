import { Edit, ThumbsUp, Trash2 } from "lucide-react"
import type { Comment } from "../model/types"

interface CommentItemProps {
  comment: Comment
  onLike: () => void
  onEdit: () => void
  onDelete: () => void
}

export function CommentItem({ comment, onLike, onEdit, onDelete }: CommentItemProps) {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">{comment.user.username}:</span>
        <span>{comment.body}</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onLike} className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
          <ThumbsUp className="w-4 h-4" />
          <span>{comment.likes}</span>
        </button>
        <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded">
          <Edit className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="p-1 hover:bg-gray-100 rounded text-red-500">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
