import { Comment } from "../model/comment"

export interface AddCommentParams {
  body: string
  postId: number
  userId: number
}

export const addComment = async (params: AddCommentParams): Promise<Comment> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  return response.json()
}
