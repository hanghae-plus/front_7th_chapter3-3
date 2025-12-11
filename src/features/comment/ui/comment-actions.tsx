import { LikeCommentButton } from "./like-comment-button"
import { EditCommentButton } from "./edit-comment-button"
import { DeleteCommentButton } from "./delete-comment-button"
import type { Comment } from "@/entities/comment"

interface CommentActionsProps {
  comment: Comment
  onLike?: (commentId: number, postId: number) => void
  onEdit?: (comment: Comment) => void
  onDelete?: (commentId: number, postId: number) => void
  disabled?: boolean
}

/**
 * 댓글 액션 버튼 조합
 * - 좋아요
 * - 수정
 * - 삭제
 *
 * @internal 각 버튼을 개별적으로 사용하는 것이 권장됩니다.
 * 이 컴포넌트는 향후 재사용 패턴이 생기면 활용할 수 있습니다.
 */
export const CommentActions = ({
  comment,
  onLike,
  onEdit,
  onDelete,
  disabled = false,
}: CommentActionsProps) => {
  return (
    <>
      <LikeCommentButton comment={comment} onClick={onLike} />
      <EditCommentButton comment={comment} onClick={onEdit} />
      <DeleteCommentButton comment={comment} onClick={onDelete} disabled={disabled} />
    </>
  )
}

