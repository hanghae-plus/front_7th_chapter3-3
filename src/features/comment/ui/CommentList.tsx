import { HighlightText } from "../../../shared/ui"
import { useCommentList } from "../lib/useCommentList"
import AddCommentDialogButton from "./AddCommentDialogButton"
import DeleteCommentButton from "./DeleteCommentButton"
import EditCommentDialogButton from "./EditCommentDialogButton"
import LikeCommentButton from "./LikeCommentButton"

interface CommentListProps {
  id: number
}

const CommentList = ({ id }: CommentListProps) => {
  const { comments, search } = useCommentList(id)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentDialogButton id={id} />
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={search} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <LikeCommentButton comment={comment} />
              <EditCommentDialogButton id={comment.id} postId={id} />
              <DeleteCommentButton id={comment.id} postId={id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList
