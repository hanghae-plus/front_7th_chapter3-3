import { Comment, CommentsResponse } from "../model/types"
import { API_BASE_URL } from "@/shared/config/api"

export const fetchComments = async (postId: number): Promise<CommentsResponse> => {
  const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`)
  return response.json()
}

export const createComment = async (comment: {
  body: string
  postId: number
  userId: number
}): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export const updateComment = async (id: number, body: string): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  return response.json()
}

export const deleteComment = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "DELETE",
  })
}

export const likeComment = async (id: number, currentLikes: number): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  })
  return response.json()
}
