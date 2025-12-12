import { useAtomValue, useSetAtom } from "jotai"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { searchQueryAtom } from "@/features/post-filter"
import {
  useCommentsQuery,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "@/entities/comment"
import { HighlightText } from "@/shared/ui/HighlightText"
import { Button } from "@/shared/ui/Button"

// 댓글 렌더링
export const Comments = ({ postId }: { postId: number }) => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const setNewComment = useSetAtom(newCommentAtom)
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom)
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom)
  const setSelectedComment = useSetAtom(selectedCommentAtom)

  const { data } = useCommentsQuery(postId)
  const comments = data?.comments ?? []

  const { mutate: deleteCommentMutate } = useDeleteCommentMutation(postId)
  const { mutate: likeCommentMutate } = useLikeCommentMutation(postId)

  const handleLikeComment = (id: number, currentLikes: number) => {
    likeCommentMutate(
      { id, likes: currentLikes + 1 },
      {
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      },
    )
  }

  const handleDeleteComment = (id: number) => {
    deleteCommentMutate(id, {
      onError: (error) => {
        console.error("댓글 삭제 오류:", error)
      },
    })
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, comment.likes)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
