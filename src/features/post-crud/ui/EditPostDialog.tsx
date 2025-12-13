import { Button } from "@/shared/ui/buttons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialogs"
import { Input, Textarea } from "@/shared/ui/inputs"
import { usePostStore } from "@/entities/post"
import { useUiStore } from "@/shared/model"

export const EditPostDialog = () => {
  const { selectedPost, setSelectedPost, updatePost } = usePostStore()
  const { showEditDialog, setShowEditDialog } = useUiStore()

  const handleSubmit = async () => {
    if (!selectedPost) return
    await updatePost(selectedPost.id, selectedPost)
    setShowEditDialog(false)
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) =>
              setSelectedPost(selectedPost ? { ...selectedPost, title: e.target.value } : null)
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) =>
              setSelectedPost(selectedPost ? { ...selectedPost, body: e.target.value } : null)
            }
          />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
