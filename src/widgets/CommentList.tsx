import { Comment } from "@/entities/comment"
import { CreateCommentDialog } from "@/features/create-comment"
import { EditCommentButton } from "@/features/edit-comment"
import { DeleteCommentButton } from "@/features/delete-comment"
import { LikeCommentButton } from "@/features/like-comment"
import { highlightText } from "@/shared/lib"

interface CommentListProps {
  postId: number
  comments: Comment[]
  searchQuery: string
  onUpdate: () => void
}

export const CommentList = ({ postId, comments, searchQuery, onUpdate }: CommentListProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CreateCommentDialog postId={postId} onSuccess={onUpdate} />
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LikeCommentButton commentId={comment.id} likes={comment.likes} onSuccess={onUpdate} />
              <EditCommentButton comment={comment} onSuccess={onUpdate} />
              <DeleteCommentButton commentId={comment.id} onSuccess={onUpdate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
