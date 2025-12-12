import { Comment } from "../../../entities/comment/model/comment"
import HighlightText from "../../../shared/ui/HighlightText"
import { Button } from "../../../shared/ui"
import { ThumbsUp } from "lucide-react"
import { Edit2 } from "lucide-react"
import { Trash2 } from "lucide-react"
import usePostParams from "../../../features/post/model/usePostParams"
import useLikeCommentQuery from "../../../features/comment/model/useLikeCommentQuery"
import useDeleteCommentQuery from "../../../features/comment/model/useDeleteCommentQuery"
import { useEditCommentDialogStore } from "../../../features/comment/model/useEditCommentDialogStore"
import { useSelectedCommentStore } from "../../../entities/comment/model/useSelectedCommentStore"

const CommentItem = ({ comment }: { comment: Comment }) => {
  const { params } = usePostParams()
  const { likeComment } = useLikeCommentQuery()
  const { deleteComment } = useDeleteCommentQuery()

  const openEditCommentDialog = useEditCommentDialogStore((state) => state.openEditCommentDialog)
  const setSelectedComment = useSelectedCommentStore((state) => state.setSelectedComment)

  const handleLikeComment = () => {
    likeComment({ id: comment.id, postId: comment.postId, likes: comment.likes + 1 })
  }

  const handleEditComment = () => {
    setSelectedComment(comment)
    openEditCommentDialog()
  }
  const handleDeleteComment = () => {
    deleteComment({ id: comment.id, postId: comment.postId })
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={comment.body} highlight={params.searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLikeComment}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleEditComment}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentItem
