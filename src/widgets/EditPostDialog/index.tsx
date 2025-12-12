import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { useDialogStore } from "@/shared/store/dialogStore"
import { useEditPost } from "@/features/post/model/useEditPost"

const EditPostDialog: FC = () => {
  const { showEditDialog, editingPost, closeEditDialog, setEditingPost } = useDialogStore()
  const { handleSubmit, isLoading } = useEditPost()

  const handleUpdatePost = async () => {
    if (editingPost) {
      await handleSubmit()
      closeEditDialog()
    }
  }

  if (!editingPost) return null

  return (
    <Dialog open={showEditDialog} onOpenChange={closeEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editingPost.title || ""}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <Textarea
            rows={10}
            placeholder="내용"
            value={editingPost.body || ""}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost} disabled={isLoading}>
            {isLoading ? "업데이트 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
