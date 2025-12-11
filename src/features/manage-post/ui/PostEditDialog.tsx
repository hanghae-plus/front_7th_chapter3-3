import { useEffect, useState } from "react"
import { Button, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Post } from "@/entities/post/model/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post
  onSubmit: (post: Post) => void
}

export const PostEditDialog = ({ open, onOpenChange, post, onSubmit }: Props) => {
  const [editingPost, setEditingPost] = useState<Post>(post)

  // 모달이 열릴 때 post 데이터 동기화
  useEffect(() => {
    setEditingPost(post)
  }, [post])

  const handleSubmit = () => {
    onSubmit(editingPost)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editingPost.body}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
