import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { useMutationPostAdd } from "@/entities/post/model/usePost"

export const PostAddDialog = () => {
  const [open, setOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const { mutate: addPost } = useMutationPostAdd()

  const handleAdd = () => {
    addPost(newPost, {
      onSuccess: () => {
        setOpen(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
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
            <Button onClick={handleAdd}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
