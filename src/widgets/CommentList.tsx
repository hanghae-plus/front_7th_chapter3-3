import { useSearchParams } from "react-router-dom"
import { Comment } from "@/entities/comment"
import { CreateCommentDialog } from "@/features/comment/create-comment"
import { EditCommentButton } from "@/features/comment/edit-comment"
import { DeleteCommentButton } from "@/features/comment/delete-comment"
import { LikeCommentButton } from "@/features/comment/like-comment"
import { highlightText } from "@/shared/lib"

interface CommentListProps {
  postId: number
  comments: Comment[]
  onUpdate?: () => void // optional로 변경 (TanStack Query 사용 시 불필요)
}

export const CommentList = ({ postId, comments, onUpdate = () => {} }: CommentListProps) => {
  const [searchParams] = useSearchParams()

  // URL에서 직접 searchQuery 읽기
  const searchQuery = searchParams.get("search") || ""

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
