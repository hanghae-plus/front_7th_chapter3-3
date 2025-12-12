import { ChangeEvent, useState } from "react"
import { UpdateCommentRequestBody } from "../../../entities/comment/model/types"

export const useEditCommentForm = (initialBody: string) => {
  const [commentForm, setCommentForm] = useState<UpdateCommentRequestBody>({
    body: initialBody,
  })

  const handleChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentForm({ ...commentForm, body: e.target.value })
  }

  return {
    commentForm,
    handleChangeBody,
  }
}
