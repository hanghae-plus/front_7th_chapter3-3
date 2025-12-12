import { useState } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "@/shared/ui"
import { CommentItem } from "@/entities/comment/ui/CommentItem"
import { CommentAddDialog } from "@/features/comment-add/ui/CommentAddDialog"
import { CommentEditDialog } from "@/features/comment-edit/ui/CommentEditDialog"
import { useQueryComments } from "@/entities/comment/model/useComment"
import { useMutationCommentDelete, useMutationCommentLike } from "@/entities/comment/model/useComment"
import { highlightText } from "@/shared/lib/highlight"
import { useAtom } from "jotai"
import { searchQueryAtom } from "@/features/post-search/model/store"
import type { Post, Comment } from "@/shared/types"

interface PostDetailProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostDetail = ({ post, open, onOpenChange }: PostDetailProps) => {
  const [searchQuery] = useAtom(searchQueryAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [editComment, setEditComment] = useState<Comment | null>(null)

  const { data: commentsData } = useQueryComments(post?.id || null)
  const { mutate: deleteComment } = useMutationCommentDelete()
  const { mutate: likeComment } = useMutationCommentLike()

  const handleEditComment = (comment: Comment) => {
    setEditComment(comment)
    setShowEditCommentDialog(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{post && highlightText(post.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{post && highlightText(post.body, searchQuery)}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">댓글</h3>
                <Button size="sm" onClick={() => setShowAddCommentDialog(true)}>
                  <Plus className="w-3 h-3 mr-1" />
                  댓글 추가
                </Button>
              </div>
              <div className="space-y-1">
                {commentsData?.comments?.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={() => likeComment({ id: comment.id, likes: comment.likes, postId: comment.postId })}
                    onEdit={() => handleEditComment(comment)}
                    onDelete={() => deleteComment({ id: comment.id, postId: comment.postId })}
                    highlightText={highlightText}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CommentAddDialog postId={post?.id || null} open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog} />
      <CommentEditDialog comment={editComment} open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog} />
    </>
  )
}
