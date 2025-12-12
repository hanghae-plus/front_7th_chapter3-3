import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { useCreatePost } from "../api/use-create-post"
import { useOverlay } from "@/shared/lib/overlay"

interface CreatePostDialogProps {
  onSuccess?: () => void
}

export const CreatePostDialog = ({ onSuccess }: CreatePostDialogProps) => {
  const overlay = useOverlay()

  const handleOpenDialog = () => {
    overlay.open((controller) => (
      <CreatePostDialogContent controller={controller} onSuccess={onSuccess} />
    ))
  }

  return (
    <Button onClick={handleOpenDialog}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

interface CreatePostDialogContentProps {
  controller: { isOpen: boolean; close: () => void }
  onSuccess?: () => void
}

const CreatePostDialogContent = ({ controller, onSuccess }: CreatePostDialogContentProps) => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const createPost = useCreatePost()

  const handleCreate = () => {
    createPost.mutate(newPost, {
      onSuccess: () => {
        setNewPost({ title: "", body: "", userId: 1 })
        controller.close()
        onSuccess?.()
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  return (
    <Dialog open={controller.isOpen} onOpenChange={(open) => !open && controller.close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleCreate} disabled={createPost.isPending}>
            {createPost.isPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
