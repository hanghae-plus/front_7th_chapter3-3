import { Plus } from "lucide-react"
import { Button } from "../../../shared/components"
import { CommentItem } from "./CommentItem"
import { CommentAddModal } from "./CommentAddModal"
import { CommentEditModal } from "./CommentEditModal"
import { useComments } from "../model"
import { Suspense } from "react"
import { Comment } from "../../../entities/comments/types"

interface CommentSectionProps {
  postId: number
  searchQuery?: string
  userId?: number
}

export function CommentSection({ postId, searchQuery = "", userId = 1 }: CommentSectionProps) {
  const {
    comments,
    selectedComment,
    showCommentAddModal,
    showCommentEditModal,
    setShowCommentAddModal,
    setShowCommentEditModal,
    handleLike,
    handleOpenEditCommentModal,
    handleDelete,
    handleAddComment,
    handleUpdateComment,
    handleOpenAddCommentModal,
  } = useComments(postId)

  return (
    <>
      <Suspense>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button size="sm" onClick={handleOpenAddCommentModal}>
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>
        <div className="space-y-1">
          {comments.map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              searchQuery={searchQuery}
              onLike={handleLike}
              onEdit={handleOpenEditCommentModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Suspense>
      <CommentAddModal
        open={showCommentAddModal}
        onOpenChange={setShowCommentAddModal}
        postId={postId}
        userId={userId}
        onSubmit={handleAddComment}
      />
      <CommentEditModal
        open={showCommentEditModal}
        onOpenChange={setShowCommentEditModal}
        comment={selectedComment}
        onSubmit={handleUpdateComment}
      />
    </>
  )
}
