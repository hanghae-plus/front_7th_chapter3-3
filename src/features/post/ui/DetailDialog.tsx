import { Dialog, DialogContent, DialogHeader, DialogTitle, ErrorDisplay, HighlightText } from "../../../shared/ui"
import CommentList from "../../comment/ui/CommentList"
import { useDetailDialog } from "../lib/useDetailDialog"

const DetailDialog = () => {
  const { isOpen, post, error, search, resetDialog } = useDetailDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={post?.title || ""} highlight={search} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error ? (
            <ErrorDisplay error={error} />
          ) : (
            <>
              <p>
                <HighlightText text={post?.body || ""} highlight={search} />
              </p>
              {post && <CommentList id={post.id} />}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailDialog
