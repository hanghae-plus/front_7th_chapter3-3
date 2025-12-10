import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Post } from "@/entities/post"
import { Comment, fetchComments } from "@/entities/comment"
import { CommentList } from "@/widgets/comment-list"
import { highlightText } from "@/shared/lib"

interface PostDetailDialogProps {
  post: Post | null
  open: boolean
  searchQuery: string
  onOpenChange: (open: boolean) => void
}

export const PostDetailDialog = ({ post, open, searchQuery, onOpenChange }: PostDetailDialogProps) => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    if (post && open) {
      fetchComments(post.id)
        .then((data) => setComments(data.comments))
        .catch((error) => console.error("댓글 가져오기 오류:", error))
    }
  }, [post, open])

  const handleCommentsUpdate = () => {
    if (post) {
      fetchComments(post.id)
        .then((data) => setComments(data.comments))
        .catch((error) => console.error("댓글 가져오기 오류:", error))
    }
  }

  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentList postId={post.id} comments={comments} searchQuery={searchQuery} onUpdate={handleCommentsUpdate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
