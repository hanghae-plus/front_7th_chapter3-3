import { Input, Textarea, Button, Dialog } from "../../../shared/ui"
import { useState } from "react"
import { AddPostRequest } from "../../../entities/post/model/post"
import { useAddPostDialogStore } from "../model/useAddPostDialogStore"
import useAddPostQuery from "../model/useAddPostQuery"

const AddPostDialog = () => {
  const { addPost } = useAddPostQuery()
  const showAddPostDialog = useAddPostDialogStore((state) => state.showDialog)
  const setShowAddPostDialog = useAddPostDialogStore((state) => state.setShowDialog)

  const [newPost, setNewPost] = useState<AddPostRequest>({ title: "", body: "", userId: 1 })

  const handleAddPost = () => {
    addPost({ post: newPost })
    setShowAddPostDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }
  return (
    <Dialog open={showAddPostDialog} onOpenChange={setShowAddPostDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
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
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default AddPostDialog
