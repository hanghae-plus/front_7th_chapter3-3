/**
 * Post Create Feature UI
 * 
 * 게시물 생성 다이얼로그 컴포넌트
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui"
import { usePostCreate } from "../model/use-post-create"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 게시물 생성 다이얼로그
 */
export function PostCreateDialog() {
  const { newPost, setNewPost, showAddDialog, handleCreate } = usePostCreate()
  const { setShowAddDialog } = useUIStore()

  const handleSubmit = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      return
    }
    await handleCreate(newPost)
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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

