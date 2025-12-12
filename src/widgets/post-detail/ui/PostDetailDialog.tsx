import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { useFilterStore } from "@/features"
import { CommentsList } from "./CommentsList"

const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  )
}

export const PostDetailDialog = () => {
  const { showPostDetailDialog, closePostDetail, selectedPost } = useUIStore()
  const { searchQuery } = useFilterStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={closePostDetail}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {selectedPost && <CommentsList postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
