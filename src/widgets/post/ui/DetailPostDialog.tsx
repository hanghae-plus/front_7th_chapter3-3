import { Dialog } from "../../../shared/ui"
import HighlightText from "../../../shared/ui/HighlightText"
import Comments from "../../comment/ui/Comments"
import { useSelectedPostStore } from "../../../entities/post/model/useSelectedPostStore"
import usePostParams from "../../../features/post/model/usePostParams"
import { useDetailPostDialogStore } from "../model/useDetailPostDialogStore"

const DetailPostDialog = () => {
  const { params } = usePostParams()
  const selectedPost = useSelectedPostStore((state) => state.selectedPost)
  const showDialog = useDetailPostDialogStore((state) => state.showDialog)
  const setShowDialog = useDetailPostDialogStore((state) => state.setShowDialog)

  if (!selectedPost) return <></>

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost?.title} highlight={params.searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={params.searchQuery} />
          </p>
          <Comments postId={selectedPost?.id || 0} />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default DetailPostDialog
