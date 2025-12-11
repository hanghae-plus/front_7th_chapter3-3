import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "@/shared/ui"
import { Plus, Edit2, Trash2, ThumbsUp } from "lucide-react"
import { highlightText } from "@/shared/lib/highlight"
import { Post } from "@/entities/post/model/types"
import { Comment } from "@/entities/comment/model/types"
import { CommentAddDialog } from "@/features/manage-comment/ui/CommentAddDialog"
import { CommentEditDialog } from "@/features/manage-comment/ui/CommentEditDialog"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post
  searchQuery: string
  comments: Comment[]
  commentActions: {
    addComment: (comment: any) => void
    updateComment: (comment: any) => void
    deleteComment: (id: number, postId: number) => void
    likeComment: (id: number, postId: number, likes: number) => void
  }
}

export const PostDetailDialog = ({ open, onOpenChange, post, searchQuery, comments, commentActions }: Props) => {
  // 댓글 관련 모달 상태 관리 (위젯 내부 상태)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // 댓글 수정 핸들러
  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return (
    <>
      {/* 1. 메인 상세 다이얼로그 */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(post.body, searchQuery)}</p>

            {/* 댓글 섹션 (기존 renderComments 로직) */}
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">댓글</h3>
                <Button size="sm" onClick={() => setShowAddCommentDialog(true)}>
                  <Plus className="w-3 h-3 mr-1" />
                  댓글 추가
                </Button>
              </div>

              <div className="space-y-1">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <span className="font-medium truncate">{comment.user.username}:</span>
                      <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => commentActions.likeComment(comment.id, post.id, comment.likes)}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="ml-1 text-xs">{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditComment(comment)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => commentActions.deleteComment(comment.id, post.id)}
                      >
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

      {/* 2. 댓글 추가 모달 (Feature) */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        postId={post.id}
        onSubmit={commentActions.addComment}
      />

      {/* 3. 댓글 수정 모달 (Feature) */}
      {selectedComment && (
        <CommentEditDialog
          open={showEditCommentDialog}
          onOpenChange={setShowEditCommentDialog}
          comment={selectedComment}
          onSubmit={commentActions.updateComment}
        />
      )}
    </>
  )
}
