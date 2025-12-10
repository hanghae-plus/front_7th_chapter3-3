import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { createPost } from "@/entities/post"

interface CreatePostDialogProps {
  onSuccess: () => void
}

export const CreatePostDialog = ({ onSuccess }: CreatePostDialogProps) => {
  const [open, setOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const handleCreate = async () => {
    try {
      await createPost(newPost)
      setNewPost({ title: "", body: "", userId: 1 })
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
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
            <Button onClick={handleCreate}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
