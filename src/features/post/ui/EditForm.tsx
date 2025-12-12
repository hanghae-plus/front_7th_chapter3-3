import { UpdatePostBody } from "../../../entities/post/model/types"
import { Button, Input, Textarea } from "../../../shared/ui"
import { useEditForm } from "../lib/useEditForm"
import { PostWithAuthor } from "../model/types"

interface EditFormProps {
  post: PostWithAuthor
  handleUpdate: (editForm: UpdatePostBody) => void
}

const EditForm = ({ post, handleUpdate }: EditFormProps) => {
  const { editForm, handleChange } = useEditForm(post)

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={editForm.title} onChange={handleChange.title} />
      <Textarea rows={15} placeholder="내용" value={editForm.body} onChange={handleChange.body} />
      <Button onClick={() => handleUpdate(editForm)}>게시물 업데이트</Button>
    </div>
  )
}

export default EditForm
