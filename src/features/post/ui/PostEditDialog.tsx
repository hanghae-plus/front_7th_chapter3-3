import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"
import { Post } from "@/entities/post/model/post"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  onPostChange: (post: Post) => void
  onSubmit: () => void
}

export const PostEditDialog = ({ open, onOpenChange, post, onPostChange, onSubmit }: PostEditDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post.title || ""}
            onChange={(e) => onPostChange({ ...post, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post.body || ""}
            onChange={(e) => onPostChange({ ...post, body: e.target.value })}
          />
          <Button onClick={onSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
