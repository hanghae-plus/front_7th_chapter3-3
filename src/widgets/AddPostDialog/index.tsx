import { type FC } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { useAddPost } from "@/features/post/model/useAddPost"

const AddPostDialog: FC = () => {
  const { isOpen, setIsOpen, newPost, setNewPost, handleSubmit, isLoading } = useAddPost()

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
      <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
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
              rows={10}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "추가 중..." : "게시물 추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPostDialog
