import { ChangeEvent, useState } from "react"
import { AddPostBody } from "../../../entities/post/model/types"

export const useAddForm = () => {
  const [addForm, setAddForm] = useState<AddPostBody>({
    userId: 1,
    title: "",
    body: "",
  })

  const handleChange = {
    title: (e: ChangeEvent<HTMLInputElement>) => setAddForm({ ...addForm, title: e.target.value }),
    body: (e: ChangeEvent<HTMLTextAreaElement>) => setAddForm({ ...addForm, body: e.target.value }),
    userId: (e: ChangeEvent<HTMLInputElement>) => setAddForm({ ...addForm, userId: Number(e.target.value) }),
  }

  return {
    addForm,
    handleChange,
  }
}
