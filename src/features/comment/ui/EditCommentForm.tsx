import { Button, Textarea } from "../../../shared/ui"
import { useEditCommentForm } from "../lib/useEditCommentForm"

interface EditCommentFormProps {
  body: string
  handleUpdate: (body: string) => void
}

const EditCommentForm = ({ body, handleUpdate }: EditCommentFormProps) => {
  const { commentForm, handleChangeBody } = useEditCommentForm(body)

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={commentForm.body} onChange={handleChangeBody} />
      <Button onClick={() => handleUpdate(commentForm.body)}>댓글 업데이트</Button>
    </div>
  )
}

export default EditCommentForm
