import { Plus } from "lucide-react"
import type { Comment } from '../../../entities/comment'
import { CommentItem } from '../../../entities/comment/ui'
import { Button } from "../../../shared/ui"

interface CommentListProps {
  comments: Comment[]
  postId: number
  searchQuery?: string
  onAddComment: () => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

/**
 * 댓글 목록 위젯
 * 게시물의 댓글을 표시하고 관리합니다.
 * Entities UI 컴포넌트를 사용하여 구조를 개선했습니다.
 */
export const CommentList = ({
  comments,
  postId,
  searchQuery = "",
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: CommentListProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={onAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            searchQuery={searchQuery}
            onLikeComment={onLikeComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>
    </div>
  )
}
