import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Post } from "@/entities/post/model/post"
import { highlightText } from "@/shared/lib/text"
import { Comment } from "@/entities/comment/model/comment"
import { Button } from "@/shared/ui/button"
import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  searchQuery: string
  comments: Comment[]
  onAddComment: () => void
  onLikeComment: (commentId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery,
  comments,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>

          {/* 댓글 섹션 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <Button size="sm" onClick={onAddComment}>
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start justify-between text-sm border-b pb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{comment.user.username}:</span>{" "}
                    <span className="break-words">{highlightText(comment.body, searchQuery)}</span>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => onLikeComment(comment.id)}>
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditComment(comment)}>
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteComment(comment.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
