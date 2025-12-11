import type { Post } from '../../../entities/post'
import type { Comment } from '../../../entities/comment'
import { CommentList } from '../../comment-list'
import { highlightText } from '../../../shared/lib'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"

interface PostDetailProps {
  post: Post | null
  comments: Comment[]
  searchQuery?: string
  isOpen: boolean
  onClose: () => void
  onAddComment: () => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

/**
 * 게시물 상세 위젯
 * 게시물 상세 정보와 댓글 목록을 표시합니다.
 */
export const PostDetail = ({
  post,
  comments,
  searchQuery = "",
  isOpen,
  onClose,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: PostDetailProps) => {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentList
            comments={comments}
            postId={post.id}
            searchQuery={searchQuery}
            onAddComment={onAddComment}
            onLikeComment={onLikeComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

