import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { useUpdatePost } from "../model/useUpdatePost"

export const EditPostDialog = () => {
  const { showEditPostDialog, closeEditPostDialog, selectedPost } = useUIStore()
  const updatePost = useUpdatePost()

  const handleUpdatePost = () => {
    if (!selectedPost) return

    updatePost.mutate(
      {
        id: selectedPost.id,
        data: {
          title: selectedPost.title,
          body: selectedPost.body,
        },
      },
      {
        onSuccess: () => {
          closeEditPostDialog()
        },
      }
    )
  }

  const updateSelectedPost = (updates: Partial<typeof selectedPost>) => {
    if (!selectedPost) return
    useUIStore.setState({
      selectedPost: { ...selectedPost, ...updates },
    })
  }

  return (
    <Dialog open={showEditPostDialog} onOpenChange={closeEditPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => updateSelectedPost({ title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => updateSelectedPost({ body: e.target.value })}
          />
          <Button onClick={handleUpdatePost} disabled={updatePost.isPending}>
            {updatePost.isPending ? "수정 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
