import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components"
import { useCommentStore, CommentItem } from "@/entities/comment"
import { useUiStore } from "@/shared/model"

interface CommentsSectionProps {
  postId: number
}

export const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const { comments, fetchComments, likeComment, deleteComment, setSelectedComment } =
    useCommentStore()
  const { searchQuery, setShowAddCommentDialog, setShowEditCommentDialog } = useUiStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        await fetchComments(postId)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [postId, fetchComments])

  const postComments = comments[postId] || []

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => setShowAddCommentDialog(true)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {loading ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            로딩 중...
          </div>
        ) : postComments.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            댓글이 없습니다.
          </div>
        ) : (
          postComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              searchQuery={searchQuery}
              onLikeClick={() => likeComment(comment.id, postId)}
              onEditClick={() => {
                setSelectedComment(comment)
                setShowEditCommentDialog(true)
              }}
              onDeleteClick={() => deleteComment(comment.id, postId)}
            />
          ))
        )}
      </div>
    </div>
  )
}
