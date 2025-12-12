import { CommentRequestBody } from "../../../entities/comment/model/types"
import { Button, Textarea } from "../../../shared/ui"
import { useAddCommentForm } from "../lib/useAddCommentForm"

interface AddCommentFormProps {
  id: number
  handleAdd: (body: CommentRequestBody) => void
}

const AddCommentForm = ({ id, handleAdd }: AddCommentFormProps) => {
  const { commentForm, handleChangeBody } = useAddCommentForm(id)

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={commentForm.body} onChange={handleChangeBody} />
      <Button onClick={() => handleAdd(commentForm)}>댓글 추가</Button>
    </div>
  )
}

export default AddCommentForm
