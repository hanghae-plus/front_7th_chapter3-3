import { Suspense, useState } from "react"
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useSuspenseCommentList,
  useUpdateCommentMutation,
} from "../../../entities/comments/model"
import { Comment } from "../../../entities/comments/types"
import { Post } from "../../../entities/posts/types"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/components"
import { highlightText } from "../../../shared/utils/highlightText"
import { CommentAddModal, CommentEditModal, CommentItem } from "../../../features/control-comments/ui"
import { Plus } from "lucide-react"

export function PostDetailModal({
  post,
  open,
  onOpenChange,

  searchQuery = "",
}: {
  post: Post
  open: boolean
  onOpenChange: (open: boolean) => void
  searchQuery?: string
}) {
  const { data: comments } = useSuspenseCommentList(post.id)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const [showCommentAddModal, setShowCommentAddModal] = useState(false)
  const handleOpenAddCommentModal = () => {
    setShowCommentAddModal(true)
  }

  const likeCommentMutation = useLikeCommentMutation(post.id)
  const handleLike = async (id: number) => {
    try {
      await likeCommentMutation.mutateAsync({
        id,
        likes: comments.find((comment: Comment) => comment.id === id)?.likes + 1,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [showCommentEditModal, setShowCommentEditModal] = useState(false)
  const handleOpenEditCommentModal = (comment: Comment) => {
    setSelectedComment(comment)
    setShowCommentEditModal(true)
  }

  const deleteCommentMutation = useDeleteCommentMutation(post.id)
  const handleDelete = async (id: number) => {
    try {
      await deleteCommentMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  const createCommentMutation = useCreateCommentMutation(post.id)
  const handleAddComment = async (body: string, postId: number, userId: number) => {
    try {
      await createCommentMutation.mutateAsync({ body, postId, userId })
    } catch (error) {
      console.error(error)
    }
  }

  const updateCommentMutation = useUpdateCommentMutation(post.id)
  const handleUpdateComment = async (id: number, body: string) => {
    try {
      await updateCommentMutation.mutateAsync({ id, body })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(post.body, searchQuery)}</p>
            <Suspense>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">댓글</h3>
                <Button size="sm" onClick={handleOpenAddCommentModal}>
                  <Plus className="w-3 h-3 mr-1" />
                  댓글 추가
                </Button>
              </div>
              {comments?.map((comment: Comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  searchQuery={searchQuery}
                  onLike={handleLike}
                  onEdit={handleOpenEditCommentModal}
                  onDelete={handleDelete}
                />
              ))}
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
      <CommentAddModal
        open={showCommentAddModal}
        onOpenChange={setShowCommentAddModal}
        postId={post.id}
        userId={1}
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
