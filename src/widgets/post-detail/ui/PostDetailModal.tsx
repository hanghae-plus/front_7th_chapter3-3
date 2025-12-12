import { Comments } from "@/features/comment-section/ui/Comments"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { HighlightText } from "@/shared/ui/HighlightText"
import { selectedPostAtom, showPostDetailDialogAtom } from "@/entities/post"
import { searchQueryAtom } from "@/features/post-filter"
import { useAtom, useAtomValue } from "jotai"

export const PostDetailModal = () => {
  const selectedPost = useAtomValue(selectedPostAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {selectedPost?.id && <Comments postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
