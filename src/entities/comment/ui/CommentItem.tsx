import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import type { Comment } from '../model/types'
import { highlightText } from '../../../shared/lib'
import { Button } from '../../../shared/ui'

interface CommentItemProps {
  comment: Comment
  postId: number
  searchQuery?: string
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

/**
 * 댓글 아이템 컴포넌트
 * 개별 댓글을 표시하고 관리합니다.
 */
export const CommentItem = ({
  comment,
  postId,
  searchQuery = "",
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: CommentItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => onLikeComment(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEditComment(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDeleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

