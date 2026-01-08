/**
 * Post Edit Feature UI
 * 
 * 게시물 수정 다이얼로그 컴포넌트
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui"
import { usePostEdit } from "../model/use-post-edit"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 게시물 수정 다이얼로그
 */
export function PostEditDialog() {
  const { selectedPost, setSelectedPost, showEditDialog, handleUpdate } = usePostEdit()
  const { setShowEditDialog } = useUIStore()

  if (!selectedPost) return null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowEditDialog(false)
      setSelectedPost(null)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdate}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

