import { Dialog, Input, Textarea, Button } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/post"
import { useEffect, useState } from "react"
import { useSelectedPostStore } from "../../../entities/post/model/useSelectedPostStore"
import { useEditPostDialogStore } from "../model/useEditPostDialogStore"
import useEditPostQuery from "../model/useEditPostQuery"

const EditPostDialog = () => {
  const { updatePost } = useEditPostQuery()
  const showEditPostDialog = useEditPostDialogStore((state) => state.showDialog)
  const setShowEditPostDialog = useEditPostDialogStore((state) => state.setShowDialog)
  const selectedPost = useSelectedPostStore((state) => state.selectedPost)
  const setSelectedPost = useSelectedPostStore((state) => state.setSelectedPost)

  const [newPost, setNewPost] = useState<Post>(selectedPost!)

  useEffect(() => {
    setNewPost(selectedPost!)
  }, [selectedPost])

  const handleUpdatePost = () => {
    updatePost({ post: newPost })
    setShowEditPostDialog(false)
    setSelectedPost(null)
  }
  if (!selectedPost) return <></>

  return (
    <Dialog open={showEditPostDialog} onOpenChange={setShowEditPostDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost?.title || ""}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={newPost?.body || ""}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default EditPostDialog
