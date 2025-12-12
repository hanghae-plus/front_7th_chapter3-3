import { AddPostBody } from "../../../entities/post/model/types"
import { Button, Input, Textarea } from "../../../shared/ui"
import { useAddForm } from "../lib/useAddForm"

interface AddFormProps {
  handleAdd: (addForm: AddPostBody) => void
}

const AddForm = ({ handleAdd }: AddFormProps) => {
  const { addForm, handleChange } = useAddForm()

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={addForm.title} onChange={handleChange.title} />
      <Textarea rows={30} placeholder="내용" value={addForm.body} onChange={handleChange.body} />
      <Input type="number" placeholder="사용자 ID" value={addForm.userId} onChange={handleChange.userId} />
      <Button onClick={() => handleAdd(addForm)}>게시물 추가</Button>
    </div>
  )
}

export default AddForm
