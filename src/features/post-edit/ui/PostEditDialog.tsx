import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "@/shared/ui"
import { useMutationPostUpdate } from "@/entities/post/model/usePost"
import type { Post } from "@/shared/types"

interface PostEditDialogProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostEditDialog = ({ post, open, onOpenChange }: PostEditDialogProps) => {
  const [editedPost, setEditedPost] = useState({ title: "", body: "" })
  const { mutate: updatePost } = useMutationPostUpdate()

  useEffect(() => {
    if (post) {
      setEditedPost({ title: post.title, body: post.body })
    }
  }, [post])

  const handleUpdate = () => {
    if (post) {
      updatePost(
        { id: post.id, data: editedPost },
        {
          onSuccess: () => {
            onOpenChange(false)
          },
        },
      )
    }
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
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdate}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
