import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@/shared/ui'
import { Post } from '@/entities/post/model/types'
import { useComments } from '@/entities/comment/api/queries'
import { CommentItem } from '@/entities/comment/ui/CommentItem'
import { CommentCreateDialog } from '@/features/comment-create/ui/CommentCreateDialog'
import { CommentUpdateDialog } from '@/features/comment-update/ui/CommentUpdateDialog'
import { useCommentLike } from '@/features/comment-like'
import { useCommentDelete } from '@/features/comment-delete'
import { highlightText } from '@/shared/lib/highlight'
import { Plus } from 'lucide-react'
import { Comment } from '@/entities/comment/model/types'

interface PostDetailDialogProps {
  post: Post | null
  searchQuery: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostDetailDialog = ({ post, searchQuery, open, onOpenChange }: PostDetailDialogProps) => {
  const [showAddComment, setShowAddComment] = useState(false)
  const [showEditComment, setShowEditComment] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const { data: commentsData } = useComments(post?.id || 0, open && !!post)
  const { handleLike } = useCommentLike(post?.id || 0)
  const { handleDelete } = useCommentDelete(post?.id || 0)

  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditComment(true)
  }

  if (!post) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(post.body, searchQuery)}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">댓글</h3>
                <Button size="sm" onClick={() => setShowAddComment(true)}>
                  <Plus className="w-3 h-3 mr-1" />
                  댓글 추가
                </Button>
              </div>
              <div className="space-y-1">
                {commentsData?.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    searchQuery={searchQuery}
                    onLike={() => handleLike(comment)}
                    onEdit={() => handleEditComment(comment)}
                    onDelete={() => handleDelete(comment.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CommentCreateDialog postId={post.id} open={showAddComment} onOpenChange={setShowAddComment} />
      <CommentUpdateDialog comment={selectedComment} open={showEditComment} onOpenChange={setShowEditComment} />
    </>
  )
}
