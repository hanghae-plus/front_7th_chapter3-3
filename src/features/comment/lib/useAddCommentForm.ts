import { ChangeEvent, useState } from "react"
import { CommentRequestBody } from "../../../entities/comment/model/types"

export const useAddCommentForm = (postId: number) => {
  const [commentForm, setCommentForm] = useState<CommentRequestBody>({
    postId,
    userId: 1,
    body: "",
  })

  const handleChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentForm({ ...commentForm, body: e.target.value })
  }

  return {
    commentForm,
    handleChangeBody,
  }
}
