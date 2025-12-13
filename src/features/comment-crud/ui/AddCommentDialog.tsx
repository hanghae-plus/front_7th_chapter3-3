import { useState } from "react"
import { Button } from "@/shared/ui/buttons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialogs"
import { Textarea } from "@/shared/ui/inputs"
import { useCommentStore } from "@/entities/comment"
import { useUiStore } from "@/shared/model"

interface AddCommentDialogProps {
  postId: number | null
}

export const AddCommentDialog = ({ postId }: AddCommentDialogProps) => {
  const { addComment } = useCommentStore()
  const { showAddCommentDialog, setShowAddCommentDialog } = useUiStore()
  const [body, setBody] = useState("")

  const handleSubmit = async () => {
    if (!postId) return
    await addComment({ body, postId, userId: 1 })
    setShowAddCommentDialog(false)
    setBody("")
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
