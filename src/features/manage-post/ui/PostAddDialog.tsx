import { useState } from "react"
import { Button, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (post: { title: string; body: string; userId: number }) => void
}

export const PostAddDialog = ({ open, onOpenChange, onSubmit }: Props) => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const handleSubmit = () => {
    onSubmit(newPost)
    onOpenChange(false)
    setNewPost({ title: "", body: "", userId: 1 }) // 초기화
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
