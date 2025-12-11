import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Textarea } from "@/shared/ui"
import { Trash2, ThumbsUp } from "lucide-react"
import { highlightText } from "@/shared/lib/highlight"
import { Post } from "@/entities/post/model/types"
import { Comment } from "@/entities/comment/model/types"

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
  // 댓글 입력용 로컬 상태 (간소화)
  const [newCommentBody, setNewCommentBody] = useState("")

  const handleAddComment = () => {
    commentActions.addComment({ body: newCommentBody, postId: post.id, userId: 1 })
    setNewCommentBody("")
  }

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
            </div>
            {/* 댓글 목록 */}
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
                    <Button variant="ghost" size="sm" onClick={() => commentActions.deleteComment(comment.id, post.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* 댓글 작성 (간이 버전) */}
            <div className="flex gap-2 mt-4">
              <Textarea
                placeholder="댓글을 입력하세요..."
                value={newCommentBody}
                onChange={(e) => setNewCommentBody(e.target.value)}
                className="min-h-[60px]"
              />
              <Button onClick={handleAddComment}>작성</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
