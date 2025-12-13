import { Comment } from "../model/comment"

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data.comments
}
