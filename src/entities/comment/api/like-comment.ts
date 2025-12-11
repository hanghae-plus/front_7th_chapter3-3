import { Comment } from "../model/comment"

export const likeComment = async (id: number): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: 1 }),
  })
  return response.json()
}
