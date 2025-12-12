import { ChangeEvent, useState } from "react"
import { UpdatePostBody } from "../../../entities/post/model/types"
import { PostWithAuthor } from "../model/types"

export const useEditForm = (post: PostWithAuthor) => {
  const [editForm, setEditForm] = useState<UpdatePostBody>({
    title: post.title,
    body: post.body,
  })

  const handleChange = {
    title: (e: ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, title: e.target.value }),
    body: (e: ChangeEvent<HTMLTextAreaElement>) => setEditForm({ ...editForm, body: e.target.value }),
  }

  return {
    editForm,
    handleChange,
  }
}
