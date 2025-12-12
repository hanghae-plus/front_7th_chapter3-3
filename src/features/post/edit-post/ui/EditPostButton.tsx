import { useState } from "react"
import { Edit2 } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { Post } from "@/entities/post"
import { useUpdatePost } from "../api/use-update-post"

interface EditPostButtonProps {
  post: Post
  onSuccess?: () => void // optional로 변경
}

export const EditPostButton = ({ post, onSuccess }: EditPostButtonProps) => {
  const [open, setOpen] = useState(false)
  const [editedPost, setEditedPost] = useState(post)

  // TanStack Query Mutation 사용
  const updatePost = useUpdatePost()

  const handleUpdate = () => {
    updatePost.mutate(
      { id: post.id, post: editedPost },
      {
        onSuccess: () => {
          setOpen(false)
          onSuccess?.()
        },
        onError: (error) => {
          console.error("게시물 업데이트 오류:", error)
        },
      },
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setEditedPost(post)
          setOpen(true)
        }}
      >
        <Edit2 className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={editedPost?.title || ""}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={editedPost?.body || ""}
              onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
            />
            <Button onClick={handleUpdate} disabled={updatePost.isPending}>
              {updatePost.isPending ? "업데이트 중..." : "게시물 업데이트"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
