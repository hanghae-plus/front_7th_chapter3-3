import { useState } from "react"
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
import { type CreatePostRequest } from "@/entities/post"
import { useAddPost } from "../model/useAddPost"

export const AddPostDialog = () => {
  const { showAddPostDialog, closeAddPostDialog } = useUIStore()
  const [newPost, setNewPost] = useState<CreatePostRequest>({
    title: "",
    body: "",
    userId: 1,
  })
  const addPost = useAddPost()

  const handleAddPost = () => {
    addPost.mutate(newPost, {
      onSuccess: () => {
        closeAddPostDialog()
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog open={showAddPostDialog} onOpenChange={closeAddPostDialog}>
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
          <Button onClick={handleAddPost} disabled={addPost.isPending}>
            {addPost.isPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
