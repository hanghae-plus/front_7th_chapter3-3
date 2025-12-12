import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/components"
import { highlightText } from "../../../shared/utils/highlightText"
import { CommentSection } from "../../../features/control-comments/ui"
import { Post } from "../../../entities/posts/types"

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentSection postId={post.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
