import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { highlightText } from "@/shared/lib/highlightText"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"
import { useDialogStore } from "@/shared/store/dialogStore"
import CommentsSection from "@/widgets/CommentsSection"

const PostDetailDialog: FC = () => {
  const { searchQuery } = useSearchFilter()
  const { showDetailDialog, selectedPost, closeDetailDialog } = useDialogStore()

  if (!selectedPost) return null

  return (
    <Dialog open={showDetailDialog} onOpenChange={closeDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          <CommentsSection postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
