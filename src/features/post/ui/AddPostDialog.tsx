import { useAddPost } from "../../post/model/useAddPost"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

const AddPost = () => {
  const { isOpen, setIsOpen, newPost, setNewPost, handleSubmit } = useAddPost()

  return (
    // 게시물 추가 대화상자
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

export default AddPost
