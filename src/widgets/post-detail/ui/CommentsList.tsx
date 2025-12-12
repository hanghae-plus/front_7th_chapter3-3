import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { useComments, type Comment } from "@/entities/comment"
import { useDeleteComment, useLikeComment, useFilterStore } from "@/features"

interface CommentsListProps {
  postId: number
}

const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  )
}

export const CommentsList = ({ postId }: CommentsListProps) => {
  const { openAddCommentDialog, openEditCommentDialog } = useUIStore()
  const { searchQuery } = useFilterStore()
  const { data: commentsData } = useComments(postId)
  const deleteComment = useDeleteComment()
  const likeComment = useLikeComment()

  const comments = commentsData?.comments || []

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={openAddCommentDialog}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment: Comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  likeComment.mutate({
                    commentId: comment.id,
                    postId,
                    currentLikes: comment.likes,
                  })
                }
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => openEditCommentDialog(comment)}>
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteComment.mutate({ commentId: comment.id, postId })}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
