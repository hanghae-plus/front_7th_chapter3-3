import { Dialog } from "@/components"
import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialogs"
import { usePostStore } from "@/entities/post"
import { useUiStore } from "@/shared/model"
import { highlightText } from "@/shared/lib"
import { CommentsSection } from "@/widgets/comments-section"

export const PostDetailDialog = () => {
  const { selectedPost } = usePostStore()
  const { showPostDetailDialog, setShowPostDetailDialog, searchQuery } = useUiStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {selectedPost && <CommentsSection postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
