import { Comment } from "../types"

export const fetchComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json()
}

export const createComment = async (comment: Comment | { body: string; postId: number; userId: number }) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export const updateComment = async (commentId: number, body: string) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  return response.json()
}

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  return response.json()
}

export const likeComment = async (commentId: number, likes: number) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  return response.json()
}
